<?php

namespace App\Http\Controllers;

use App\Models\C_ITRN;
use App\Models\T_PCHORDDETA;
use App\Models\T_RCV_DETAIL;
use App\Models\T_RCV_HEAD;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ReceiveController extends Controller
{
    protected $dedicatedConnection;

    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    function index()
    {
        // return view('tribinapp_layouts', ['routeApp' => 'incoming']);
        return view('transaction.receive');
    }

    function outstandingPO(Request $request)
    {
        $columnMap = [
            'TPCHORD_PCHCD',
            'MSUP_SUPNM',
        ];

        $groupedColumns = ['TPCHORDDETA_BRANCH', 'TPCHORDDETA_PCHCD', 'TPCHORDDETA_ITMCD', 'TPCHORDDETA_ITMPRC_PER', 'MSUP_SUPCD', 'MSUP_SUPNM', 'TPCHORD_ISSUDT'];
        $receivegroupedColumns = ['branch', 'po_number', 'item_code', 'unit_price'];

        $subData = T_PCHORDDETA::on($this->dedicatedConnection)
            ->leftJoin('T_PCHORDHEAD', function ($join) {
                $join->on('TPCHORDDETA_PCHCD', '=', 'TPCHORD_PCHCD')
                    ->on('TPCHORDDETA_BRANCH', '=', 'TPCHORD_BRANCH');
            })
            ->leftJoin('M_SUP', function ($join) {
                $join->on('TPCHORD_SUPCD', '=', 'MSUP_SUPCD')
                    ->on('TPCHORD_BRANCH', '=', 'MSUP_BRANCH');
            })
            ->whereNull('deleted_at')
            ->where('TPCHORDDETA_BRANCH', Auth::user()->branch)
            ->where($columnMap[$request->searchBy], 'LIKE', '%' . $request->searchValue . '%')
            ->groupBy($groupedColumns)
            ->select(array_merge($groupedColumns, [DB::raw("SUM(TPCHORDDETA_ITMQT) AS POQT")]));

        $receivingData = T_RCV_DETAIL::on($this->dedicatedConnection)
            ->where('branch', Auth::user()->branch)
            ->whereNull('deleted_at')
            ->groupBy($receivegroupedColumns)
            ->select(array_merge($receivegroupedColumns, [DB::raw("SUM(quantity) AS RCVQT")]));

        $dataFinal = DB::connection($this->dedicatedConnection)
            ->query()->fromSub($subData, 'V1')
            ->leftJoinSub($receivingData, 'V2', function ($join) {
                $join->on('TPCHORDDETA_BRANCH', '=', 'branch')
                    ->on('TPCHORDDETA_PCHCD', '=', 'po_number')
                    ->on('TPCHORDDETA_ITMCD', '=', 'item_code')
                    ->on('TPCHORDDETA_ITMPRC_PER', '=', 'unit_price');
            })
            ->select(array_merge($groupedColumns, ["POQT", DB::raw("IFNULL(RCVQT,0) AS RCVQT")]))
            ->whereRaw("POQT > IFNULL(RCVQT,0)");

        $data = DB::connection($this->dedicatedConnection)
            ->query()->fromSub($dataFinal, 'V3')
            ->groupBy('TPCHORDDETA_PCHCD', 'MSUP_SUPCD', 'MSUP_SUPNM', 'TPCHORD_ISSUDT')
            ->select('TPCHORDDETA_PCHCD', 'MSUP_SUPCD', 'MSUP_SUPNM', 'TPCHORD_ISSUDT')->get();

        return ['data' => $data];
    }

    function outstandingPOPerDocument(Request $request)
    {
        $groupedColumns = ['TPCHORDDETA_BRANCH', 'TPCHORDDETA_PCHCD', 'TPCHORDDETA_ITMCD', 'MITM_ITMNM', 'TPCHORDDETA_ITMPRC_PER', 'MSUP_SUPCD', 'MSUP_SUPNM', 'TPCHORD_ISSUDT'];
        $receivegroupedColumns = ['branch', 'po_number', 'item_code', 'unit_price'];

        $subData = T_PCHORDDETA::on($this->dedicatedConnection)
            ->leftJoin('T_PCHORDHEAD', function ($join) {
                $join->on('TPCHORDDETA_PCHCD', '=', 'TPCHORD_PCHCD')
                    ->on('TPCHORDDETA_BRANCH', '=', 'TPCHORD_BRANCH');
            })
            ->leftJoin('M_SUP', function ($join) {
                $join->on('TPCHORD_SUPCD', '=', 'MSUP_SUPCD')
                    ->on('TPCHORD_BRANCH', '=', 'MSUP_BRANCH');
            })
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TPCHORDDETA_ITMCD', '=', 'MITM_ITMCD')
                    ->on('TPCHORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->whereNull('deleted_at')
            ->where('TPCHORDDETA_BRANCH', Auth::user()->branch)
            ->where('TPCHORD_PCHCD', base64_decode($request->id))
            ->groupBy($groupedColumns)
            ->select(array_merge($groupedColumns, [DB::raw("SUM(TPCHORDDETA_ITMQT) AS POQT")]));

        $receivingData = T_RCV_DETAIL::on($this->dedicatedConnection)
            ->where('branch', Auth::user()->branch)
            ->whereNull('deleted_at')
            ->groupBy($receivegroupedColumns)
            ->select(array_merge($receivegroupedColumns, [DB::raw("SUM(quantity) AS RCVQT")]));

        $data = DB::connection($this->dedicatedConnection)
            ->query()->fromSub($subData, 'V1')
            ->leftJoinSub($receivingData, 'V2', function ($join) {
                $join->on('TPCHORDDETA_BRANCH', '=', 'branch')
                    ->on('TPCHORDDETA_PCHCD', '=', 'po_number')
                    ->on('TPCHORDDETA_ITMCD', '=', 'item_code')
                    ->on('TPCHORDDETA_ITMPRC_PER', '=', 'unit_price');
            })
            ->select(array_merge($groupedColumns, ["POQT", DB::raw("IFNULL(RCVQT,0) AS RCVQT, POQT-IFNULL(RCVQT,0) AS BALQT")]))
            ->whereRaw("POQT > IFNULL(RCVQT,0)")->get();

        return ['data' => $data];
    }

    function delete(Request $request)
    {
        $parentDoc = T_RCV_DETAIL::on($this->dedicatedConnection)->select('id_header')
            ->where('id', $request->id)
            ->first();

        $affectedRow = T_RCV_DETAIL::on($this->dedicatedConnection)->where('id', $request->id)
            ->update([
                'deleted_at' => date('Y-m-d H:i:s'),
                'deleted_by' => Auth::user()->nick_name
            ]);
        if ($affectedRow) {
            $countRow = T_RCV_DETAIL::on($this->dedicatedConnection)
                ->where('id_header', $parentDoc->id_header)
                ->whereNull('deleted_at')
                ->count();
            if ($countRow === 0) {
                T_RCV_HEAD::on($this->dedicatedConnection)->where('id', $parentDoc->id_header)
                    ->update([
                        'deleted_at' => date('Y-m-d H:i:s'),
                        'deleted_by' => Auth::user()->nick_name,
                    ]);
            }
        }
        return [
            'msg' => $affectedRow ? 'OK' : 'could not be deleted',
            'affectedRow' => $affectedRow,
            'headRowsCount' => $countRow,
        ];
    }

    function save(Request $request)
    {
        # data quotation header
        $validator = Validator::make($request->all(), [
            'TRCV_SUPCD' => 'required',
            'TRCV_ISSUDT' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $quotationHeader = [
            'TRCV_RCVCD' => $request->TRCV_RCVCD,
            'TRCV_SUPCD' => $request->TRCV_SUPCD,
            'TRCV_ISSUDT' => $request->TRCV_ISSUDT,
            'created_by' => Auth::user()->nick_name,
            'TRCV_BRANCH' => Auth::user()->branch
        ];

        # data quotation detail item
        $validator = Validator::make($request->all(), [
            'item_code' => 'required|array',
            'quantity' => 'required|array',
            'quantity.*' => 'required|numeric',
            'unit_price' => 'required|array',
            'unit_price.*' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $countDetail = count($request->item_code);

        $createdObj = T_RCV_HEAD::on($this->dedicatedConnection)->create($quotationHeader);
        $quotationDetail = [];
        for ($i = 0; $i < $countDetail; $i++) {
            $quotationDetail[] = [
                'id_header' => $createdObj->id,
                'po_number' => $request->po_number[$i],
                'item_code' => $request->item_code[$i],
                'quantity' => $request->quantity[$i],
                'unit_price' => $request->unit_price[$i],
                'created_by' => Auth::user()->nick_name,
                'created_at' => date('Y-m-d H:i:s'),
                'branch' => Auth::user()->branch
            ];
        }

        if (!empty($quotationDetail)) {
            T_RCV_DETAIL::on($this->dedicatedConnection)->insert($quotationDetail);
        }

        return [
            'msg' => 'OK',
            'doc' => $createdObj->id
        ];
    }

    function saveAPI(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'TRCV_SUPCD' => 'required',
            'TRCV_ISSUDT' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $validator = Validator::make($request->all(), [
            'det.*.item_code' => 'required|string',
            'det.*.quantity' => 'required|numeric',
            'det.*.unit_price' => 'required|numeric',
        ]);

        $monthOfRoma = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

        $LastLine = T_RCV_HEAD::connection($this->dedicatedConnection)
            ->whereMonth('created_at', '=', date('m'))
            ->whereYear('created_at', '=', date('Y'))
            ->where('TSLO_BRANCH', Auth::user()->branch)
            ->first();

        if ($request->has('TRCV_RCVCD') && !empty($request->TRCV_RCVCD)) {
            $newDocumentCode = $request->TRCV_RCVCD;
        } else {
            if (!$LastLine) {
                $newDocumentCode = '001/JAT/RCV/' . $monthOfRoma[date('n') - 1] . '/' . date('Y');
            } else {
                $getLastLine = explode('/', $LastLine->TRCV_RCVCD)[0];
                $newDocumentCode = substr('00' . ((int) $getLastLine), -3) . '/JAT/RCV/' . $monthOfRoma[date('n') - 1] . '/' . date('Y');
            }
        }

        $head = T_RCV_HEAD::on($this->dedicatedConnection)->updateOrCreate([
            'TRCV_RCVCD' => $newDocumentCode,
        ],[
            'TRCV_RCVCD' => $newDocumentCode,
            'TRCV_BRANCH' => $request->TRCV_BRANCH,
            'TRCV_SUPCD' => $request->TRCV_SUPCD,
            'TRCV_ISSUDT' => $request->TRCV_ISSUDT,
            'TRCV_SUBMITTED_AT' => date('Y-m-d H:i:s'),
            'TRCV_SUBMITTED_BY' => Auth::user()->nick_name,
            'TRCV_DOCNO' => $request->TRCV_DOCNO,
            'TRCV_REFFNO' => $request->TRCV_REFFNO,
        ]);

        T_RCV_DETAIL::on($this->dedicatedConnection)->where('id_header', $newDocumentCode)->delete();
        foreach ($request->det as $key => $valueDet) {
            T_RCV_DETAIL::on($this->dedicatedConnection)->create([
                'id_header' => $head->id,
                'branch' => Auth::user()->branch,
                'po_number' => '',
                'item_code' => $valueDet['item_code'],
                'quantity' => $valueDet['quantity'],
                'unit_price' => $valueDet['unit_price'],
            ]);
        }

        return [
            'msg' => 'Receive Stored',
            'data' => $head
        ];
    }

    function loadById(Request $request)
    {
        $documentNumber = base64_decode($request->id);

        $RS = T_RCV_DETAIL::on($this->dedicatedConnection)->select(["id", "po_number", "item_code", "MITM_ITMNM", "quantity", "unit_price"])
            ->leftJoin("M_ITM", function ($join) {
                $join->on("item_code", "=", "MITM_ITMCD")
                    ->on('branch', '=', 'MITM_BRANCH');
            })
            ->where('id_header', $documentNumber)
            ->where('branch', Auth::user()->branch)
            ->whereNull('deleted_at')->get();


        $RSHeader = T_RCV_HEAD::on($this->dedicatedConnection)
            ->where('id', $documentNumber)
            ->get();


        return [
            'dataItem' => $RS,
            'dataHeader' => $RSHeader
        ];
    }

    function update(Request $request)
    {
        $affectedRow = T_RCV_HEAD::on($this->dedicatedConnection)
            ->where('id', base64_decode($request->id))
            ->where('TRCV_BRANCH', Auth::user()->branch)
            ->whereNull('TRCV_SUBMITTED_AT')
            ->update([
                'TRCV_ISSUDT' => $request->TRCV_ISSUDT,
                'TRCV_RCVCD' => $request->TRCV_RCVCD,
                'updated_by' => Auth::user()->nick_name
            ]);
        return ['msg' => $affectedRow ? 'OK' : 'No changes'];
    }

    function search(Request $request)
    {
        $columnMap = [
            'T_RCV_HEAD.id',
            'MSUP_SUPNM',
            'TRCV_RCVCD',
        ];

        $RS = T_RCV_HEAD::on($this->dedicatedConnection)->select(["T_RCV_HEAD.id", "MSUP_SUPNM", "TRCV_RCVCD", "TRCV_ISSUDT", "MSUP_SUPCD", "TRCV_SUBMITTED_AT"])
            ->leftJoin("M_SUP", function ($join) {
                $join->on('TRCV_SUPCD', '=', 'MSUP_SUPCD')->on('TRCV_BRANCH', '=', 'MSUP_BRANCH');
            })
            ->where($columnMap[$request->searchBy], 'like', '%' . $request->searchValue . '%')
            ->where('TRCV_BRANCH', Auth::user()->branch)
            ->whereNull('deleted_at')
            ->get();
        return ['data' => $RS];
    }

    function searchApi(Request $request)
    {
        $columnMap = [
            'TSLO_SLOCD',
            'MCUS_CUSNM',
            'TSLO_POCD',
        ];

        $RS = T_RCV_HEAD::on($this->dedicatedConnection)->select(["T_RCV_HEAD.id", "MSUP_SUPNM", "TRCV_RCVCD", "TRCV_ISSUDT", "MSUP_SUPCD", "TRCV_SUBMITTED_AT"])
            ->leftJoin("M_SUP", function ($join) {
                $join->on('TRCV_SUPCD', '=', 'MSUP_SUPCD')->on('TRCV_BRANCH', '=', 'MSUP_BRANCH');
            })
            ->where('TRCV_BRANCH', Auth::user()->branch)
            ->whereNull('deleted_at');

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        return ['data' => $RS->get()];
    }

    function submit(Request $request)
    {
        try {
            $doc = base64_decode($request->id);
            DB::connection($this->dedicatedConnection)->beginTransaction();
            $affectedRow = T_RCV_HEAD::on($this->dedicatedConnection)
                ->where('id', $doc)
                ->whereNull('TRCV_SUBMITTED_AT')
                ->update([
                    'TRCV_SUBMITTED_AT' => date('Y-m-d H:i:s'),
                    'TRCV_SUBMITTED_BY' => Auth::user()->nick_name
                ]);
            if ($affectedRow) {
                $t_rcv_detail = T_RCV_DETAIL::on($this->dedicatedConnection)
                    ->leftJoin('T_RCV_HEAD', 'id_header', '=', 'T_RCV_HEAD.id')
                    ->whereNull('T_RCV_DETAIL.deleted_at')
                    ->select('T_RCV_DETAIL.*', 'TRCV_RCVCD', 'TRCV_ISSUDT')
                    ->get();
                $tobeSaved = [];

                foreach ($t_rcv_detail as $r) {
                    $tobeSaved[] = [
                        'CITRN_BRANCH' => Auth::user()->branch,
                        'CITRN_LOCCD' => 'WH1',
                        'CITRN_DOCNO' => $r->TRCV_RCVCD,
                        'CITRN_ISSUDT' => $r->TRCV_ISSUDT,
                        'CITRN_FORM' => 'INC-SHP',
                        'CITRN_ITMCD' => $r->item_code,
                        'CITRN_ITMQT' => $r->quantity,
                        'CITRN_PRCPER' => $r->unit_price,
                        'CITRN_PRCAMT' => $r->unit_price * $r->quantity,
                        'created_by' => Auth::user()->nick_name,
                        'created_at' => date('Y-m-d H:i:s'),
                        'id_reff' => $r->id_header,
                    ];
                }

                if (!empty($tobeSaved)) {
                    C_ITRN::on($this->dedicatedConnection)->insert(
                        $tobeSaved
                    );
                }
                DB::connection($this->dedicatedConnection)->commit();

                return ['message' => 'Submitted successfully'];
            } else {
            }
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json([[$e->getMessage()]], 406);
        }
    }
}
