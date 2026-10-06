<?php

namespace App\Traits;

use App\Models\C_ITRN;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * SPK fuel (Solar) stock handling.
 *
 * Design agreed with the business:
 *  - User transfers stock WH1 -> WH-GAP manually via Master > Transfer Loc.
 *  - On SPK save, if the driver takes fuel from our own stock (supplier != SPBU),
 *    the WH-GAP balance is validated against the requested litres.
 *  - On GA Manager approval, the litres are deducted from WH-GAP as one stock row.
 *  - Editing/deleting an approved SPK reverses the previous deduction first,
 *    so the ledger never double-counts (idempotent per docno + form).
 *
 * Item code is resolved per company/branch from ITEM_MAPPINGS (role SPK_FUEL);
 * location/form come from the gencode route EVENT_LIST_SPK_FUEL.
 * Requires LocationTraits (whFor) and ItemMappingTraits (mappedItemCode).
 */
trait SpkFuelTraits
{
    /** Outbound stock row form used for the deduction. Defaults to OUT-SPK-FUEL. */
    protected function spkFuelForm($cg = null, $branch = null)
    {
        $leg = $this->spkFuelLeg($cg, $branch);
        return $leg['MGECD_DESC'] ?? 'OUT-SPK-FUEL';
    }

    /** Location fuel is deducted from (gencode EVENT_LIST_SPK_FUEL, outbound leg). */
    protected function spkFuelLocation($cg = null, $branch = null)
    {
        $leg = $this->spkFuelLeg($cg, $branch);
        return $leg['MGECD_VALUE'] ?? null;
    }

    protected function spkFuelLeg($cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        return $this->whFor('EVENT_LIST_SPK_FUEL', self::FLAG_OUT, $cg, $branch);
    }

    /**
     * Full fuel config for the active company: mapped item + location + form.
     * Returns nulls when not configured yet (feature stays dormant / backwards compatible).
     */
    protected function spkFuelConfig($cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        $item = method_exists($this, 'mappedItemCode')
            ? $this->mappedItemCode('SPK_FUEL', $cg, $branch)
            : null;

        return [
            'item' => $item,
            'loc' => $item ? $this->spkFuelLocation($cg, $branch) : null,
            'form' => $this->spkFuelForm($cg, $branch),
            'cg' => $cg,
            'branch' => $branch,
        ];
    }

    /** True when this SPK takes fuel from our own stock (i.e. not bought at a petrol station). */
    protected function spkUsesOwnFuel($spk)
    {
        $supplier = strtoupper((string) ($spk->CSPK_SUPPLIER ?? ''));
        return $supplier !== '' && $supplier !== 'SPBU';
    }

    /** Current on-hand quantity of an item at a location, from the stock ledger. */
    protected function stockAt($itmcd, $loc, $cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        return (float) C_ITRN::on($cg)
            ->where('CITRN_BRANCH', $branch)
            ->where('CITRN_ITMCD', $itmcd)
            ->where('CITRN_LOCCD', $loc)
            ->sum('CITRN_ITMQT');
    }

    /**
     * Validate that enough fuel exists at the deduction location.
     * Returns [ok(bool), message(string|null), cfg(array)].
     * When the feature is not configured yet, validation is skipped (ok = true).
     */
    protected function validateSpkFuelStock($liters, $cg = null, $branch = null)
    {
        $cfg = $this->spkFuelConfig($cg, $branch);

        // Feature not configured for this company/branch -> stay dormant.
        if (empty($cfg['item']) || empty($cfg['loc'])) {
            return [true, null, $cfg];
        }

        $have = $this->stockAt($cfg['item'], $cfg['loc'], $cfg['cg'], $cfg['branch']);
        $need = (float) $liters;

        if ($need <= 0) {
            return [true, null, $cfg];
        }

        if ($have < $need) {
            return [
                false,
                sprintf(
                    'Insufficient fuel stock: %s at %s has %s, this SPK needs %s. ' .
                    'Please transfer stock from WH1 to %s (Master > Transfer Loc) first.',
                    $cfg['item'],
                    $cfg['loc'],
                    rtrim(rtrim(number_format($have, 2, '.', ''), '0'), '.'),
                    rtrim(rtrim(number_format($need, 2, '.', ''), '0'), '.'),
                    $cfg['loc']
                ),
                $cfg,
            ];
        }

        return [true, null, $cfg];
    }

    /**
     * Write the outbound fuel row (idempotent per docno + form + item + location).
     * Returns true when a row exists afterwards (written or already present).
     */
    protected function deductSpkFuel($spk, $cg = null, $branch = null)
    {
        if (!$this->spkUsesOwnFuel($spk)) {
            return false;
        }

        $liters = (float) ($spk->CSPK_LITER ?? 0);
        if ($liters <= 0) {
            return false;
        }

        $cfg = $this->spkFuelConfig($cg, $branch);
        if (empty($cfg['item']) || empty($cfg['loc'])) {
            return false;
        }

        $branch = $cfg['branch'];

        // Never deduct twice for the same document: replace any existing row.
        $this->reverseSpkFuel($spk, $cg, $branch);

        C_ITRN::on($cfg['cg'])->create([
            'CITRN_BRANCH' => $branch,
            'CITRN_LOCCD' => $cfg['loc'],
            'CITRN_DOCNO' => $spk->CSPK_DOCNO,
            'CITRN_ISSUDT' => date('Y-m-d H:i:s'),
            'CITRN_FORM' => $cfg['form'],
            'CITRN_ITMCD' => $cfg['item'],
            'CITRN_ITMQT' => $liters * -1,
            'CITRN_PRCPER' => 0,
            'CITRN_PRCAMT' => 0,
            'created_by' => Auth::check() ? Auth::user()->nick_name : null,
        ]);

        return true;
    }

    /** Remove the deduction row(s) for a SPK document. Returns affected row count. */
    protected function reverseSpkFuel($spk, $cg = null, $branch = null)
    {
        $cfg = $this->spkFuelConfig($cg, $branch);
        $docno = is_object($spk) ? ($spk->CSPK_DOCNO ?? null) : $spk;
        if (empty($docno) || empty($cfg['item'])) {
            return 0;
        }

        $branch = $cfg['branch'];

        return C_ITRN::on($cfg['cg'])
            ->where('CITRN_BRANCH', $branch)
            ->where('CITRN_DOCNO', $docno)
            ->where('CITRN_FORM', $cfg['form'])
            ->where('CITRN_ITMCD', $cfg['item'])
            ->delete();
    }
}
