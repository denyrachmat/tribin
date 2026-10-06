<?php

namespace App\Http\Controllers;

use App\Models\CompanyGroup;
use App\Models\ITEM_MAPPING;
use App\Models\M_ITM;
use App\Traits\ItemMappingTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

/**
 * Global master: maps a business role (e.g. SPK_FUEL) to an actual item code
 * per company + branch. Stock logic reads this instead of hardcoding item codes.
 */
class ItemMappingController extends Controller
{
    use ItemMappingTraits;

    protected $dedicatedConnection;

    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        if (isset($_COOKIE['CGID'])) {
            $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
        }
    }

    function index()
    {
        return view('master.item_mapping', [
            'companies' => CompanyGroup::select('*')->get(),
            'companiesJson' => CompanyGroup::select('name', 'connection')->get(),
            'rolesJson' => $this->mappingRoles(),
        ]);
    }

    /** List rows (optionally filtered), with company + resolved item name. */
    function search(Request $request)
    {
        $q = ITEM_MAPPING::query();

        if ($request->filled('ROLE')) {
            $q->where('MAP_ROLE', 'like', '%' . $request->ROLE . '%');
        }
        if ($request->filled('CG')) {
            $q->where('MAP_CG', $request->CG);
        }
        if ($request->filled('BRANCH')) {
            $q->where('MAP_BRANCH', $request->BRANCH);
        }

        $rows = $q->orderBy('MAP_CG')->orderBy('MAP_ROLE')->get();

        $data = $rows->map(function ($r) {
            $itemName = null;
            try {
                $itemName = optional(
                    M_ITM::on($r->MAP_CG)->where('MITM_ITMCD', $r->MAP_ITMCD)->first()
                )->MITM_ITMNM;
            } catch (\Throwable $e) {
                $itemName = null; // company db unreachable / item gone
            }
            return [
                'id' => $r->id,
                'MAP_ROLE' => $r->MAP_ROLE,
                'MAP_CG' => $r->MAP_CG,
                'MAP_BRANCH' => $r->MAP_BRANCH,
                'MAP_ITMCD' => $r->MAP_ITMCD,
                'MAP_LOCCD' => $r->MAP_LOCCD,
                'MAP_ACTIVE' => $r->MAP_ACTIVE,
                'ITEM_NAME' => $itemName,
            ];
        });

        return ['data' => $data];
    }

    /** Company list for dropdowns. */
    function companies()
    {
        return ['data' => CompanyGroup::select('name', 'connection')->get()];
    }

    /** Branch list for a given company connection. */
    function branches(Request $request)
    {
        $cg = $request->CG;
        if (empty($cg)) {
            return response()->json([['CG is required']], 406);
        }
        $rows = DB::connection($cg)->table('M_BRANCH')
            ->select('MBRANCH_CD', 'MBRANCH_NM')
            ->orderBy('MBRANCH_CD')->get();
        return ['data' => $rows];
    }

    /** Items inside a company (for the item picker). */
    function items(Request $request)
    {
        $cg = $request->CG;
        if (empty($cg)) {
            return response()->json([['CG is required']], 406);
        }
        $q = M_ITM::on($cg)->select('MITM_ITMCD', 'MITM_ITMNM', 'MITM_STKUOM');
        if ($request->filled('branch')) {
            $q->where('MITM_BRANCH', $request->branch);
        }
        if ($request->filled('search')) {
            $s = $request->search;
            $q->where(function ($w) use ($s) {
                $w->where('MITM_ITMCD', 'like', '%' . $s . '%')
                    ->orWhere('MITM_ITMNM', 'like', '%' . $s . '%');
            });
        }
        return ['data' => $q->orderBy('MITM_ITMCD')->limit(50)->get()];
    }

    /** Locations inside a company (for optional default location). */
    function locations(Request $request)
    {
        $cg = $request->CG;
        if (empty($cg)) {
            return response()->json([['CG is required']], 406);
        }
        return ['data' => DB::connection($cg)->table('M_LOC')
            ->select('MLOC_LOCCD', 'MLOC_LOCNM')->orderBy('MLOC_LOCCD')->get()];
    }

    /** Roles catalog (gencode GEN_MAP_ROLE, else built-in default). */
    function roles()
    {
        return ['data' => $this->mappingRoles()];
    }

    function simpan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'MAP_ROLE' => 'required',
            'MAP_CG' => 'required',
            'MAP_BRANCH' => 'required',
            'MAP_ITMCD' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        // Item must exist in that company's item master
        $item = M_ITM::on($request->MAP_CG)->where('MITM_ITMCD', $request->MAP_ITMCD)->first();
        if (empty($item)) {
            return response()->json([["Item '{$request->MAP_ITMCD}' does not exist in {$request->MAP_CG}"]], 406);
        }

        $exists = ITEM_MAPPING::where('MAP_ROLE', $request->MAP_ROLE)
            ->where('MAP_CG', $request->MAP_CG)
            ->where('MAP_BRANCH', $request->MAP_BRANCH)->first();

        if ($exists) {
            return response()->json([['Mapping for this role + company + branch already exists (id ' . $exists->id . ')']], 406);
        }

        $row = ITEM_MAPPING::create([
            'MAP_ROLE' => $request->MAP_ROLE,
            'MAP_CG' => $request->MAP_CG,
            'MAP_BRANCH' => $request->MAP_BRANCH,
            'MAP_ITMCD' => strtoupper($request->MAP_ITMCD),
            'MAP_LOCCD' => $request->MAP_LOCCD,
            'MAP_ACTIVE' => 1,
            'created_by' => Auth::check() ? Auth::user()->nick_name : null,
        ]);

        return ['msg' => 'OK', 'data' => $row];
    }

    function update(Request $request)
    {
        $row = ITEM_MAPPING::find($request->id);
        if (empty($row)) {
            return response()->json([['Mapping not found']], 406);
        }

        $item = M_ITM::on($request->MAP_CG)->where('MITM_ITMCD', $request->MAP_ITMCD)->first();
        if (empty($item)) {
            return response()->json([["Item '{$request->MAP_ITMCD}' does not exist in {$request->MAP_CG}"]], 406);
        }

        $row->update([
            'MAP_ROLE' => $request->MAP_ROLE,
            'MAP_CG' => $request->MAP_CG,
            'MAP_BRANCH' => $request->MAP_BRANCH,
            'MAP_ITMCD' => strtoupper($request->MAP_ITMCD),
            'MAP_LOCCD' => $request->MAP_LOCCD,
            'MAP_ACTIVE' => (int) $request->MAP_ACTIVE,
            'updated_by' => Auth::check() ? Auth::user()->nick_name : null,
        ]);

        return ['msg' => 'OK', 'data' => $row];
    }

    function delete($id)
    {
        $row = ITEM_MAPPING::find(base64_decode($id));
        if (empty($row)) {
            return response()->json([['Mapping not found']], 406);
        }
        $row->delete();
        return ['msg' => 'OK'];
    }
}
