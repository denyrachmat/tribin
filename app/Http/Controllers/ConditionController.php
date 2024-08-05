<?php

namespace App\Http\Controllers;

use App\Models\CompanyGroup;
use App\Models\M_Condition;
use App\Models\M_COND_GROUP;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Route;

class ConditionController extends Controller
{
    protected $dedicatedConnection;

    public function __construct()
    {
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'condition']);
        // return view('master.condition', [
        //     'companies' => CompanyGroup::select('*')->where('connection', '!=', $this->dedicatedConnection)->get(),
        //     'CurrentCompanies' => CompanyGroup::select('*')->where('connection', $this->dedicatedConnection)->get(),
        //     'getConditions' => M_Condition::on($this->dedicatedConnection)->get()
        // ]);
    }

    public function getData()
    {
        return M_Condition::on($this->dedicatedConnection)->get();
    }

    public function getCompaniesDetail(): array
    {
        return [
            'companies' => CompanyGroup::select('*')->where('connection', '!=', $this->dedicatedConnection)->get(),
            'CurrentCompanies' => CompanyGroup::select('*')->where('connection', $this->dedicatedConnection)->get(),
        ];
    }

    public function getDataGroup()
    {
        $group = M_COND_GROUP::on($this->dedicatedConnection)
            ->join('M_CONDITIONS', 'M_CONDITIONS.id', '=', 'MCOND_ID')
            ->get();
        // $group = M_Condition::on($this->dedicatedConnection)
        //     ->select('MCONDITION_RPT_STAT')
        //     ->whereNotNull('MCONDITION_RPT_STAT')
        //     ->where('MCONDITION_RPT_STAT', '<>', '')
        //     ->groupBy('MCONDITION_RPT_STAT')
        //     ->get()
        //     ->pluck('MCONDITION_RPT_STAT');

        $data = [];
        foreach ($group as $key => $value) {
            $data[$value->MCOND_GRPNM]['MCONDITION_RPT_STAT'] = $value->MCOND_GRPNM;
            $data[$value->MCOND_GRPNM]['group'][] = $value;
        }

        return [
            'status' => true,
            'message' => 'Data fetched !',
            'data' => array_values($data)
        ];
    }

    public function importFromAnotherCompany(Request $request)
    {
        $currentDBName = DB::connection($this->dedicatedConnection)->getDatabaseName();
        $RS = DB::connection($request->fromConnection)->table('M_CONDITIONS AS A')
            ->select('A.MCONDITION_DESCRIPTION', 'A.MCONDITION_ORDER_NUMBER', 'A.MCONDITION_BRANCH')
            ->leftJoin($currentDBName . '.M_CONDITIONS AS B', 'A.MCONDITION_DESCRIPTION', '=', 'B.MCONDITION_DESCRIPTION')
            ->where('A.MCONDITION_BRANCH', Auth::user()->branch)
            ->whereNull('B.MCONDITION_DESCRIPTION');
        $RSTosave = json_decode(json_encode($RS->get()), true);
        if (!empty($RSTosave)) {
            M_Condition::on($this->dedicatedConnection)->insert($RSTosave);
            return ['message' => 'Done, ' . count($RSTosave) . ' imported'];
        } else {
            return ['message' => 'no new data'];
        }
    }

    public function simpan(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'MCONDITION_DESCRIPTION' => 'required',
            'MCONDITION_DESCRIPTION' => [
                Rule::unique($this->dedicatedConnection . '.M_CONDITIONS', 'MCONDITION_DESCRIPTION')->where('MCONDITION_BRANCH', Auth::user()->branch)
            ],
            // 'MCONDITION_ORDER_NUMBER' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $creator = M_Condition::on($this->dedicatedConnection)->create([
            'MCONDITION_DESCRIPTION' => $request->MCONDITION_DESCRIPTION,
            'MCONDITION_ORDER_NUMBER' => M_Condition::on($this->dedicatedConnection)->orderBy('MCONDITION_ORDER_NUMBER', 'desc')->first()->MCONDITION_ORDER_NUMBER + 1,
            'MCONDITION_BRANCH' => Auth::user()->branch,
            'created_by' => Auth::user()->nick_name,
        ]);
        return ['msg' => 'OK', 'id' => $creator->id];
    }

    function search(Request $request)
    {
        $columnMap = [
            'MCONDITION_DESCRIPTION',
            'MCONDITION_ORDER_NUMBER',
        ];
        $RS = M_Condition::on($this->dedicatedConnection)->select('*')
            ->where($columnMap[$request->searchBy], 'like', '%' . $request->searchValue . '%')
            ->where('MCONDITION_BRANCH', Auth::user()->branch)
            ->orderBy('MCONDITION_ORDER_NUMBER')
            ->get();
        return ['data' => $RS, Auth::user()->branch];
    }

    function update(Request $request)
    {
        $getData = M_Condition::on($this->dedicatedConnection)
            ->where('id', base64_decode($request->id))
            ->first();

        $affectedRow = M_Condition::on($this->dedicatedConnection)
            ->where('id', base64_decode($request->id))
            ->where('MCONDITION_BRANCH', Auth::user()->branch)
            ->update([
                'MCONDITION_DESCRIPTION' => $request->MCONDITION_DESCRIPTION,
                'MCONDITION_ORDER_NUMBER' => $request->has('MCONDITION_ORDER_NUMBER') && !empty($request->MCONDITION_ORDER_NUMBER)
                    ? $request->MCONDITION_ORDER_NUMBER
                    : (
                        empty($getData->MCONDITION_ORDER_NUMBER)
                        ? M_Condition::on($this->dedicatedConnection)->orderBy('MCONDITION_ORDER_NUMBER', 'desc')->first()->MCONDITION_ORDER_NUMBER + 1
                        : $getData->MCONDITION_ORDER_NUMBER
                    ),
                'updated_by' => Auth::user()->nick_name,
            ]);
        return ['msg' => $affectedRow ? 'OK' : 'No changes'];
    }

    function delete(Request $request)
    {
        $affectedRow = M_Condition::on($this->dedicatedConnection)
            ->where('id', base64_decode($request->id))
            ->where('MCONDITION_BRANCH', Auth::user()->branch)
            ->delete();
        return ['msg' => $affectedRow ? 'OK' : 'No changes'];
    }

    public function assignGroup(Request $request)
    {
        M_COND_GROUP::on($this->dedicatedConnection)
            ->where('MCOND_GRPNM', $request->MCONDITION_RPT_STAT)
            ->delete();

        foreach ($request->data as $key => $value) {
            M_COND_GROUP::on($this->dedicatedConnection)->create([
                'MCOND_GRPNM' => $request->MCONDITION_RPT_STAT,
                'MCOND_ID' => $value
            ]);
        }

        return [
            'status' => true,
            'message' => 'Update success !!'
        ];
    }

    public function deleteDataGroup($id)
    {
        $affectedRow = M_COND_GROUP::on($this->dedicatedConnection)
            ->where('MCOND_GRPNM', base64_decode($id))
            ->delete();

        return ['msg' => $affectedRow ? 'Data Deleted !!' : 'No changes'];
    }
}
