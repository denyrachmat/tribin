<?php

namespace App\Traits;

use App\Models\T_RCV_BC_DETAIL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * Barcode-registry side of a cross-CG stock transfer.
 *
 * Why this exists
 * ---------------
 * `transferLoc()` moves stock between company groups by writing matching
 * C_ITRN rows on both sides and copying `id_reff` (the barcode) across. The
 * barcode REGISTRY (T_RCV_BC_DETAIL) was never written on either side, so:
 *   - the destination CG has stock carrying a barcode nobody registered, and
 *   - `saveDirectBarcode` refuses to barcode it again because its
 *     "outstanding un-barcoded stock" is already zero.
 *
 * A barcode string is only unique WITHIN a company database: every CG runs its
 * own BC<date><seq> series, so 279 values on production data appear in more
 * than one CG, and some collide for different items inside a single CG. So the
 * registry entry is keyed per company DB, never globally.
 */
trait BarcodeRegistryTraits
{
    /** Registry row created by a normal receive/barcode flow. */
    public const BC_ORIGIN_AUTO = 'AUTO';

    /** Registry row mirrored from a ledger row during a CG transfer. */
    public const BC_ORIGIN_TRANSFER = 'TRANSFER';

    /**
     * Barcodes already known to a target CG, with the item and on-hand qty they
     * are attached to. Used to warn the operator BEFORE a transfer proceeds.
     *
     * Checks the registry first and falls back to the ledger, because most
     * existing barcodes predate the registry and only exist as `id_reff`.
     *
     * @param  string      $cg     connection alias of the DESTINATION company
     * @param  array       $items  ['BC' => 'item code', ...] or ['BC', ...]
     * @param  string|null $branch branch to scope the stock figure to
     * @return array       per barcode: ['BC' => [ ['item_code'=>, 'item_name'=>, 'qty'=>], ... ]]
     */
    public function barcodeConflictsIn($cg, array $items, $branch = null)
    {
        $mapped = [];
        foreach ($items as $key => $val) {
            if (is_array($val)) {
                $bc = $val['BC'] ?? null;
                $item = $val['ITMCD'] ?? null;
            } else {
                $bc = $key;
                $item = $val;
            }
            if (empty($bc)) {
                continue;
            }
            $mapped[$bc] = $item;
        }
        if (empty($mapped)) {
            return [];
        }

        $bcs = array_keys($mapped);
        $result = [];

        // 1. registry rows already present in the destination CG
        $registered = DB::connection($cg)->table('T_RCV_BC_DETAIL as b')
            ->leftJoin('T_RCV_DETAIL as d', 'b.TRCVBC_DETID', '=', 'd.id')
            ->leftJoin('T_RCV_HEAD as h', 'd.id_header', '=', 'h.id')
            ->whereIn('b.TRCVBC_BCCD', $bcs)
            ->select(
                'b.TRCVBC_BCCD',
                'b.TRCVBC_BCQT',
                DB::raw('COALESCE(d.item_code, b.TRCVBC_BCCD) as item_code'),
                'h.TRCV_RCVCD as docno',
                'd.branch'
            )
            ->get();

        foreach ($registered as $row) {
            $result[$row->TRCVBC_BCCD][] = [
                'source'    => 'registry',
                'item_code' => $row->item_code,
                'item_name' => $this->barcodeItemName($cg, $row->item_code),
                'qty'       => (float) $row->TRCVBC_BCQT,
                'docno'     => $row->docno,
            ];
        }

        // 2. barcodes sitting in the destination ledger (incl. legacy rows that
        //    were never registered). Excludes negatives so a spent barcode does
        //    not look like it still holds stock.
        $ledger = DB::connection($cg)->table('C_ITRN')
            ->whereIn('id_reff', $bcs)
            ->when(!empty($branch), fn($q) => $q->where('CITRN_BRANCH', $branch))
            ->groupBy('id_reff', 'CITRN_ITMCD')
            ->select('id_reff', 'CITRN_ITMCD', DB::raw('SUM(CITRN_ITMQT) as QTY'))
            ->havingRaw('SUM(CITRN_ITMQT) > 0')
            ->get();

        foreach ($ledger as $row) {
            $result[$row->id_reff][] = [
                'source'    => 'stock',
                'item_code' => $row->CITRN_ITMCD,
                'item_name' => $this->barcodeItemName($cg, $row->CITRN_ITMCD),
                'qty'       => (float) $row->QTY,
                'docno'     => null,
            ];
        }

        // de-duplicate identical (item, qty) pairs from the two sources
        foreach ($result as $bc => $rows) {
            $seen = [];
            $result[$bc] = array_values(array_filter($rows, function ($r) use (&$seen) {
                $k = $r['item_code'] . '|' . $r['qty'];
                if (isset($seen[$k])) {
                    return false;
                }
                $seen[$k] = true;
                return true;
            }));
        }

        // Keep only barcodes that are genuinely NEW to the destination, or that
        // already sit on a DIFFERENT item there (the ambiguous case).
        foreach ($result as $bc => $rows) {
            $incoming = $mapped[$bc] ?? null;
            if (empty($incoming)) {
                continue;
            }
            $rows = array_values(array_filter($rows, fn($r) => (string) $r['item_code'] !== (string) $incoming));
            if (empty($rows)) {
                unset($result[$bc]);
            } else {
                $result[$bc] = $rows;
            }
        }

        return $result;
    }

    /**
     * Mirror a source CG's barcode onto the destination CG's registry so the
     * barcode is known there and screens can show it.
     * Idempotent: one row per (barcode, source ledger id) in the destination.
     *
     * @param  string $cgTo  destination connection alias
     * @param  array  $rows  [ ['BC'=>, 'ITMCD'=>, 'QTY'=>, 'DOC'=>, 'REF'=>], ... ]
     * @return int    number of registry rows written
     */
    public function registerTransferBarcodes($cgTo, array $rows, $branch = null)
    {
        $written = 0;
        foreach ($rows as $row) {
            $bc = $row['BC'] ?? null;
            if (empty($bc)) {
                continue;
            }

            $attrs = [
                'TRCVBC_BCCD' => $bc,
                'TRCVBC_REF'  => $row['REF'] ?? null,
            ];
            $values = [
                'TRCVBC_DOCNO'  => $row['DOC'] ?? null,
                'TRCVBC_BCQT'   => (float) ($row['QTY'] ?? 0),
                'TRCVBC_ORIGIN' => self::BC_ORIGIN_TRANSFER,
                'TRCVBC_REF'    => $row['REF'] ?? null,
                'updated_at'    => date('Y-m-d H:i:s'),
            ];

            // Existing row for this barcode in the destination: do not duplicate.
            $existing = DB::connection($cgTo)->table('T_RCV_BC_DETAIL')
                ->where('TRCVBC_BCCD', $bc)
                ->when(!empty($row['REF']), fn($q) => $q->where('TRCVBC_REF', $row['REF']))
                ->first();

            if (!empty($existing)) {
                continue;
            }

            $values['created_at'] = date('Y-m-d H:i:s');
            DB::connection($cgTo)->table('T_RCV_BC_DETAIL')->insert(
                array_merge($attrs, $values)
            );
            $written++;
        }

        return $written;
    }

    /** Item display name in the given company DB, for operator-facing warnings. */
    private function barcodeItemName($cg, $itemCode)
    {
        if (empty($itemCode)) {
            return null;
        }
        $row = DB::connection($cg)->table('M_ITM')
            ->where('MITM_ITMCD', $itemCode)
            ->select('MITM_ITMNM')
            ->first();

        return $row->MITM_ITMNM ?? null;
    }
}
