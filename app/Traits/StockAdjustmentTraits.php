<?php

namespace App\Traits;

use App\Models\C_ITRN;
use App\Models\T_RCV_HEAD;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * Stock Adjustment approval gate (single-item adjustments, target = signed delta).
 *
 * A submitted adjustment is staged in T_STK_STAGE with STK_TARGET = the SIGNED
 * delta to apply (+qty for increase, -qty for decrease). Nothing touches the
 * stock ledger until approval. At approval the staged delta is posted as
 * ADJ-INC / ADJ-OUT exactly as requested - no recompute against live stock,
 * but a guard refuses anything that would drive a balance negative.
 *
 * STK_STATE: 0=staged, 1=posted, 2=rejected (same semantics as Stock Take).
 * Header docno prefix "ADJ-" distinguishes batches from stock-take "STK-".
 */
trait StockAdjustmentTraits
{
    /** Digits-only docno: ADJ-YYYYmmdd-HHii (reused if two batches collide within a minute). */
    public function nextAdjDocno($cg)
    {
        $base = 'ADJ-' . date('Ymd') . '-' . date('Hi');
        $n = 1;
        while (T_RCV_HEAD::on($cg)->where('TRCV_DOCNO', $n > 1 ? "{$base}-{$n}" : $base)->exists()) {
            $n++;
        }
        return $n > 1 ? "{$base}-{$n}" : $base;
    }

    /**
     * Stage one or more adjustment rows. $rows: [['item','loc','qty','type','uom','price'], ...]
     * type: 'INC' (increase stock) | 'OUT' (decrease stock). $note = submitter reason.
     */
    public function stageStockAdjustment(array $rows, $cg = null, $note = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = Auth::check() ? Auth::user()->branch : null;
        $by = Auth::check() ? Auth::user()->nick_name : null;
        $docno = $this->nextAdjDocno($cg);

        $head = T_RCV_HEAD::on($cg)->create([
            'TRCV_DOCNO' => $docno,
            'TRCV_RCVCD' => $docno,
            'TRCV_BRANCH' => $branch,
            'TRCV_ISSUDT' => date('Y-m-d'),
            'TRCV_SUBMITTED_AT' => now(),
            'TRCV_SUBMITTED_BY' => $by,
            'TRCV_SUPCD' => '',
            'TRCV_STK_STATUS' => 'PENDING_APPROVAL',
            'TRCV_STK_APPROVAL_NOTE' => $note, // submitter reason; approver sees it in History
            'created_by' => $by,
        ]);

        $now = now();
        $stageRows = [];
        foreach ($rows as $r) {
            $delta = $r['type'] === 'INC' ? abs((float) $r['qty']) : abs((float) $r['qty']) * -1;
            $stageRows[] = [
                'STK_DOCNO' => $docno,
                'STK_HEADID' => $head->id,
                'STK_ITMCD' => $r['item'],
                'STK_ITMNM' => $r['item_name'] ?? '',
                'STK_LOC' => $r['loc'],
                'STK_TARGET' => $delta, // signed: +increase / -decrease
                'STK_PRC_BUY' => $r['price'] ?? 0,
                'STK_UOM' => $r['uom'] ?? '',
                'STK_BRANCH' => $branch,
                'STK_STATE' => 0,
                'created_by' => $by,
                'created_at' => $now,
                'updated_at' => $now,
            ];
        }
        DB::connection($cg)->table('T_STK_STAGE')->insert($stageRows);

        $this->approvalLog('STK', $docno, self::APRV_SUBMITTED,
            'Adjustment submitted - ' . count($stageRows) . ' row(s), awaiting approval' . ($note ? ' | Reason: ' . $note : ''),
            ['rows' => count($stageRows), 'note' => $note], $cg, $branch);

        return ['docno' => $docno, 'head_id' => $head->id, 'rows' => count($stageRows)];
    }

    /** Batches awaiting an approver (adjustments only: ADJ- prefix). */
    public function adjustmentBatches($cg = null, $branch = null, $status = 'PENDING_APPROVAL')
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);

        $q = T_RCV_HEAD::on($cg)
            ->leftJoin('T_STK_STAGE as stg', function ($j) {
                $j->on('stg.STK_DOCNO', '=', 'T_RCV_HEAD.TRCV_DOCNO')
                    ->where('stg.STK_STATE', 0);
            })
            ->where('T_RCV_HEAD.TRCV_DOCNO', 'like', 'ADJ-%')
            ->select(
                'T_RCV_HEAD.id',
                'T_RCV_HEAD.TRCV_DOCNO',
                'T_RCV_HEAD.TRCV_BRANCH',
                'T_RCV_HEAD.TRCV_ISSUDT',
                'T_RCV_HEAD.TRCV_SUBMITTED_BY',
                'T_RCV_HEAD.created_by',
                'T_RCV_HEAD.TRCV_STK_STATUS',
                'T_RCV_HEAD.TRCV_STK_APPROVAL_NOTE',
                DB::raw('COUNT(stg.id) as STAGED_ROWS')
            )
            ->groupBy(
                'T_RCV_HEAD.id',
                'T_RCV_HEAD.TRCV_DOCNO',
                'T_RCV_HEAD.TRCV_BRANCH',
                'T_RCV_HEAD.TRCV_ISSUDT',
                'T_RCV_HEAD.TRCV_SUBMITTED_BY',
                'T_RCV_HEAD.created_by',
                'T_RCV_HEAD.TRCV_STK_STATUS',
                'T_RCV_HEAD.TRCV_STK_APPROVAL_NOTE'
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
     * Review rows: current stock, requested signed delta, resulting balance.
     */
    public function adjustmentReview($docno, $cg = null, $branch = null)
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

            $delta = (float) $r->STK_TARGET; // signed
            $after = $current + $delta;

            return [
                'id' => $r->id,
                'item' => $r->STK_ITMCD,
                'item_name' => $r->STK_ITMNM,
                'loc' => $r->STK_LOC,
                'uom' => $r->STK_UOM,
                'current' => $current,
                'delta' => $delta, // signed: +inc / -dec
                'after' => $after,
                'price' => (float) $r->STK_PRC_BUY,
                'form' => $delta > 0 ? 'ADJ-INC' : ($delta < 0 ? 'ADJ-OUT' : '-'),
                'would_drive_negative' => $after < -0.0001,
            ];
        });
    }

    /** Reject: nothing posted. */
    public function rejectAdjustment($docno, $note = null, $cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        $head = T_RCV_HEAD::on($cg)
            ->where('TRCV_DOCNO', $docno)
            ->where('TRCV_STK_STATUS', 'PENDING_APPROVAL')
            ->first();

        if (empty($head)) {
            return [false, "Adjustment {$docno} is not awaiting approval."];
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

        return [true, "Adjustment {$docno} rejected - nothing was posted to stock."];
    }

    /**
     * Approve: validate, then post the staged (signed) deltas as ADJ rows.
     * Idempotent per batch (header state), like the stock take gate.
     */
    public function approveAdjustment($docno, $cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        $head = T_RCV_HEAD::on($cg)->where('TRCV_DOCNO', $docno)->first();

        if (empty($head)) {
            return [false, "Adjustment {$docno} not found."];
        }
        if ($head->TRCV_STK_STATUS === 'POSTED') {
            return [true, "Adjustment {$docno} was already posted."];
        }
        if ($head->TRCV_STK_STATUS !== 'PENDING_APPROVAL') {
            return [false, "Adjustment {$docno} is in state {$head->TRCV_STK_STATUS} and cannot be approved."];
        }

        // Re-read live stock at approval time for the negative-balance guard.
        $review = $this->adjustmentReview($docno, $cg, $branch);

        // Cloudflare guard: refuse a batch too large to post in one request.
        if ($refusal = $this->syncPostGuard('Adjustment', $docno, $review->count())) {
            return [false, $refusal];
        }

        foreach ($review as $r) {
            if ($r['would_drive_negative']) {
                return [false, "Item {$r['item']} at {$r['loc']}: adjustment would drive stock to {$r['after']} (negative not allowed). Current is {$r['current']}."];
            }
        }

        $by = Auth::check() ? Auth::user()->nick_name : null;

        DB::connection($cg)->transaction(function () use ($cg, $docno, $head, $branch, $by, $review) {
            foreach ($review as $r) {
                $delta = abs($r['delta']);
                if ($delta <= 0.0001) {
                    DB::connection($cg)->table('T_STK_STAGE')->where('id', $r['id'])->update(['STK_STATE' => 1]);
                    continue;
                }

                $id_reff = $this->nextStkBarcode($cg);

                C_ITRN::on($cg)->create([
                    'CITRN_BRANCH' => $branch,
                    'CITRN_LOCCD' => $r['loc'],
                    'CITRN_DOCNO' => $docno,
                    'CITRN_ISSUDT' => date('Y-m-d'),
                    'CITRN_FORM' => $r['delta'] > 0 ? 'ADJ-INC' : 'ADJ-OUT',
                    'CITRN_ITMCD' => $r['item'],
                    'CITRN_ITMQT' => $r['delta'], // signed
                    'CITRN_PRCPER' => (float) ($r['price'] ?? 0),
                    'CITRN_PRCAMT' => (float) ($r['price'] ?? 0) * $delta,
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
            ->whereIn('CITRN_FORM', ['ADJ-INC', 'ADJ-OUT'])
            ->count();

        $this->approvalLog('STK', $docno, self::APRV_APPROVED, "Posted {$posted} adjustment row(s)", ['posted' => $posted], $cg, $branch);

        return [true, "Adjustment {$docno} approved - posted {$posted} row(s)."];
    }
}
