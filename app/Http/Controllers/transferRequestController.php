<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use App\Models\T_LOC_REQ;
use App\Models\C_ITRN;
use App\Models\M_GENCODE;
use App\Traits\LocationTraits;

use App\Models\T_SRV_HEAD;
use App\Models\T_SRV_DET;
use App\Models\T_SRV_FIXDET;

class transferRequestController extends Controller
{
    use LocationTraits;
    protected $dedicatedConnection;
    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'transferRequest']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        foreach ($request->data as $key => $value) {
            $deferService = $this->isServiceTransfer($value['TLOCREQ_DOCNO']);

            if (isset($value['listBarcode']) && count($value['listBarcode']) > 0) {
                foreach ($value['listBarcode'] as $keyBC => $valueBC) {
                    if (!$deferService) {
                        $cek = $this->transferLoc(
                            new Request([
                                'EVENT' => 'EVENT_LIST_SERVICE',
                                'DOC' => $value['TLOCREQ_DOCNO'],
                                'LOCFROM' => $value['TLOCREQ_FRLOC'],
                                'LOCTO' => $value['TLOCREQ_TOLOC'],
                                'ITMCD' => $value['TLOCREQ_ITMCD'],
                                'QTY' => $value['TLOCREQ_QTY'],
                                'BC' => $valueBC['TSRVF_BC']
                            ])
                        );

                        $cekArray = is_array($cek) ? $cek : json_decode($cek->getContent(), true);
                        if (isset($cekArray['status']) && $cekArray['status'] == false) {
                            return response()->json([
                                'status' => false,
                                'error' => 'Transfer failed for item ' . $value['TLOCREQ_ITMCD'] . ' with BC: ' . $valueBC['TSRVF_BC'] . '. Error: ' . $cekArray['error'],
                                'param' => [
                                    'cg_code' => $this->dedicatedConnection,
                                    'date' => date('Y-m-d'),
                                    'reference_number' => $value['TLOCREQ_DOCNO'],
                                    'journal_code' => '',
                                    'description' => '',
                                    'amount' => 0,
                                ],
                                'data' => $cekArray,
                            ], 400);
                        }

                        if ($value['TLOCREQ_ISREP'] == 1) {
                            $this->runRoute(
                                'EVENT_LIST_SERVICE_SCR',
                                [
                                    'DOC' => $value['TLOCREQ_DOCNO'],
                                    'ITMCD' => $value['TLOCREQ_ITMCD'],
                                    'QTY' => $value['TLOCREQ_QTY'],
                                    'BC' => $valueBC['TSRVF_BC']
                                ],
                                $this->dedicatedConnection
                            );
                        }
                    }

                    $splitDoc = explode('-', $value['TLOCREQ_DOCNO']);
                    $getHeader = T_SRV_HEAD::on($this->dedicatedConnection)->where('SRVH_DOCNO', $splitDoc[0])->first();
                    if (!empty($getHeader)) {
                        $getDetailID = T_SRV_DET::on($this->dedicatedConnection)
                            ->where('TSRVH_ID', $getHeader->id)
                            ->where('TSRVD_LINE', $splitDoc[1])
                            ->first();

                        if (!empty($getDetailID)) {
                            T_SRV_FIXDET::on($this->dedicatedConnection)
                                ->where('TSRVD_ID', $getDetailID->id)
                                ->where('TSRVF_ITMCD', $value['TLOCREQ_ITMCD'])
                                ->update([
                                    'TSRVF_BC' => $valueBC['TSRVF_BC'],
                                ]);
                        }
                    }
                }
            } else {
                $cekForIss = DB::connection($this->dedicatedConnection)
                    ->table('V_STOCK_CHECK')
                    ->where('CITRN_ITMCD', $value['TLOCREQ_ITMCD'])
                    ->where('CITRN_ITMQT', '>', 0)
                    ->first();

                if ($value['TLOCREQ_QTY'] > 0) {
                    if (!$deferService) {
                        $this->transferLoc(
                            new Request([
                                'EVENT' => 'EVENT_LIST_SERVICE',
                                'DOC' => $value['TLOCREQ_DOCNO'],
                                'LOCFROM' => $value['TLOCREQ_FRLOC'],
                                'LOCTO' => $value['TLOCREQ_TOLOC'],
                                'ITMCD' => $value['TLOCREQ_ITMCD'],
                                'QTY' => $value['TLOCREQ_QTY']
                            ])
                        );

                        if ($value['TLOCREQ_ISREP'] == 1) {
                            $this->runRoute(
                                'EVENT_LIST_SERVICE_SCR',
                                [
                                    'DOC' => $value['TLOCREQ_DOCNO'],
                                    'ITMCD' => $value['TLOCREQ_ITMCD'],
                                    'QTY' => $value['TLOCREQ_QTY']
                                ],
                                $this->dedicatedConnection
                            );
                        }
                    }

                    if (!$deferService) {
                        T_LOC_REQ::on($this->dedicatedConnection)
                            ->where('id', $value['id'])
                            ->update([
                                'TLOCREQ_APPRVDT' => date('Y-m-d H:i:s'),
                                'TLOCREQ_APPRVBY' => Auth::user()->nick_name
                            ]);
                    }
                }
            }
        }

        if ($deferService ?? false) {
            // Warehouse submitted for manager approval: mark submitted,
            // stock still not moved until approveData runs.
            T_LOC_REQ::on($this->dedicatedConnection)
                ->whereIn('TLOCREQ_DOCNO', collect($request->data)->pluck('TLOCREQ_DOCNO')->unique())
                // ->whereNull('TLOCREQ_APPRVDT')
                ->update([
                    'TLOCREQ_SUBMITTED' => date('Y-m-d H:i:s'),
                    'TLOCREQ_APPRVDT' => null,
                    'TLOCREQ_APPRVBY' => null
                ]);

            return ['msg' => 'Transfer request submitted, awaiting approval !!'];
        }

        return ['msg' => 'Transfer Approved !!'];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    function unbarcodedStock(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'item' => 'required',
            'loc' => 'required',
            'doc' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $data = C_ITRN::on($this->dedicatedConnection)
            ->select(
                'CITRN_LOCCD',
                'CITRN_ITMCD',
                DB::raw('SUM(CITRN_ITMQT) AS STOCK')
            )
            ->where('CITRN_ITMCD', $request->item)
            ->where('CITRN_LOCCD', $request->loc)
            ->where('CITRN_DOCNO', $request->doc)
            ->whereNull('id_reff')
            ->where('CITRN_ITMQT', '>', 0)
            ->groupBy('CITRN_LOCCD', 'CITRN_ITMCD')
            ->first();

        return response()->json([
            'item' => $request->item,
            'loc' => $request->loc,
            'doc' => $request->doc,
            'stock' => $data ? (float) $data->STOCK : 0,
        ]);
    }

    function assignBarcode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'item' => 'required',
            'loc' => 'required',
            'loc_stocksrc' => 'required',
            'doc' => 'required',
            'barcode' => 'required'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $stockInfo = $this->unbarcodedStock(new Request([
            'item' => $request->item,
            'loc' => $request->loc,
            'doc' => $request->doc,
        ]));
        $stockInfo = json_decode($stockInfo->getContent(), true);

        if ($stockInfo['stock'] <= 0) {
            return response()->json([
                'status' => false,
                'error' => 'No un-barcoded stock for item ' . $request->item . ' at ' . $request->loc,
            ], 406);
        }

        $barcodeCheck = app(InventoryController::class)->findStockByBarcode($request->barcode, $request->loc_stocksrc);
        $barcodeData = json_decode($barcodeCheck->getContent(), true);

        if ($barcodeCheck->status() == 404 || empty($barcodeData)) {
            return response()->json([
                'status' => false,
                'error' => 'Barcode ' . $request->barcode . ' not found in stock !!',
            ], 406);
        }

        if ($barcodeData[0]['CITRN_ITMCD'] != $request->item) {
            return response()->json([
                'status' => false,
                'error' => 'Barcode ' . $request->barcode . ' is for item ' . $barcodeData[0]['CITRN_ITMCD'] . ' not ' . $request->item,
            ], 406);
        }

        if ((float) $barcodeData[0]['STOCK'] < $stockInfo['stock']) {
            return response()->json([
                'status' => false,
                'error' => 'Stock for barcode ' . $request->barcode . ' (' . $barcodeData[0]['STOCK'] . ') not enough to cover un-barcoded qty (' . $stockInfo['stock'] . ') !!',
            ], 406);
        }

        DB::connection($this->dedicatedConnection)->beginTransaction();
        try {
            C_ITRN::on($this->dedicatedConnection)
                ->where('CITRN_ITMCD', $request->item)
                ->where('CITRN_LOCCD', $request->loc)
                ->where('CITRN_DOCNO', $request->doc)
                ->whereNull('id_reff')
                // ->where('CITRN_ITMQT', '>', 0)
                ->update([
                    'id_reff' => $request->barcode,
                    'updated_by' => Auth::user()->nick_name,
                ]);
            DB::connection($this->dedicatedConnection)->commit();
        } catch (Exception $e) {
            DB::connection($this->dedicatedConnection)->rollBack();
            return response()->json([
                'status' => false,
                'error' => $e->getMessage(),
            ], 406);
        }

        return ['msg' => 'Barcode ' . $request->barcode . ' assigned to ' . $stockInfo['stock'] . ' un-barcoded stock of ' . $request->item];
    }

    function searchApi(Request $request)
    {
        $perPage = (int) ($request->perPage ?? 20);
        $page = (int) ($request->page ?? 1);

        $svcIncLeg = $this->whFor('EVENT_LIST_SERVICE', self::FLAG_INC, $this->dedicatedConnection, Auth::user()->branch);
        $svcIncLoc = $svcIncLeg['MGECD_VALUE'] ?? 'WH-SRV';
        $svcIncForm = $svcIncLeg['MGECD_DESC'] ?? 'INC-TRF-LOC';

        $data = T_LOC_REQ::on($this->dedicatedConnection)
            ->select(
                'TLOCREQ_DOCNO',
                'TLOCREQ_FRLOC',
                'TLOCREQ_TOLOC',
                // 'TLOCREQ_APPRVBY',
                DB::raw('SUM(TLOCREQ_QTY) as TLOCREQ_QTY'),
                DB::raw("(
                    SELECT COALESCE(SUM(CITRN_ITMQT),0) FROM C_ITRN
                    WHERE CITRN_DOCNO = TLOCREQ_DOCNO
                    AND CITRN_LOCCD = '{$svcIncLoc}'
                    AND CITRN_FORM = '{$svcIncForm}'
                ) as checkstock"),
                DB::raw('(select max(TLOCREQ_ISREP) from T_LOC_REQ tlr where tlr.TLOCREQ_DOCNO = TLOCREQ_DOCNO limit 1) as TLOCREQ_ISREP'),
                DB::raw("SUM(TLOCREQ_QTY) - (
                    SELECT COALESCE(SUM(CITRN_ITMQT),0) FROM C_ITRN
                    WHERE CITRN_DOCNO = TLOCREQ_DOCNO
                    AND CITRN_LOCCD = '{$svcIncLoc}'
                    AND CITRN_FORM = '{$svcIncForm}'
                ) as OS_TF"),
                DB::raw('max(TLOCREQ_APPRVDT) as TLOCREQ_APPRVDT'),
                DB::raw('max(TLOCREQ_SUBMITTED) as TLOCREQ_SUBMITTED')
            )
            ->where('TLOCREQ_ISREP', 0)
            ->where(function ($q) {
                // Non-service transfers: keep all rows (unchanged behavior).
                // Service transfers: only show while warehouse has not yet
                // submitted them for manager approval.
                $q->whereNotExists(function ($sub) {
                    $sub->selectRaw('1')
                        ->from('T_SRV_HEAD')
                        ->whereColumn('SRVH_DOCNO', DB::raw("SUBSTRING_INDEX(TLOCREQ_DOCNO,'-',1)"));
                });
                $q->orWhereNull('TLOCREQ_SUBMITTED');
                $q->orWhereNotNull('TLOCREQ_APPRVBY');
            })
            // ->havingRaw("SUM(TLOCREQ_QTY) - (
            //         SELECT COALESCE(SUM(CITRN_ITMQT),0) FROM C_ITRN
            //         WHERE CITRN_DOCNO = TLOCREQ_DOCNO
            //         AND CITRN_LOCCD = 'WH-SRV'
            //     ) > 0")
            ->groupBy(
                // 'TLOCREQ_APPRVBY',
                'TLOCREQ_DOCNO',
                'TLOCREQ_FRLOC',
                'TLOCREQ_TOLOC',
            )
            ->orderBy('created_at', 'desc');

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $data->where($request->searchBy, 'like', "%{$request->searchValue}%");
        }

        $paginated = $data->paginate($perPage, ['*'], 'page', $page);

        $hasil = [];
        foreach ($paginated->getCollection()->map(fn($m) => $m->toArray()) as $value) {
            $hasil[] = array_merge($value, [
                'detail' => T_LOC_REQ::on($this->dedicatedConnection)
                    ->select(
                        'id',
                        'TLOCREQ_DOCNO',
                        'TLOCREQ_FRLOC',
                        'TLOCREQ_TOLOC',
                        'TLOCREQ_ITMCD',
                        'TLOCREQ_ISREP',
                        DB::raw('SUM(TLOCREQ_QTY) as TLOCREQ_QTY'),
                    )
                    ->where('TLOCREQ_DOCNO', $value['TLOCREQ_DOCNO'])
                    // ->whereNull('TLOCREQ_APPRVDT')
                    // ->havingRaw("SUM(TLOCREQ_QTY) - (
                    //     SELECT COALESCE(SUM(CITRN_ITMQT),0) FROM C_ITRN
                    //     WHERE CITRN_DOCNO = TLOCREQ_DOCNO
                    //     AND CITRN_LOCCD = 'WH-SRV'
                    // ) > 0")
                    ->groupBy(
                        'id',
                        'TLOCREQ_DOCNO',
                        'TLOCREQ_FRLOC',
                        'TLOCREQ_TOLOC',
                        'TLOCREQ_ITMCD',
                        'TLOCREQ_ISREP',
                    )
                    // ->where('TLOCREQ_ISREP', $value['TLOCREQ_ISREP'])
                    ->get()
                    ->map(function ($det) use ($svcIncLoc, $svcIncForm) {
                        $det->listBarcode = C_ITRN::on($this->dedicatedConnection)
                            ->select(
                                DB::raw('id_reff as TSRVF_BC'),
                                DB::raw('CITRN_ITMCD as MITM_ITMCD'),
                                DB::raw('SUM(CITRN_ITMQT) as STOCK')
                            )
                            ->where('CITRN_DOCNO', $det->TLOCREQ_DOCNO)
                            ->where('CITRN_ITMCD', $det->TLOCREQ_ITMCD)
                            ->where('CITRN_LOCCD', $det->TLOCREQ_TOLOC)
                            ->where('CITRN_FORM', $svcIncForm)
                            ->groupBy('id_reff', 'CITRN_ITMCD')
                            ->get();
                        return $det;
                    })
            ]);
        }

        return [
            'data' => $hasil,
            'pagination' => [
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'per_page' => $paginated->perPage(),
                'total' => $paginated->total(),
            ],
        ];
    }

    function isServiceTransfer($docno)
    {
        $splitDoc = explode('-', (string) $docno);
        if (count($splitDoc) < 2) {
            return false;
        }
        return T_SRV_HEAD::on($this->dedicatedConnection)
            ->where('SRVH_DOCNO', $splitDoc[0])
            ->exists();
    }

    function approveData($id)
    {
        ini_set('max_execution_time', 600);
        $activeRole = CompanyGroupController::getRoleBasedOnCompanyGroup($this->dedicatedConnection);
        if (!in_array($activeRole['code'], ['manager', 'general_manager', 'root'])) {
            return response()->json([
                'msg' => 'Unauthorized, only Manager/GM/Root can approve this transfer.'
            ], 403);
        }

        $docno = base64_decode($id);
        $isService = $this->isServiceTransfer($docno);

        // For service transfers, resolve barcode per item from service fix detail so
        // barcoded stock keeps its id_reff when moved to WH-SRV.
        $detPerItem = [];
        if ($isService) {
            $splitDoc = explode('-', $docno);
            $getHeader = T_SRV_HEAD::on($this->dedicatedConnection)->where('SRVH_DOCNO', $splitDoc[0])->first();
            if (!empty($getHeader)) {
                $getDetailID = T_SRV_DET::on($this->dedicatedConnection)
                    ->where('TSRVH_ID', $getHeader->id)
                    ->where('TSRVD_LINE', $splitDoc[1])
                    ->first();
                if (!empty($getDetailID)) {
                    $detPerItem = T_SRV_FIXDET::on($this->dedicatedConnection)
                        ->where('TSRVD_ID', $getDetailID->id)
                        ->whereNotNull('TSRVF_BC')
                        ->pluck('TSRVF_BC', 'TSRVF_ITMCD')
                        ->toArray();
                }
            }
        }

        $data = T_LOC_REQ::on($this->dedicatedConnection)
            ->where('TLOCREQ_DOCNO', $docno)
            ->get();

        try {
            DB::connection($this->dedicatedConnection)->transaction(function () use ($data, $isService, $detPerItem, $docno) {
                foreach ($data as $value) {
                    if ($value['TLOCREQ_QTY'] > 0) {
                        $bc = null;
                        if ($isService) {
                            $bc = $detPerItem[$value['TLOCREQ_ITMCD']] ?? null;
                        }

                        $result = $this->transferLoc(new Request([
                            'EVENT' => 'EVENT_LIST_SERVICE',
                            'DOCFROM' => '',
                            'DOC' => $value['TLOCREQ_DOCNO'],
                            'LOCFROM' => $value['TLOCREQ_FRLOC'],
                            'LOCTO' => $value['TLOCREQ_TOLOC'],
                            'ITMCD' => $value['TLOCREQ_ITMCD'],
                            'QTY' => $value['TLOCREQ_QTY'],
                            'BC' => $bc,
                        ]));

                        $this->assertTransferSucceeded($result, $value['TLOCREQ_ITMCD']);

                        if ($value['TLOCREQ_ISREP'] == 1) {
                            $resultRep = $this->runRoute(
                                'EVENT_LIST_SERVICE_SCR',
                                [
                                    'DOC' => $value['TLOCREQ_DOCNO'],
                                    'ITMCD' => $value['TLOCREQ_ITMCD'],
                                    'QTY' => $value['TLOCREQ_QTY'],
                                    'BC' => $bc,
                                ],
                                $this->dedicatedConnection
                            );

                            $this->assertTransferSucceeded($resultRep, $value['TLOCREQ_ITMCD']);
                        }
                    }
                }

                T_LOC_REQ::on($this->dedicatedConnection)
                    ->where('TLOCREQ_DOCNO', $docno)
                    ->update([
                        'TLOCREQ_APPRVDT' => date('Y-m-d H:i:s'),
                        'TLOCREQ_APPRVBY' => Auth::user()->nick_name
                    ]);
            });
        } catch (\Throwable $e) {
            return response()->json([
                'msg' => 'Approval failed, no items were approved: ' . $e->getMessage()
            ], 500);
        }

        return ['msg' => 'Transfer Approved !!'];
    }

    private function assertTransferSucceeded($result, $itemCode)
    {
        if (is_object($result) && method_exists($result, 'getStatusCode') && $result->getStatusCode() >= 400) {
            $error = method_exists($result, 'getData') ? ($result->getData(true)['error'] ?? '') : '';
            throw new \Exception("Item {$itemCode} failed to transfer. " . $error);
        }

        if (is_array($result) && (!isset($result['status']) || $result['status'] !== true)) {
            throw new \Exception("Item {$itemCode} failed to transfer. " . ($result['error'] ?? ''));
        }
    }

    public function viewApprovalServiceTransfer()
    {
        return view('transaction.service_transfer_approval');
    }

    public function listApprovalServiceTransfer()
    {
        ini_set('max_execution_time', 600);
        $perPage = request()->input('per_page', 12);
        $page = request()->input('page', 1);

        $data = T_LOC_REQ::on($this->dedicatedConnection)
            ->select(
                DB::raw('TLOCREQ_DOCNO'),
                DB::raw('max(T_LOC_REQ.created_at) CREATED_AT'),
                DB::raw('GROUP_CONCAT(DISTINCT TLOCREQ_ITMCD) ITEMS'),
                DB::raw('SUM(TLOCREQ_QTY) QTY'),
                'TLOCREQ_FRLOC',
                'TLOCREQ_TOLOC'
            )
            ->whereNull('TLOCREQ_APPRVDT')
            ->whereNotNull('TLOCREQ_SUBMITTED')
            ->where('TLOCREQ_ISREP', 0)
            ->groupBy('TLOCREQ_DOCNO', 'TLOCREQ_FRLOC', 'TLOCREQ_TOLOC')
            ->orderBy('CREATED_AT', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return $data;
    }

    public function detailApprovalServiceTransfer($id)
    {
        $docno = base64_decode($id);

        $data = T_LOC_REQ::on($this->dedicatedConnection)
            ->select(
                'TLOCREQ_ITMCD',
                'MITM_ITMNM',
                'TLOCREQ_QTY',
                'TLOCREQ_FRLOC',
                'TLOCREQ_TOLOC'
            )
            ->leftJoin('M_ITM', 'MITM_ITMCD', '=', 'TLOCREQ_ITMCD')
            ->where('TLOCREQ_DOCNO', $docno)
            ->where('TLOCREQ_ISREP', 0)
            ->get()
            ->toArray();

        // Attach barcode per item from service fix detail
        $splitDoc = explode('-', $docno);
        $detPerItem = [];
        $getHeader = T_SRV_HEAD::on($this->dedicatedConnection)->where('SRVH_DOCNO', $splitDoc[0] ?? '')->first();
        if (!empty($getHeader)) {
            $getDetailID = T_SRV_DET::on($this->dedicatedConnection)
                ->where('TSRVH_ID', $getHeader->id)
                ->where('TSRVD_LINE', $splitDoc[1] ?? null)
                ->first();
            if (!empty($getDetailID)) {
                $detPerItem = T_SRV_FIXDET::on($this->dedicatedConnection)
                    ->where('TSRVD_ID', $getDetailID->id)
                    ->whereNotNull('TSRVF_BC')
                    ->pluck('TSRVF_BC', 'TSRVF_ITMCD')
                    ->toArray();
            }
        }

        foreach ($data as $key => $value) {
            $data[$key]['TSRVF_BC'] = $detPerItem[$value['TLOCREQ_ITMCD']] ?? '';
        }

        return $data;
    }
}
