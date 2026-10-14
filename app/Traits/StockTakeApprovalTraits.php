<?php

namespace App\Traits;

use App\Models\C_ITRN;
use App\Models\T_RCV_HEAD;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * Stock Take approval gate.
 *
 * Uploads stage counted targets into T_STK_STAGE without touching the stock
 * ledger. Approval computes each row's diff against the LIVE stock at that
 * moment and posts ADJ-INC / ADJ-OUT rows; the batch becomes idempotent by
 * STK_STATE (0=staged, 1=posted, 2=rejected).
 *
 * Requires the host to use ApprovalLogTraits and expose
 * $this->dedicatedConnection.
 */
trait StockTakeApprovalTraits
{
    /** Batches awaiting an approver, newest first. */
    public function stockTakeBatches($cg = null, $branch = null, $status = 'PENDING_APPROVAL')
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);

        $q = T_RCV_HEAD::on($cg)
            ->leftJoin('T_STK_STAGE as stg', function ($j) {
                $j->on('stg.STK_DOCNO', '=', 'T_RCV_HEAD.TRCV_DOCNO')
                    ->where('stg.STK_STATE', 0);
            })
            ->select(
                'T_RCV_HEAD.id',
                'T_RCV_HEAD.TRCV_DOCNO',
                'T_RCV_HEAD.TRCV_BRANCH',
                'T_RCV_HEAD.TRCV_ISSUDT',
                'T_RCV_HEAD.TRCV_SUBMITTED_BY',
                'T_RCV_HEAD.created_by',
                'T_RCV_HEAD.TRCV_STK_STATUS',
                DB::raw('COUNT(stg.id) as STAGED_ROWS')
            )
            ->groupBy(
                'T_RCV_HEAD.id',
                'T_RCV_HEAD.TRCV_DOCNO',
                'T_RCV_HEAD.TRCV_BRANCH',
                'T_RCV_HEAD.TRCV_ISSUDT',
                'T_RCV_HEAD.TRCV_SUBMITTED_BY',
                'T_RCV_HEAD.created_by',
                'T_RCV_HEAD.TRCV_STK_STATUS'
            );

        if ($branch !== null) {
            $q->where('T_RCV_HEAD.TRCV_BRANCH', $branch);
        }
        if ($status !== null) {
            $q->where('T_RCV_HEAD.TRCV_STK_STATUS', $status);
        }

        return $q->orderBy('T_RCV_HEAD.id', 'desc')->get();
    }

    /**
     * Review rows for one batch: staged target vs live ledger stock vs diff.
     */
    public function stockTakeReview($docno, $cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);

        $rows = DB::connection($cg)->table('T_STK_STAGE')
            ->where('STK_DOCNO', $docno)
            ->where('STK_STATE', 0)
            ->orderBy('STK_ITMCD')
            ->get();

        return $rows->map(function ($r) use ($cg, $branch) {
            $current = (float) DB::connection($cg)->table('V_STOCK_CHECK')
                ->where('CITRN_ITMCD', $r->STK_ITMCD)
                ->where('CITRN_LOCCD', $r->STK_LOC)
                // Balance is per branch; the same location code exists in each.
                ->where('CITRN_BRANCH', $branch)
                ->sum('CITRN_ITMQT');

            $target = (float) $r->STK_TARGET;
            $diff = $current - $target; // >0 surplus => ADJ-OUT ; <0 deficit => ADJ-INC

            return [
                'id' => $r->id,
                'item' => $r->STK_ITMCD,
                'item_name' => $r->STK_ITMNM,
                'loc' => $r->STK_LOC,
                'uom' => $r->STK_UOM,
                'current' => $current,
                'target' => $target,
                'price' => (float) $r->STK_PRC_BUY,
                'diff' => $diff,
                'form' => $diff > 0 ? 'ADJ-OUT' : ($diff < 0 ? 'ADJ-INC' : '-'),
                'would_drive_negative' => $target < 0,
            ];
        });
    }

    /** Reject a batch: nothing is posted, rows stay staged for reference. */
    public function rejectStockTake($docno, $note = null, $cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        $head = T_RCV_HEAD::on($cg)
            ->where('TRCV_DOCNO', $docno)
            ->where('TRCV_STK_STATUS', 'PENDING_APPROVAL')
            ->first();

        if (empty($head)) {
            return [false, "Stock take batch {$docno} is not awaiting approval."];
        }

        T_RCV_HEAD::on($cg)->where('id', $head->id)->update([
            'TRCV_STK_STATUS' => 'REJECTED',
            'TRCV_STK_APPROVAL_NOTE' => $note,
            'updated_by' => Auth::check() ? Auth::user()->nick_name : null,
        ]);

        DB::connection($cg)->table('T_STK_STAGE')
            ->where('STK_DOCNO', $docno)
            ->where('STK_STATE', 0)
            ->update(['STK_STATE' => 2]);

        $this->approvalLog('STK', $docno, self::APRV_REJECTED, $note, [], $cg, $branch);

        return [true, "Stock take {$docno} rejected - nothing was posted to stock."];
    }

    /**
     * Approve a batch: validate every non-zero row, then post the ADJ rows.
     * Idempotent - a batch that is already POSTED simply returns its state.
     */
    public function approveStockTake($docno, $cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        $head = T_RCV_HEAD::on($cg)->where('TRCV_DOCNO', $docno)->first();

        if (empty($head)) {
            return [false, "Stock take batch {$docno} not found."];
        }
        if ($head->TRCV_STK_STATUS === 'POSTED') {
            return [true, "Stock take {$docno} was already posted."];
        }
        if ($head->TRCV_STK_STATUS !== 'PENDING_APPROVAL') {
            return [false, "Stock take {$docno} is in state {$head->TRCV_STK_STATUS} and cannot be approved."];
        }

        $review = $this->stockTakeReview($docno, $cg, $branch);

        // Cloudflare guard: refuse a batch too large to post in one request.
        if ($refusal = $this->syncPostGuard('Stock take batch', $docno, $review->count())) {
            return [false, $refusal];
        }

        // Pre-validate: a counted negative target is invalid...
        foreach ($review as $r) {
            if ($r['would_drive_negative']) {
                return [false, "Item {$r['item']} at {$r['loc']}: counted quantity cannot be negative."];
            }
        }

        $by = Auth::check() ? Auth::user()->nick_name : null;

        DB::connection($cg)->transaction(function () use ($cg, $docno, $head, $branch, $by, $review) {
            foreach ($review as $r) {
                $qty = abs($r['diff']);

                if ($qty <= 0.0001) {
                    // No change - mark staged row posted without a ledger write.
                    DB::connection($cg)->table('T_STK_STAGE')->where('id', $r['id'])->update(['STK_STATE' => 1]);
                    continue;
                }

                $id_reff = $this->nextStkBarcode($cg);

                // ADJ-OUT removes surplus; ADJ-INC adds deficit. Exactly the
                // semantics StockInventoryChunkJob used - just gated by approval.
                C_ITRN::on($cg)->create([
                    'CITRN_BRANCH' => $branch,
                    'CITRN_LOCCD' => $r['loc'],
                    'CITRN_DOCNO' => $docno,
                    'CITRN_ISSUDT' => date('Y-m-d'),
                    'CITRN_FORM' => $r['form'],
                    'CITRN_ITMCD' => $r['item'],
                    'CITRN_ITMQT' => $r['form'] === 'ADJ-OUT' ? $qty * -1 : $qty,
                    'CITRN_PRCPER' => $r['price'],
                    'CITRN_PRCAMT' => $r['price'] * $qty,
                    'created_by' => $by,
                    'id_reff' => $id_reff,
                ]);

                DB::connection($cg)->table('T_STK_STAGE')->where('id', $r['id'])->update(['STK_STATE' => 1]);
            }

            T_RCV_HEAD::on($cg)->where('id', $head->id)->update([
                'TRCV_STK_STATUS' => 'POSTED',
                'TRCV_STK_POSTED_AT' => date('Y-m-d H:i:s'),
                'updated_by' => $by,
            ]);
        });

        $posted = DB::connection($cg)->table('C_ITRN')
            ->where('CITRN_DOCNO', $docno)
            ->whereIn('CITRN_FORM', ['ADJ-OUT', 'ADJ-INC'])
            ->count();

        $this->approvalLog('STK', $docno, self::APRV_APPROVED, "Posted {$posted} adjustment rows", ['posted' => $posted], $cg, $branch);

        return [true, "Stock take {$docno} approved - posted {$posted} adjustment rows."];
    }

    /**
     * Current balances of one batch's staged items (for the review screen's
     * header and for guard checks).
     */
    public function nextStkBarcode($cg)
    {
        $last = DB::connection($cg)->table('T_RCV_BC_DETAIL')
            ->whereBetween('created_at', [date('Y-m-d 00:00:00'), date('Y-m-d 23:59:59')])
            ->orderBy('id', 'desc')
            ->first();

        return empty($last)
            ? 'BC' . date('Ymd') . '0001'
            : 'BC' . date('Ymd') . sprintf('%04d', (int) substr($last->TRCVBC_BCCD, -4) + 1);
    }
}
