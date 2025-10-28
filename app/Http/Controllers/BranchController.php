<?php

namespace App\Http\Controllers;

use App\Models\M_BRANCH;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

use App\Models\COMPANY_BRANCH;

class BranchController extends Controller
{
    protected $dedicatedConnection;

    public function __construct()
    {
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'branch']);
        return view('master.branch');
    }

    function showData(Request $request)
    {
        $query = COMPANY_BRANCH::on($this->dedicatedConnection)
            ->join('M_BRANCH', 'COMPANY_BRANCHES.BRANCH', '=', 'M_BRANCH.MBRANCH_CD')
            ->select([
                'COMPANY_BRANCHES.*',
                'M_BRANCH.MBRANCH_NM'
            ]);
        if ($request->has('pagination')) {
            $pagination = $request->pagination;
            $page = $pagination['page'] ?? 1;
            $rowsPerPage = $pagination['rowsPerPage'] ?? 15;

            // Add dynamic filter conditions from request
            if ($request->has('filter') && is_array($request->filter)) {
                foreach ($request->filter as $condition) {
                    if (isset($condition['column'], $condition['value'])) {
                        $column = $condition['column'];
                        $operator = $condition['operator'] ?? '=';
                        $value = $condition['value'];

                        if ($condition['column'] === 'startsWith') {
                            $query->where($column, 'like', $value . '%');
                        } elseif ($condition['column'] === 'endsWith') {
                            $query->where($column, 'like', '%' . $value);
                        } elseif (strtolower($operator) === 'between' && is_array($value) && count($value) === 2) {
                            $query->whereBetween($column, $value);
                        } else {
                            $query->where($column, $operator, $value);
                        }
                    }
                }
            }

            $RS = $query->paginate($rowsPerPage, ['*'], 'page', $page);
        } else {
            $RS = $query->get();
        }

        return ['data' => $RS];
    }

    function saveBranch(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'BRANCH' => [
                'required',
                Rule::unique($this->dedicatedConnection . '.M_BRANCH', 'MBRANCH_CD')
            ],
            'MBRANCH_NM' => 'required',
        ]);

        COMPANY_BRANCH::on($this->dedicatedConnection)->updateOrCreate(
            ['COMPANY' => $request->COMPANY, 'BRANCH' => $request->BRANCH],
            [
                'name' => $request->name,
                'address' => $request->address,
                'connection' => $request->connection,
                'phone' => $request->phone,
                'fax' => $request->fax,
                'invoice_letter_id' => $request->invoice_letter_id,
                'created_by' => Auth::user()->nick_name,
                'updated_by' => Auth::user()->nick_name,
                'BRANCH' => $request->BRANCH,
                'letter_head' => $request->letter_head,
                'quotation_letter_id' => $request->quotation_letter_id
            ]
        );

        M_BRANCH::on($this->dedicatedConnection)->updateOrCreate(
            ['MBRANCH_CD' => $request->BRANCH],
            [
                'MBRANCH_NM' => $request->MBRANCH_NM,
                'created_by' => Auth::user()->nick_name,
                'updated_by' => Auth::user()->nick_name,
            ]
        );

        return response()->json(['status' => true, 'message' => 'Branch saved successfully'], 200);
    }

    function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'MBRANCH_CD' => 'required',
            'MBRANCH_CD' => [
                Rule::unique($this->dedicatedConnection . '.M_BRANCH', 'MBRANCH_CD')
            ],
            'MBRANCH_NM' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        M_BRANCH::on($this->dedicatedConnection)->create([
            'MBRANCH_CD' => $request->MBRANCH_CD,
            'MBRANCH_NM' => $request->MBRANCH_NM,
            'created_by' => Auth::user()->nick_name,
        ]);
        return ['msg' => 'OK'];
    }

    function search(Request $request)
    {
        $columnMap = [
            'MBRANCH_CD',
            'MBRANCH_NM',
        ];
        $RS = M_BRANCH::on($this->dedicatedConnection)->select('*')->where($columnMap[$request->searchBy], 'like', '%' . $request->searchValue . '%')->get();
        return ['data' => $RS];
    }

    function update(Request $request)
    {
        $affectedRow = M_BRANCH::on($this->dedicatedConnection)->where('MBRANCH_CD', base64_decode($request->id))
            ->update([
                'MBRANCH_NM' => $request->MBRANCH_NM
            ]);
        return ['msg' => $affectedRow ? 'OK' : 'No changes'];
    }
}
