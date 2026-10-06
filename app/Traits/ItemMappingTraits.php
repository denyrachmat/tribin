<?php

namespace App\Traits;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * Resolves business-role -> item code per company/branch from ITEM_MAPPINGS.
 *
 * Roles are a catalog stored in M_GENCODE under code GEN_MAP_ROLE
 * (MGECD_VALUE = role key, e.g. SPK_FUEL).
 */
trait ItemMappingTraits
{
    /**
     * Return the mapped item code, or null when nothing (active) is mapped.
     */
    public function mappedItemCode($role, $cg = null, $branch = null)
    {
        $cg = $cg ?: $this->dedicatedConnection;
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        $row = DB::table('ITEM_MAPPINGS')
            ->where('MAP_ROLE', $role)
            ->where('MAP_CG', $cg)
            ->where('MAP_BRANCH', $branch)
            ->where('MAP_ACTIVE', 1)
            ->first();

        return $row->MAP_ITMCD ?? null;
    }

    /**
     * Same as mappedItemCode() but throws a clear error message for JSON output.
     */
    public function mappedItemCodeOrFail($role, $cg = null, $branch = null)
    {
        $code = $this->mappedItemCode($role, $cg, $branch);
        if (empty($code)) {
            throw new \RuntimeException(
                "Item mapping not configured for role '{$role}' (company: " .
                ($cg ?: $this->dedicatedConnection) . ", branch: " .
                ($branch ?: (Auth::check() ? Auth::user()->branch : '-')) .
                "). Please set it in Master > Item Mapping."
            );
        }
        return $code;
    }

    /**
     * Convenience: the whole active mapping row (item + default location).
     */
    public function mappedItem($role, $cg = null, $branch = null)
    {
        $cg = $cg ?: $this->dedicatedConnection;
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        return DB::table('ITEM_MAPPINGS')
            ->where('MAP_ROLE', $role)
            ->where('MAP_CG', $cg)
            ->where('MAP_BRANCH', $branch)
            ->where('MAP_ACTIVE', 1)
            ->first();
    }

    /**
     * Roles offered in the UI. Reads the GEN_MAP_ROLE gencode catalog;
     * falls back to a built-in default so the screen is never empty.
     */
    public function mappingRoles($cg = null)
    {
        $cg = $cg ?: $this->dedicatedConnection;

        $rows = DB::table('M_GENCODE')
            ->where('MGECD_CODE', 'GEN_MAP_ROLE')
            ->where('MGECD_ACTIVE', 1)
            ->where(function ($q) use ($cg) {
                $q->where('MGECD_CG', $cg)->orWhereNull('MGECD_CG');
            })
            ->orderBy('MGECD_ORDER')
            ->get(['MGECD_VALUE', 'MGECD_DESC']);

        if ($rows->isEmpty()) {
            return collect([
                (object) ['MGECD_VALUE' => 'SPK_FUEL', 'MGECD_DESC' => 'SPK - Solar / Fuel'],
            ]);
        }

        return $rows;
    }
}
