<?php

namespace App\Traits;

use Illuminate\Support\Facades\DB;

/**
 * Pre-flight for a cross-CG transfer when the stock being moved is barcoded.
 *
 * Policy (agreed with the operator):
 *   - Barcoded stock may move between CGs carrying its ORIGINAL barcode.
 *   - If the DESTINATION CG already knows that barcode (registry or ledger), the
 *     user is warned with the barcode, the item and the quantity already sitting
 *     there. Nothing is written until they confirm.
 *   - On confirm the transfer proceeds, and because the barcode is not free in
 *     the destination the received stock is registered under a NEWLY minted
 *     barcode (the source ledger row keeps the original one).
 *   - Un-barcoded stock is refuse-to-transfer for a CG move: it must be
 *     barcoded at the source first (`saveDirectBarcode`).
 */
trait TransferBarcodeTraits
{
    /**
     * Resolve what would happen to each item in a CG transfer, per barcode.
     *
     * @param  string $cgFrom source connection alias
     * @param  string $cgTo   destination connection alias
     * @param  array  $items  [ ['ITMCD'=>, 'QTY'=>, 'BRANCH'=>], ... ]
     * @return array  [
     *     'items'    => per item: barcoded qty / unbarcoded qty,
     *     'conflicts'=> barcode => rows already in the destination,
     *     'blocked'  => items that cannot be transferred (no barcoded stock),
     * ]
     */
    public function previewCgBarcodeTransfer($cgFrom, $cgTo, array $items)
    {
        $summary = [];
        $conflicts = [];
        $blocked = [];

        foreach ($items as $item) {
            $itemCode = $item['ITMCD'] ?? null;
            $qty = (float) ($item['QTY'] ?? 0);
            $branch = $item['BRANCH'] ?? null;
            if (empty($itemCode)) {
                continue;
            }

            # qty <= 0 means "not chosen yet" (the dialog opens before the operator
            # types a quantity). The barcode situation is qty-independent, so it is
            # still reported: an operator must see the destination-collision warning
            # while the dialog is open, not only after a failed save. Only the
            # "is there enough stock" verdict needs a real requested quantity.
            $qtyKnown = $qty > 0;

            $rows = DB::connection($cgFrom)->table('C_ITRN')
                ->where('CITRN_ITMCD', $itemCode)
                ->when(!empty($branch), fn($q) => $q->where('CITRN_BRANCH', $branch))
                ->select(
                    'id_reff',
                    DB::raw('SUM(CITRN_ITMQT) as QTY')
                )
                ->groupBy('id_reff')
                ->havingRaw('SUM(CITRN_ITMQT) > 0')
                ->get();

            $barcoded = $rows->filter(fn($r) => !empty($r->id_reff));
            $barcodedQty = (float) $barcoded->sum('QTY');
            $unbarcodedQty = (float) $rows->filter(fn($r) => empty($r->id_reff))->sum('QTY');

            $summary[$itemCode] = [
                'QTY'          => $qty,
                'BARCODED'     => $barcodedQty,
                'UNBARCODED'   => $unbarcodedQty,
                'CAN_TRANSFER' => $qtyKnown
                    ? ($barcodedQty >= $qty && $barcodedQty > 0)
                    : ($barcodedQty > 0),
            ];

            if ($barcodedQty <= 0) {
                $blocked[] = [
                    'item_code' => $itemCode,
                    'reason'    => 'No barcoded stock at the source location. Barcode the stock first.',
                    'unbarcoded' => $unbarcodedQty,
                    'requested'  => $qty,
                ];
                continue;
            }
            if ($qtyKnown && $barcodedQty < $qty) {
                $blocked[] = [
                    'item_code' => $itemCode,
                    'reason'    => 'Barcoded stock is less than the requested quantity.',
                    'barcoded'  => $barcodedQty,
                    'unbarcoded' => $unbarcodedQty,
                    'requested'  => $qty,
                ];
            }

            // warn on barcodes the destination already uses
            $bcs = $barcoded->pluck('id_reff', 'id_reff')
                ->map(fn($bc) => $itemCode)
                ->toArray();
            foreach ($this->barcodeConflictsIn($cgTo, $bcs, $branch) as $bc => $rowsInDest) {
                $conflicts[$bc] = [
                    'item_code' => $itemCode,
                    'existing'  => $rowsInDest,
                ];
            }
        }

        return [
            'items'     => $summary,
            'conflicts' => $conflicts,
            'blocked'   => $blocked,
        ];
    }

    /**
     * Human-readable warning lines for the confirmation dialog.
     */
    public function barcodeConflictMessages(array $conflicts)
    {
        $messages = [];
        foreach ($conflicts as $bc => $info) {
            foreach ($info['existing'] as $row) {
                $name = $row['item_name'] ? ' (' . $row['item_name'] . ')' : '';
                $messages[] = sprintf(
                    'Barcode %s already exists in the destination company on item %s%s with qty %s. A new barcode will be created for the transferred stock.',
                    $bc,
                    $row['item_code'],
                    $name,
                    rtrim(rtrim(number_format((float) $row['qty'], 2, '.', ''), '0'), '.')
                );
            }
        }

        return $messages;
    }
}
