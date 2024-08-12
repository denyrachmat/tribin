<?php

namespace App\Http\Controllers;

use App\Models\C_ITRN;
use App\Models\T_PCHORDDETA;
use App\Models\T_RCV_BC_DETAIL;
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
        return view('tribinapp_layouts', ['routeApp' => 'incoming']);
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

    function delete($id)
    {
        $parentDoc = T_RCV_DETAIL::on($this->dedicatedConnection)->select('id_header')
            ->where('id', $id)
            ->first();

        $affectedRow = T_RCV_DETAIL::on($this->dedicatedConnection)->where('id', $id)
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

        $LastLine = T_RCV_HEAD::on($this->dedicatedConnection)
            ->whereMonth('created_at', '=', date('m'))
            ->whereYear('created_at', '=', date('Y'))
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
            'TRCV_BRANCH' => Auth::user()->branch,
        ], [
            'TRCV_RCVCD' => $newDocumentCode,
            'TRCV_BRANCH' => Auth::user()->branch,
            'TRCV_SUPCD' => $request->TRCV_SUPCD,
            'TRCV_ISSUDT' => $request->TRCV_ISSUDT,
            'created_by' => Auth::user()->nick_name,
            'TRCV_DOCNO' => $request->TRCV_DOCNO,
            'TRCV_REFFNO' => $request->TRCV_REFFNO,
        ]);

        T_RCV_DETAIL::on($this->dedicatedConnection)->where('id_header', $head->id)->delete();
        foreach ($request->det as $key => $valueDet) {
            T_RCV_DETAIL::on($this->dedicatedConnection)->create([
                'id_header' => $head->id,
                'branch' => Auth::user()->branch,
                'created_by' => Auth::user()->nick_name,
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

        $RS = T_RCV_HEAD::on($this->dedicatedConnection)->select([
            "T_RCV_HEAD.id",
            "TRCV_RCVCD",
            "TRCV_ISSUDT",
            "TRCV_REFFNO",
            "TRCV_DOCNO",
            DB::raw("CASE WHEN MSUP_SUPCD IS NULL THEN MCUS_CUSCD ELSE MSUP_SUPCD END AS MSUP_SUPCD"),
            DB::raw("CASE WHEN MSUP_SUPCD IS NULL THEN MCUS_CUSNM ELSE MSUP_SUPNM END AS MSUP_SUPNM"),
            DB::raw("CASE WHEN MSUP_SUPCD IS NULL THEN MCUS_CURCD ELSE MSUP_CURCD END AS MSUP_CURCD"),
            "TRCV_SUBMITTED_AT",
            DB::raw('SUM(quantity) AS TOT_RCV'),
            DB::raw('SUM(TRCVDET_TOTAMT) AS TOT_AMT'),
            DB::raw('CASE WHEN MSUP_SUPCD IS NULL THEN 2 ELSE 1 END AS RCV_STATE'),
            DB::raw('SUM(TRCVBC_BCQT) AS CONFIRMED_QTY')
        ])
            ->leftJoin("M_SUP", function ($join) {
                $join->on('TRCV_SUPCD', '=', 'MSUP_SUPCD')->on('TRCV_BRANCH', '=', 'MSUP_BRANCH');
            })
            ->leftJoin("M_CUS", function ($join) {
                $join->on('TRCV_SUPCD', '=', 'MCUS_CUSCD')->on('TRCV_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin(DB::raw('(SELECT T_RCV_DETAIL.*, (quantity * unit_price) AS TRCVDET_TOTAMT FROM T_RCV_DETAIL) T_RCV_DETAIL'), "T_RCV_HEAD.id", 'id_header')
            ->leftJoin('T_RCV_BC_DETAIL', "TRCVBC_DETID", 'T_RCV_DETAIL.id')
            ->with([
                'bc' => function($f) {
                    $f->select(
                        'TRCVBC_BCCD',
                        'TRCV_RCVCD',
                        'TRCVBC_DOCNO',
                        'TRCVBC_BCQT',
                        'MSUP_SUPNM',
                        'item_code',
                        'MITM_ITMNM',
                        DB::raw("COALESCE((
                            SELECT SUM(CITRN_ITMQT)
                            FROM C_ITRN WHERE id_reff = TRCVBC_BCCD
                            AND CITRN_LOCCD = 'WH1'
                        ), 0) AS STOCK_QTY")
                    )
                    ->join('T_RCV_DETAIL', 'TRCVBC_DETID', 'T_RCV_DETAIL.id')
                    ->join('T_RCV_HEAD', 'T_RCV_HEAD.id', 'T_RCV_DETAIL.id_header')
                    ->join(DB::raw("(SELECT * FROM M_ITM) itm"), 'MITM_ITMCD', 'item_code')
                    ->leftjoin('M_SUP', 'MSUP_SUPCD', 'TRCV_SUPCD');
                },
                'det' => function ($f) {
                    $f->select(
                        'T_RCV_DETAIL.id',
                        'id_header',
                        'item_code',
                        DB::raw('quantity - COALESCE(SUM(TRCVBC_BCQT), 0) as quantity'),
                        'unit_price',
                        DB::raw('CASE WHEN id_reff IS NULL THEN 0 ELSE 1 END AS IS_CONFIRMED'),
                        DB::raw('COALESCE(SUM(TRCVBC_BCQT), 0) AS CONFIRMED_QTY')
                    )
                        // ->join('T_RCV_HEAD', 'T_RCV_HEAD.id', 'id_header')
                        ->leftJoin('T_RCV_BC_DETAIL', 'TRCVBC_DETID', 'T_RCV_DETAIL.id')
                        ->leftJoin('C_ITRN', function ($join) {
                            $join->on('TRCVBC_BCCD', 'id_reff');
                            // $join->on('CITRN_DOCNO', 'TRCV_RCVCD');
                            // $join->where('CITRN_LOCCD', 'WH1');
                        })
                        ->groupBy(
                            'T_RCV_DETAIL.id',
                            'id_header',
                            'item_code',
                            'quantity',
                            'unit_price',
                            'id_reff'
                        )
                        ->having(DB::raw('quantity - COALESCE(SUM(TRCVBC_BCQT), 0)'), '>', 0)
                        ->whereNull('T_RCV_DETAIL.deleted_at')
                        ->get();
                }
            ])
            ->where('TRCV_BRANCH', Auth::user()->branch)
            ->groupBy(
                "T_RCV_HEAD.id",
                "MSUP_SUPNM",
                "MSUP_CURCD",
                "TRCV_RCVCD",
                "TRCV_ISSUDT",
                "TRCV_DOCNO",
                "TRCV_REFFNO",
                "MSUP_SUPCD",
                "MCUS_CUSCD",
                "MCUS_CUSNM",
                "MCUS_CURCD",
                "TRCV_SUBMITTED_AT"
            );

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

    function confirmIncoming(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'TRCV_RCVCD' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        foreach ($request->det as $key => $value) {
            $cek = C_ITRN::on($this->dedicatedConnection)
                ->where('CITRN_LOCCD', 'WH1')
                ->where('CITRN_DOCNO', $request->TRCV_RCVCD)
                ->where('CITRN_FORM', 'INC-SHP')
                ->where('id_reff', $value['id'])
                ->first();

            if (empty($cek) && isset($value['IS_CONFIRMED']) && $value['IS_CONFIRMED'] == 1) {
                $bc = '';
                if (empty($cekLatestBarcode)) {
                    $bc = 'BC'.date('Ymd').'0001';
                } else {
                    $bc = 'BC'.date('Ymd').sprintf('%04d', (int) substr($cekLatestBarcode->TRCVBC_BCCD, -3) + 1);
                }

                C_ITRN::on($this->dedicatedConnection)->create([
                    'CITRN_BRANCH' => Auth::user()->branch,
                    'CITRN_LOCCD' => 'WH1',
                    'CITRN_DOCNO' => $request->TRCV_RCVCD,
                    'CITRN_ISSUDT' => $request->TRCV_ISSUDT,
                    'CITRN_FORM' => 'INC-SHP',
                    'CITRN_ITMCD' => $value['item_code'],
                    'CITRN_ITMQT' => $value['CONFIRMED_QTY'],
                    'CITRN_PRCPER' => $value['unit_price'],
                    'CITRN_PRCAMT' => $value['unit_price'] * $value['CONFIRMED_QTY'],
                    'created_by' => Auth::user()->nick_name,
                    'created_at' => date('Y-m-d H:i:s'),
                    'id_reff' => $bc,
                ]);

                T_RCV_DETAIL::on($this->dedicatedConnection)->where('id', $value['id'])->update([
                    'updated_by' => Auth::user()->nick_name,
                ]);

                $cekLatestBarcode = T_RCV_BC_DETAIL::on($this->dedicatedConnection)
                    ->whereBetween('created_at', [date('Y-m-d 00:00:00'), date('Y-m-d 23:59:59')])
                    ->first();

                // Save to be incoming barcode
                T_RCV_BC_DETAIL::on($this->dedicatedConnection)->create([
                    'TRCVBC_BCCD' => $bc,
                    'TRCVBC_DOCNO' => $request->TRCV_RCVCD,
                    'TRCVBC_BCQT' => $value['CONFIRMED_QTY'],
                    'TRCVBC_DETID' => $value['id'],
                ]);
            }
        }

        $cekConfirmed = array_filter($request->det, function ($f) {
            return isset($f['IS_CONFIRMED']) && $f['IS_CONFIRMED'] == 1;
        });

        if (count($cekConfirmed) === count($request->det)) {
            T_RCV_HEAD::on($this->dedicatedConnection)->where('TRCV_RCVCD', $request->TRCV_RCVCD)->update([
                'TRCV_SUBMITTED_AT' => date('Y-m-d H:i:s'),
                'TRCV_SUBMITTED_BY' => Auth::user()->nick_name,
            ]);
        }

        return ['MSG' => 'Submitted successfully'];
    }
}
