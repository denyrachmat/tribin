<?php

namespace App\Traits;

use App\Support\DiscountCalculator as DC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;

/**
 * Discount attachment: which discounts a customer gets, which an item category
 * carries, and what that means for a quotation line.
 *
 * M_DISC (the rates) lives in the main database; the link tables live per company,
 * so integrity against M_DISC is checked here in code rather than by a foreign key.
 */
trait DiscountScopingTraits
{
    /** Resolve the company connection name for the request. */
    private function discConnection(?Request $request = null): string
    {
        $conn = $request->input('conn') ?? $this->dedicatedConnection ?? null;

        if (empty($conn) || $conn === '-') {
            throw \Illuminate\Validation\ValidationException::withMessages([
                'conn' => ['Company connection is required.'],
            ]);
        }

        return $conn;
    }

    /** The discount definitions, keyed by code, from the main database. */
    private function discMasters(array $codes = []): array
    {
        $query = \App\Models\M_DISC::query();

        if (!empty($codes)) {
            $query->whereIn('MDISC_CODE', $codes);
        }

        $out = [];
        foreach ($query->get() as $row) {
            $out[(string) $row->MDISC_CODE] = [
                'code' => (string) $row->MDISC_CODE,
                'desc' => (string) $row->MDISC_DESC,
                // EITHER a percent OR an amount, never both - enforced on save.
                'type' => $row->MDISC_PERCENT !== null ? 'PERCENT' : 'AMOUNT',
                'value' => (float) ($row->MDISC_PERCENT ?? $row->MDISC_AMT ?? 0),
            ];
        }

        return $out;
    }

    /** Reject discount codes that do not exist in the master. */
    private function assertDiscCodesExist(array $codes): array
    {
        $codes = array_values(array_unique(array_filter($codes)));
        if (empty($codes)) {
            return [];
        }

        $known = array_keys($this->discMasters($codes));
        $missing = array_values(array_diff($codes, $known));

        if (!empty($missing)) {
            // ValidationException renders as a 422 JSON response, matching the shape
            // the rest of these endpoints return.
            throw \Illuminate\Validation\ValidationException::withMessages([
                'MDISC_CODE' => ['Unknown discount code(s): ' . implode(', ', $missing)],
            ]);
        }

        return $codes;
    }

    // ------------------------------------------------------------------ customer

    /**
     * Discounts attached to one customer, joined to their definitions.
     */
    public function discCustomerList(Request $request)
    {
        $conn = $this->discConnection($request);
        $cuscd = (string) $request->input('MCUSD_CUSCD', '');

        $links = DB::connection($conn)->table('M_CUS_DISC')
            ->where('MCUSD_CUSCD', $cuscd)
            ->orderBy('MCUSD_SEQ')
            ->orderBy('MDISC_CODE')
            ->get();

        $masters = $this->discMasters($links->pluck('MDISC_CODE')->all());

        $out = [];
        foreach ($links as $l) {
            $m = $masters[(string) $l->MDISC_CODE] ?? null;
            $out[] = [
                'id' => $l->id,
                'MDISC_CODE' => (string) $l->MDISC_CODE,
                'MDISC_DESC' => $m['desc'] ?? '(deleted master)',
                'type' => $m['type'] ?? null,
                'value' => $m['value'] ?? null,
                'MCUSD_MODE' => (string) ($l->MCUSD_MODE ?: DC::MODE_STACK),
                'MCUSD_SEQ' => (int) $l->MCUSD_SEQ,
                'MCUSD_BRANCH' => $l->MCUSD_BRANCH,
                'missing' => $m === null,
            ];
        }

        // The customer's rounding / combination preference, so the form can show it.
        $cus = DB::connection($conn)->table('M_CUS')->where('MCUS_CUSCD', $cuscd)->first();

        return [
            'data' => $out,
            'settings' => [
                'MCUS_ROUNDMODE' => $cus->MCUS_ROUNDMODE ?? null,
                'MCUS_ROUNDDP' => $cus->MCUS_ROUNDDP ?? null,
                'MCUS_DISCMODE' => $cus->MCUS_DISCMODE ?? null,
                'effective' => DC::resolveRounding($cus->MCUS_ROUNDMODE ?? null, $cus->MCUS_ROUNDDP ?? null),
            ],
        ];
    }

    /**
     * Replace one customer's discount set, and their rounding/stacking preference.
     *
     * Replace-the-set rather than merge: the UI edits an ordered list, and merging
     * would leave rows the user cannot see or delete.
     */
    public function discCustomerSave(Request $request)
    {
        $conn = $this->discConnection($request);
        $cuscd = trim((string) $request->input('MCUSD_CUSCD', ''));

        $validator = Validator::make(
            ['MCUSD_CUSCD' => $cuscd],
            ['MCUSD_CUSCD' => 'required|string|max:10']
        );
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()->all()], 422);
        }

        $exists = DB::connection($conn)->table('M_CUS')->where('MCUS_CUSCD', $cuscd)->exists();
        if (!$exists) {
            return response()->json(['error' => ["Customer {$cuscd} does not exist in this company."]], 422);
        }

        $rows = $request->input('rows', []);
        if (!is_array($rows)) {
            return response()->json(['error' => ['rows must be an array']], 422);
        }

        // Validate every code before writing anything.
        $this->assertDiscCodesExist(array_column($rows, 'MDISC_CODE'));

        $settings = $request->input('settings', []);
        $roundMode = strtoupper((string) ($settings['MCUS_ROUNDMODE'] ?? ''));
        if ($roundMode !== '' && !in_array($roundMode, [DC::ROUND_NEAREST, DC::ROUND_DOWN, DC::ROUND_UP], true)) {
            return response()->json(['error' => ['Rounding mode must be NEAREST, DOWN or UP.']], 422);
        }
        $discMode = strtoupper((string) ($settings['MCUS_DISCMODE'] ?? ''));
        if ($discMode !== '' && !in_array($discMode, [DC::MODE_STACK, DC::MODE_REPLACE], true)) {
            return response()->json(['error' => ['Discount mode must be STACK or REPLACE.']], 422);
        }
        $dp = $settings['MCUS_ROUNDDP'] ?? null;
        if ($dp !== null && $dp !== '' && (!is_numeric($dp) || (int) $dp < 0 || (int) $dp > 6)) {
            return response()->json(['error' => ['Decimals must be between 0 and 6.']], 422);
        }

        DB::connection($conn)->transaction(function () use ($conn, $cuscd, $rows, $settings, $roundMode, $discMode, $dp) {
            DB::connection($conn)->table('M_CUS_DISC')->where('MCUSD_CUSCD', $cuscd)->delete();

            foreach (array_values($rows) as $i => $row) {
                DB::connection($conn)->table('M_CUS_DISC')->insert([
                    'MCUSD_CUSCD' => $cuscd,
                    'MDISC_CODE' => (string) $row['MDISC_CODE'],
                    'MCUSD_MODE' => strtoupper((string) ($row['MCUSD_MODE'] ?? DC::MODE_STACK)) === DC::MODE_REPLACE
                        ? DC::MODE_REPLACE : DC::MODE_STACK,
                    // The array order IS the sequence, so the UI's up/down buttons
                    // are all that is needed to reorder.
                    'MCUSD_SEQ' => $i + 1,
                    'MCUSD_BRANCH' => $row['MCUSD_BRANCH'] ?? null,
                    'created_by' => Auth::user()->nick_name ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

            DB::connection($conn)->table('M_CUS')->where('MCUS_CUSCD', $cuscd)->update([
                'MCUS_ROUNDMODE' => $roundMode !== '' ? $roundMode : null,
                'MCUS_ROUNDDP' => ($dp === null || $dp === '') ? null : (int) $dp,
                'MCUS_DISCMODE' => $discMode !== '' ? $discMode : null,
            ]);
        });

        return ['msg' => 'Customer discounts saved'];
    }

    // -------------------------------------------------------------- item category

    /**
     * Discounts attached to item categories, with the definitions joined in.
     */
    public function discItemCatList(Request $request)
    {
        $conn = $this->discConnection($request);

        $links = DB::connection($conn)->table('M_DISC_ITEMCAT')
            ->orderBy('MDIC_ITMCAT')
            ->orderBy('MDIC_SEQ')
            ->get();

        $masters = $this->discMasters($links->pluck('MDISC_CODE')->all());

        $out = [];
        foreach ($links as $l) {
            $m = $masters[(string) $l->MDISC_CODE] ?? null;
            $out[] = [
                'id' => $l->id,
                'MDIC_ITMCAT' => (string) $l->MDIC_ITMCAT,
                'MDISC_CODE' => (string) $l->MDISC_CODE,
                'MDISC_DESC' => $m['desc'] ?? '(deleted master)',
                'type' => $m['type'] ?? null,
                'value' => $m['value'] ?? null,
                'MDIC_MODE' => (string) ($l->MDIC_MODE ?: DC::MODE_STACK),
                'MDIC_SEQ' => (int) $l->MDIC_SEQ,
            ];
        }

        return ['data' => $out, 'categories' => $this->discCategories($conn)];
    }

    /**
     * Replace the discount set of one item category.
     */
    public function discItemCatSave(Request $request)
    {
        $conn = $this->discConnection($request);
        $cat = trim((string) $request->input('MDIC_ITMCAT', ''));

        $validator = Validator::make(['MDIC_ITMCAT' => $cat], ['MDIC_ITMCAT' => 'required|string|max:15']);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->fails() ? $validator->errors()->all() : []], 422);
        }

        // Category is a free string on M_ITM, so a typo would silently match nothing.
        // Require it to exist on at least one item of this company.
        $known = array_column($this->discCategories($conn), 'MITM_ITMCAT');
        if (!in_array($cat, $known, true)) {
            return response()->json(['error' => ["Category '{$cat}' does not exist on any item in this company."]], 422);
        }

        $rows = $request->input('rows', []);
        if (!is_array($rows)) {
            return response()->json(['error' => ['rows must be an array']], 422);
        }

        $this->assertDiscCodesExist(array_column($rows, 'MDISC_CODE'));

        DB::connection($conn)->transaction(function () use ($conn, $cat, $rows) {
            DB::connection($conn)->table('M_DISC_ITEMCAT')->where('MDIC_ITMCAT', $cat)->delete();

            foreach (array_values($rows) as $i => $row) {
                DB::connection($conn)->table('M_DISC_ITEMCAT')->insert([
                    'MDIC_ITMCAT' => $cat,
                    'MDISC_CODE' => (string) $row['MDISC_CODE'],
                    'MDIC_MODE' => strtoupper((string) ($row['MDIC_MODE'] ?? DC::MODE_STACK)) === DC::MODE_REPLACE
                        ? DC::MODE_REPLACE : DC::MODE_STACK,
                    'MDIC_SEQ' => $i + 1,
                    'MDIC_BRANCH' => $row['MDIC_BRANCH'] ?? null,
                    'created_by' => Auth::user()->nick_name ?? null,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        });

        return ['msg' => 'Category discounts saved'];
    }

    /** Categories in use by this company's items, for the picker. */
    private function discCategories(string $conn): array
    {
        return DB::connection($conn)->table('M_ITM')
            ->select('MITM_ITMCAT')
            ->whereNotNull('MITM_ITMCAT')
            ->where('MITM_ITMCAT', '<>', '')
            ->groupBy('MITM_ITMCAT')
            ->orderBy('MITM_ITMCAT')
            ->get()
            ->map(fn ($r) => ['MITM_ITMCAT' => (string) $r->MITM_ITMCAT])
            ->all();
    }

    // ------------------------------------------------------------- the resolver

    /**
     * Every discount that applies to a line, ready for DiscountCalculator.
     *
     * Customer discounts come from M_CUS_DISC; category discounts from
     * M_DISC_ITEMCAT matched on M_ITM.MITM_ITMCAT. The customer's MCUS_DISCMODE acts
     * as the default mode for their own rows; an individual row can still override it.
     */
    public function discResolveForLine(string $conn, string $cuscd, ?string $itmcd, ?string $branch = null): array
    {
        $out = [];
        $codes = [];

        $cat = null;
        if ($itmcd !== null && $itmcd !== '') {
            $cat = DB::connection($conn)->table('M_ITM')->where('MITM_ITMCD', $itmcd)->value('MITM_ITMCAT');
        }

        // category-level
        if ($cat !== null && $cat !== '') {
            $rows = DB::connection($conn)->table('M_DISC_ITEMCAT')
                ->where('MDIC_ITMCAT', $cat)
                ->when($branch !== null && $branch !== '', function ($q) use ($branch) {
                    $q->where(function ($qq) use ($branch) {
                        $qq->whereNull('MDIC_BRANCH')->orWhere('MDIC_BRANCH', $branch)->orWhere('MDIC_BRANCH', '');
                    });
                })
                ->orderBy('MDIC_SEQ')->get();

            foreach ($rows as $r) {
                $out[] = ['code' => (string) $r->MDISC_CODE, 'src' => 'CAT', 'mode' => (string) ($r->MDIC_MODE ?: DC::MODE_STACK), 'seq' => (int) $r->MDIC_SEQ];
                $codes[] = (string) $r->MDISC_CODE;
            }
        }

        // customer-level
        $cusMode = DB::connection($conn)->table('M_CUS')->where('MCUS_CUSCD', $cuscd)->value('MCUS_DISCMODE');

        if ($cuscd !== null && $cuscd !== '') {
            $rows = DB::connection($conn)->table('M_CUS_DISC')
                ->where('MCUSD_CUSCD', $cuscd)
                ->when($branch !== null && $branch !== '', function ($q) use ($branch) {
                    $q->where(function ($qq) use ($branch) {
                        $qq->whereNull('MCUSD_BRANCH')->orWhere('MCUSD_BRANCH', $branch)->orWhere('MCUSD_BRANCH', '');
                    });
                })
                ->orderBy('MCUSD_SEQ')->get();

            foreach ($rows as $r) {
                $out[] = [
                    'code' => (string) $r->MDISC_CODE,
                    'src' => 'CUST',
                    'mode' => (string) ($r->MCUSD_MODE ?: ($cusMode ?: DC::MODE_STACK)),
                    // offset so customer rows sort after category rows by default
                    'seq' => 1000 + (int) $r->MCUSD_SEQ,
                ];
                $codes[] = (string) $r->MDISC_CODE;
            }
        }

        // attach the definitions
        $masters = $this->discMasters($codes);
        $resolved = [];
        foreach ($out as $item) {
            $m = $masters[$item['code']] ?? null;
            if ($m === null) {
                // A link pointing at a deleted master: skip it rather than guess a rate.
                Log::warning('discount link references a missing master', ['code' => $item['code'], 'conn' => $conn]);
                continue;
            }
            $resolved[] = $item + ['type' => $m['type'], 'value' => $m['value']];
        }

        return $resolved;
    }
}
