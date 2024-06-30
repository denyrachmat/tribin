<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\T_SLOHEAD;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\View\Factory;
use App\Models\T_GLHIST;
use Excel;

use App\Exports\acc\glReportExport;

class AccountingIFController extends Controller
{
    protected $dedicatedConnection;

    public function __construct()
    {
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    public function index() {
        return view('tribinapp_layouts', ['routeApp' => 'accIF']);
    }

    public function searchAPI(Request $request) : Array {
        $data = DB::connection($this->dedicatedConnection)->table('V_UNREG_ACCT_DATA');

        if (!empty($request->searchValue)) {
            $data = (clone $data)->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        return ['data' => $data->get()];
    }

    public function submitClosing($date) {
        $data = DB::connection($this->dedicatedConnection)->table('V_UNREG_ACCT_DATA')
            ->where('EFFDATE', '<=', $date)
            ->get();

            $insertedData = [];
        foreach ($data as $key => $value) {
            $insertedData = T_GLHIST::on(($this->dedicatedConnection))->create([
                'GLHIST_ACC' => $value->TYPE_TRANS == 'INC-SLS' ? '40100' : '61000',
                'GLHIST_AMT' => $value->ITMQT * $value->ITMPRC,
                'GLHIST_CURR' => $value->CURR,
                'GLHIST_DESC' => '',
                'GLHIST_DOC' => $value->DOCCD,
                'GLHIST_EFFDT' => $date,
                'GLHIST_CRDT' => $value->CRDATE,
                'GLHIST_DOCTYPE' => $value->TYPE_TRANS,
                'GLHIST_ITMCD' => $value->ITMCD
            ]);
        }

        return [
            'status' => true,
            'msg' => 'Success',
            'data' => $insertedData
        ];
    }

    public function glreportform() {
        return view('tribinapp_layouts', ['routeApp' => 'glReport']);
    }

    public function journalreportform() {
        return view('tribinapp_layouts', ['routeApp' => 'journalReport']);
    }

    public function exportGLReport(Request $request) {
        return Excel::download(new glReportExport(
            $this->dedicatedConnection,
            $request->accFr,
            $request->accTo,
            empty($request->dateFr) ? '1970-01-01' : $request->dateFr,
            empty($request->dateTo) ? '2999-12-31' : $request->dateTo,
        )
        , 'glExport.xlsx');

        return 'storage/app/public/glExport.xlsx';
    }
}
