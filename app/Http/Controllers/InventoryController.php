<?php

namespace App\Http\Controllers;

use App\Models\C_ITRN;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use Illuminate\Support\Facades\Validator;
use App\Models\T_LOC_REQ;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Traits\LocationTraits;
use Illuminate\Http\File;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Font;
use PhpOffice\PhpSpreadsheet\Style\Border;
use App\Imports\ImportStockTake;
use App\Models\M_ITM;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\T_RCV_HEAD;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Redis;

class InventoryController extends Controller
{
    use LocationTraits;
    protected $dedicatedConnection;

    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    function index()
    {
        return view('report.inventory_stock_status');
    }

    function queryStockStatus($param)
    {
        $columnMap = [
            'MITM_ITMCD',
            'MITM_ITMNM',
        ];
        $loc = (array) $param['location'];

        $OpeningBalance = C_ITRN::on($this->dedicatedConnection)
            ->where('CITRN_ISSUDT', '<', $param['date'])
            ->whereIn('CITRN_LOCCD', $loc)
            ->where('CITRN_BRANCH', Auth::user()->branch)
            ->select('CITRN_ITMCD', DB::raw("SUM(CITRN_ITMQT) OPENINGQT"))
            ->groupBy('CITRN_ITMCD');

        $InOut = C_ITRN::on($this->dedicatedConnection)
            ->where('CITRN_ISSUDT', $param['date'])
            ->whereIn('CITRN_LOCCD', $loc)
            ->where('CITRN_BRANCH', Auth::user()->branch)
            ->select(
                'CITRN_ITMCD',
                DB::raw("SUM(CASE WHEN CITRN_ITMQT > 0 THEN CITRN_ITMQT END) INQT"),
                DB::raw("SUM(CASE WHEN CITRN_ITMQT < 0 THEN CITRN_ITMQT END) OUTQT"),
            )
            ->groupBy('CITRN_ITMCD');

        $data = C_ITRN::on($this->dedicatedConnection)
            ->leftJoin('M_ITM', function ($join) {
                $join->on('CITRN_ITMCD', '=', 'MITM_ITMCD')
                    ->on('CITRN_BRANCH', '=', 'MITM_BRANCH');
            })
            ->leftJoinSub($OpeningBalance, 'V1', function ($join) {
                $join->on('C_ITRN.CITRN_ITMCD', '=', 'V1.CITRN_ITMCD');
            })
            ->leftJoinSub($InOut, 'V2', function ($join) {
                $join->on('C_ITRN.CITRN_ITMCD', '=', 'V2.CITRN_ITMCD');
            })
            ->whereIn('CITRN_LOCCD', $loc)
            ->where($columnMap[$param['searchBy']], 'like', '%' . $param['searchValue'] . '%')
            ->where('CITRN_ISSUDT', '<=', $param['date'])
            ->where('CITRN_BRANCH', Auth::user()->branch)
            ->select(
                'MITM_ITMCD',
                'MITM_ITMNM',
                DB::raw("IFNULL(OPENINGQT,0) AS OPENINGQT"),
                DB::raw("IFNULL(INQT,0) AS INQT"),
                DB::raw("IFNULL(OUTQT,0) AS OUTQT"),
                DB::raw("SUM(CITRN_ITMQT) AS STOCKQT"),
                'MITM_STKUOM'
            )
            ->groupBy('MITM_ITMCD', 'MITM_ITMNM', 'OPENINGQT', 'INQT', 'OUTQT', 'MITM_STKUOM')
            ->get();
        return $data;
    }

    function stockStatus(Request $request)
    {
        return [
            'data' => $this->queryStockStatus([
                'date' => $request->has('date') ? $request->date : date('Y-m-d'),
                'location' => $request->location,
                'searchBy' => $request->searchBy,
                'searchValue' => $request->searchValue,
            ])
        ];
    }

    function report(Request $request)
    {
        $data = $this->queryStockStatus([
            'date' => $request->date,
            'location' => $request->location,
            'searchBy' => $request->searchBy,
            'searchValue' => $request->searchValue,
        ]);
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('STOCK_STATUS');
        $sheet->setCellValue([1, 2], 'Item Code');
        $sheet->setCellValue([2, 2], 'Item Name');
        $sheet->setCellValue([3, 2], 'Opening');
        $sheet->setCellValue([4, 2], 'IN');
        $sheet->setCellValue([5, 2], 'OUT');
        $sheet->setCellValue([6, 2], 'Balance');
        $sheet->setCellValue([7, 2], 'UM');

        $y = 3;
        foreach ($data as $r) {
            $sheet->setCellValue([1, $y], $r->MITM_ITMCD);
            $sheet->setCellValue([2, $y], $r->MITM_ITMNM);
            $sheet->setCellValue([3, $y], $r->OPENINGQT);
            $sheet->setCellValue([4, $y], $r->INQT);
            $sheet->setCellValue([5, $y], $r->OUTQT);
            $sheet->setCellValue([6, $y], $r->STOCKQT);
            $sheet->setCellValue([7, $y], $r->MITM_STKUOM);
            $y++;
        }

        $stringjudul = "Stock Status Report " . date('Y-m-d H:i:s');
        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $filename = $stringjudul;
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $filename . '.xlsx"');
        header('Cache-Control: max-age=0');
        $writer->save('php://output');
    }

    function formLedger()
    {
        return view('report.inventory_stock_ledger');
    }

    function queryStockLedger($param)
    {
        $columnMap = [
            'CITRN_ITMCD',
            'MITM_ITMNM',
        ];

        $loc = (array) $param['location'];

        $AllItemPerLocation = C_ITRN::on($this->dedicatedConnection)
            ->leftJoin('M_ITM', function ($join) {
                $join->on('CITRN_BRANCH', '=', 'MITM_BRANCH')->on('CITRN_ITMCD', '=', 'MITM_ITMCD');
            })
            ->whereIn('CITRN_LOCCD', $loc)
            ->where($columnMap[$param['searchBy']], 'like', '%' . $param['searchValue'] . '%')
            ->where('CITRN_BRANCH', Auth::user()->branch)
            ->select('id', 'CITRN_ITMCD', 'CITRN_BRANCH', 'MITM_STKUOM', 'MITM_ITMNM', 'CITRN_LOCCD')
            ->groupBy('CITRN_ITMCD', 'CITRN_BRANCH', 'MITM_STKUOM', 'MITM_ITMNM', 'CITRN_LOCCD');

        $OpeningBalance = C_ITRN::on($this->dedicatedConnection)
            ->where('CITRN_ISSUDT', '<', $param['date'])
            ->whereIn('CITRN_LOCCD', $loc)
            ->where('CITRN_BRANCH', Auth::user()->branch)
            ->select('CITRN_ITMCD', 'CITRN_LOCCD', DB::raw("SUM(CITRN_ITMQT) OPENINGQT"))
            ->groupBy('CITRN_ITMCD', 'CITRN_LOCCD');

        $OpeningAllBalance = DB::connection($this->dedicatedConnection)
            ->query()
            ->fromSub($AllItemPerLocation, 'V1')
            ->leftJoinSub($OpeningBalance, 'V2', function ($join) {
                $join->on('V1.CITRN_ITMCD', '=', 'V2.CITRN_ITMCD')
                    ->on('V1.CITRN_LOCCD', '=', 'V2.CITRN_LOCCD');
            })
            ->select('V1.CITRN_ITMCD', 'V1.CITRN_LOCCD', 'MITM_STKUOM', 'MITM_ITMNM', DB::raw('IFNULL(OPENINGQT,0) OPENINGQT'))
            ->orderBy('V1.id')
            ->get();
        if ($OpeningAllBalance) {
            $DetailTransaction = C_ITRN::on($this->dedicatedConnection)
                ->where('CITRN_ISSUDT', '>=', $param['date'])
                ->where('CITRN_ISSUDT', '<=', $param['date2'])
                ->whereIn('CITRN_LOCCD', $loc)
                ->where('CITRN_BRANCH', Auth::user()->branch)
                ->select(
                    'CITRN_ITMCD',
                    'CITRN_ISSUDT',
                    'CITRN_FORM',
                    'CITRN_DOCNO',
                    'CITRN_LOCCD',
                    DB::raw("SUM(CASE WHEN CITRN_ITMQT > 0 THEN CITRN_ITMQT END) INQT"),
                    DB::raw("SUM(CASE WHEN CITRN_ITMQT < 0 THEN CITRN_ITMQT * -1 END) OUTQT"),

                )
                ->groupBy('CITRN_ITMCD', 'CITRN_ISSUDT', 'CITRN_FORM', 'CITRN_DOCNO', 'CITRN_LOCCD')
                ->orderBy('id')
                ->orderBy('CITRN_ITMCD')
                ->get();
            $dataArray = json_decode(json_encode($DetailTransaction), true);
            $data = [];
            foreach ($OpeningAllBalance as $t) {
                $data[] = [
                    'CITRN_ITMCD' => $t->CITRN_ITMCD,
                    'MITM_ITMNM' => $t->MITM_ITMNM,
                    'EVENT' => '',
                    'CITRN_DOCNO' => '',
                    'WH' => $t->CITRN_LOCCD,
                    'DATEKU' => '',
                    'INQT' => '',
                    'OUTQT' => '',
                    'BALQT' => $t->OPENINGQT,
                    'UM' => $t->MITM_STKUOM,
                ];
                $balance = $t->OPENINGQT;
                foreach ($dataArray as $r) {
                    if ($r['CITRN_ITMCD'] == $t->CITRN_ITMCD && $r['CITRN_LOCCD'] == $t->CITRN_LOCCD) {
                        $balance += $r['INQT'] - $r['OUTQT'];
                        $data[] = [
                            'CITRN_ITMCD' => $t->CITRN_ITMCD,
                            'MITM_ITMNM' => $t->MITM_ITMNM,
                            'EVENT' => $r['CITRN_FORM'],
                            'CITRN_DOCNO' => $r['CITRN_DOCNO'],
                            'WH' => $r['CITRN_LOCCD'],
                            'DATEKU' => $r['CITRN_ISSUDT'],
                            'INQT' => $r['INQT'],
                            'OUTQT' => $r['OUTQT'],
                            'BALQT' => $balance,
                            'UM' => $t->MITM_STKUOM,
                        ];
                    }
                }
            }

            return $data;
        } else {
            return [];
        }
    }

    function stockLedger(Request $request)
    {
        return [
            'data' => $this->queryStockLedger([
                'date' => $request->date,
                'date2' => $request->date2,
                'location' => $request->location,
                'searchBy' => $request->searchBy,
                'searchValue' => $request->searchValue,
            ])
        ];
    }

    function reportLedger(Request $request)
    {
        $data = $this->queryStockLedger([
            'date' => $request->date,
            'date2' => $request->date2,
            'location' => $request->location,
            'searchBy' => $request->searchBy,
            'searchValue' => $request->searchValue,
        ]);
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();
        $sheet->setTitle('STOCK_LEDGER');

        $sheet->setCellValue([1, 2], 'Date');
        $sheet->setCellValue([2, 2], 'Item Code');
        $sheet->setCellValue([3, 2], 'Item Name');
        $sheet->setCellValue([4, 2], 'Warehouse');
        $sheet->setCellValue([5, 2], 'Event');
        $sheet->setCellValue([6, 2], 'Document');
        $sheet->setCellValue([7, 2], 'IN');
        $sheet->setCellValue([8, 2], 'OUT');
        $sheet->setCellValue([9, 2], 'Balance');
        $sheet->setCellValue([10, 2], 'UM');

        $y = 3;
        foreach ($data as $r) {
            $sheet->setCellValue([1, $y], $r['DATEKU']);
            $sheet->setCellValue([2, $y], $r['CITRN_ITMCD']);
            $sheet->setCellValue([3, $y], $r['MITM_ITMNM']);
            $sheet->setCellValue([4, $y], is_array($request->location) ? implode(', ', $request->location) : $request->location);
            $sheet->setCellValue([5, $y], $r['EVENT']);
            $sheet->setCellValue([6, $y], $r['CITRN_DOCNO']);
            $sheet->setCellValue([7, $y], $r['INQT']);
            $sheet->setCellValue([8, $y], $r['OUTQT']);
            $sheet->setCellValue([9, $y], $r['BALQT']);
            $sheet->setCellValue([10, $y], $r['UM']);
            $y++;
        }

        $stringjudul = "Stock Ledger Report " . date('Y-m-d H:i:s');
        $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
        $filename = $stringjudul;
        header('Content-Type: application/vnd.ms-excel');
        header('Content-Disposition: attachment;filename="' . $filename . '.xlsx"');
        header('Cache-Control: max-age=0');
        $writer->save('php://output');
    }

    function transferLocForm()
    {
        return view('tribinapp_layouts', ['routeApp' => 'transferLoc']);
    }

    function transferLoc(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'DOC' => 'required',
            'ITMCD.*' => 'required',
            'TRFTYPE' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $cek = [];
        foreach ($request->ITMCD as $key => $value) {
            // Cek Item Master
            $itemFrom = M_ITM::on($request->CGFROM)->where('MITM_ITMCD', $value['MITM_ITMNM'])->first();
            $itemDest = M_ITM::on($request->CGTO)->where('MITM_ITMCD', $value['MITM_ITMNM'])->first();

            if (empty($itemDest)) {
                $itemDest = M_ITM::on($request->CGTO)->create([
                    'MITM_ITMCD' => $value['MITM_ITMNM'],
                    'MITM_BRANCH' => $value['MITM_BRANCH'],
                    'MITM_ITMCAT' => $value['MITM_ITMCAT'],
                    'MITM_ITMNM' => $itemFrom->MITM_ITMNM,
                    'MITM_ITMTYPE' => $value['MITM_ITMTYPE'],
                    'MITM_STKUOM' => $value['MITM_STKUOM'],
                    'MITM_MODEL' => $itemFrom->MITM_MODEL ?? '-'
                ]);
            }
            $getStock = DB::connection($request->CGFROM)->table('V_STOCK_CHECK')
                ->where('CITRN_ITMCD', $value['MITM_ITMNM'])
                ->orderBy('id_reff')
                ->get();

            $getStock = $getStock->map(function ($user) {
                return (array) $user;
            })->toArray();

            $StockNow = (int) $value['QTY'];
            foreach ($getStock as $keyStock => $valueStock) {
                if ($StockNow <= $valueStock['CITRN_ITMQT']) {
                    // Issue
                    $cek[] = C_ITRN::on($request->CGFROM)->create([
                        'CITRN_BRANCH' => $value['MITM_BRANCH'],
                        'CITRN_LOCCD' => $request->LOCFROM,
                        'CITRN_DOCNO' => $request->DOC,
                        'CITRN_ISSUDT' => date('Y-m-d H:i:s'),
                        'CITRN_FORM' => 'TRF-OUT',
                        'CITRN_ITMCD' => $value['MITM_ITMNM'],
                        'CITRN_ITMQT' => $StockNow * -1,
                        'CITRN_PRCPER' => $value['LATEST_PRC'],
                        'CITRN_PRCAMT' => $StockNow * $value['LATEST_PRC'],
                        'id_reff' => $valueStock['id_reff'],
                        'created_by' => Auth::user()->nick_name,
                    ]);

                    // Receive
                    $cek[] = C_ITRN::on($request->CGTO)->create([
                        'CITRN_BRANCH' => $value['MITM_BRANCH'],
                        'CITRN_LOCCD' => $request->LOCTO,
                        'CITRN_DOCNO' => $request->DOC,
                        'CITRN_ISSUDT' => date('Y-m-d H:i:s'),
                        'CITRN_FORM' => 'TRF-INC',
                        'CITRN_ITMCD' => $value['MITM_ITMNM'],
                        'CITRN_ITMQT' => $StockNow,
                        'CITRN_PRCPER' => $value['LATEST_PRC'],
                        'CITRN_PRCAMT' => $StockNow * $value['LATEST_PRC'],
                        'id_reff' => $valueStock['id_reff'],
                        'created_by' => Auth::user()->nick_name,
                    ]);

                    break;
                } else {
                    $StockNow = $request->QTY - $valueStock['CITRN_ITMQT'];

                    // Issue
                    $cek[] = C_ITRN::on($request->CGFROM)->create([
                        'CITRN_BRANCH' => $value['MITM_BRANCH'],
                        'CITRN_LOCCD' => 'WH1',
                        'CITRN_DOCNO' => $request->DOC,
                        'CITRN_ISSUDT' => date('Y-m-d H:i:s'),
                        'CITRN_FORM' => 'TRF-OUT',
                        'CITRN_ITMCD' => $value['MITM_ITMNM'],
                        'CITRN_ITMQT' => $valueStock['CITRN_ITMQT'] * -1,
                        'CITRN_PRCPER' => $value['LATEST_PRC'],
                        'CITRN_PRCAMT' => $valueStock['CITRN_ITMQT'] * $value['LATEST_PRC'],
                        'id_reff' => $valueStock['id_reff'],
                        'created_by' => Auth::user()->nick_name,
                    ]);

                    // Receive
                    $cek[] = C_ITRN::on($request->CGTO)->create([
                        'CITRN_BRANCH' => $value['MITM_BRANCH'],
                        'CITRN_LOCCD' => 'WH1',
                        'CITRN_DOCNO' => $request->DOC,
                        'CITRN_ISSUDT' => date('Y-m-d H:i:s'),
                        'CITRN_FORM' => 'TRF-INC',
                        'CITRN_ITMCD' => $value['MITM_ITMNM'],
                        'CITRN_ITMQT' => $valueStock['CITRN_ITMQT'],
                        'CITRN_PRCPER' => $value['LATEST_PRC'],
                        'CITRN_PRCAMT' => $valueStock['CITRN_ITMQT'] * $value['LATEST_PRC'],
                        'id_reff' => $valueStock['id_reff'],
                        'created_by' => Auth::user()->nick_name,
                    ]);
                }
            }
        }

        return ['msg' => 'OK', 'DATA' => $cek];
    }

    function saveTransferLocDraft(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'TLOCREQ_DOCNO' => 'required',
            'TLOCREQ_FRLOC' => 'required',
            'TLOCREQ_TOLOC' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $create = [];
        foreach ($request->detail as $key => $value) {
            $create[] = T_LOC_REQ::on($this->dedicatedConnection)->create([
                'TLOCREQ_DOCNO' => $request->TLOCREQ_DOCNO,
                'TLOCREQ_ITMCD' => $value['TLOCREQ_ITMCD'],
                'TLOCREQ_QTY' => $value['TLOCREQ_QTY'],
                'TLOCREQ_FRLOC' => $request->TLOCREQ_FRLOC,
                'TLOCREQ_TOLOC' => $request->TLOCREQ_TOLOC,
                'TLOCREQ_ISREP' => 0
            ]);

            if ($value['TLOCREQ_ISREP'] == 1) {
                $create[] = T_LOC_REQ::on($this->dedicatedConnection)->create([
                    'TLOCREQ_DOCNO' => $request->TLOCREQ_DOCNO,
                    'TLOCREQ_ITMCD' => $value['TLOCREQ_ITMCD'],
                    'TLOCREQ_QTY' => $value['TLOCREQ_QTY'],
                    'TLOCREQ_FRLOC' => $request->TLOCREQ_TOLOC,
                    'TLOCREQ_TOLOC' => $request->TLOCREQ_FRLOC,
                    'TLOCREQ_ISREP' => $value['TLOCREQ_ISREP']
                ]);
            }
        }

        return ['msg' => 'OK', 'DATA' => $create];
    }

    public function printHandoverPDF(Request $request)
    {
        $data = T_LOC_REQ::on($this->dedicatedConnection)
            ->select(
                'TLOCREQ_DOCNO',
                'TLOCREQ_ITMCD',
                'MITM_ITMNM',
                'TLOCREQ_QTY',
                'TLOCREQ_FRLOC',
                'TLOCREQ_TOLOC',
                'TLOCREQ_ISREP',
                DB::raw("(
                    SELECT SUM(CITRN_ITMQT)
                    FROM C_ITRN
                    WHERE CITRN_ITMCD = TLOCREQ_ITMCD
                    AND CITRN_LOCCD = TLOCREQ_TOLOC
                ) AS STOCK")
            )
            ->where('TLOCREQ_DOCNO', base64_decode($request->data))
            ->join('M_ITM', 'MITM_ITMCD', 'TLOCREQ_ITMCD')
            ->get()
            ->toArray();

        // return $data;

        // return view('pdf.handoverStock', [
        //     'data' => $data,
        //     'header' => 'JAYA ABADI TEKNIK',
        //     'subHeader' => 'SALES & RENTAL DIESEL GENSET - FORKLIF - TRAVOLAS - TRUK',
        //     'addr' => 'Jl. Tembus Terminal No. 17 KM. 12 Alang-alang Lebar, Palembang-Indonesia'
        // ]);

        $pdf = Pdf::loadView('pdf.handoverStock', [
            'data' => $data,
            'header' => 'JAYA ABADI TEKNIK',
            'subHeader' => 'SALES & RENTAL DIESEL GENSET - FORKLIF - TRAVOLAS - TRUK',
            'addr' => 'Jl. Tembus Terminal No. 17 KM. 12 Alang-alang Lebar, Palembang-Indonesia'
        ]);

        return base64_encode($pdf->stream('part-handover.pdf'));
    }

    function viewStockByItemLoc($item, $loc = 'V0gx', $doc = '')
    {
        $data = C_ITRN::on($this->dedicatedConnection)
            ->select(
                DB::raw('COALESCE(SUM(CITRN_ITMQT),0) AS STOCK')
            )
            ->where('CITRN_ITMCD', base64_decode($item));
        if (!empty($loc)) {
            $data->where('CITRN_LOCCD', base64_decode($loc));
        }

        if (!empty($doc)) {
            $data->where('CITRN_DOCNO', base64_decode($doc));
        }

        return $data
            ->first()
            ->STOCK;
    }

    function uploadStockTakeView()
    {
        return view('tribinapp_layouts', ['routeApp' => 'stocktake']);
    }

    function uploadStockTake(Request $req)
    {
        ini_set('memory_limit', '3G'); // atau 2048M
        ini_set('max_execution_time', '30000');
        set_time_limit(0);


        // (A) Cek apakah masih ada queue stockTake yang pending di Redis
        $pendingCount = Queue::size('stockTake');

        // Opsional: Cek juga job yang sedang "dalam proses" (reserved) oleh worker
        $reservedCount = Redis::llen('laravel_database_queues:stockTake:reserved');

        $totalPending = $pendingCount + $reservedCount;

        if ($totalPending > 0) {
            return response()->json([
                [
                    "There is still exists upload batch not done yet, please wait until it's done, {$totalPending} Jobs remaining"
                ]
            ], 406);
        }

        // (B) Simpan file
        $extNya = $req->file('file')->getClientOriginalExtension();

        $file = $req->file('file');
        $fileHash = str_replace('.' . $file->getClientOriginalExtension(), '', $file->hashName());
        $nama_file = $fileHash . '.' . $extNya;

        $req->file('file')->storeAs('public/upload_stock_take/', $nama_file);

        // (C) Prepare header (tetap sama seperti kamu)
        $createdHeader = T_RCV_HEAD::on($this->dedicatedConnection)
            ->updateOrCreate([
                'TRCV_DOCNO' => "STK-" . date('Ymd'),
            ], [
                'TRCV_BRANCH' => Auth::user()->branch,
                'TRCV_RCVCD' => "STK-" . date('Ymd'),
                'TRCV_ISSUDT' => $req->date,
                'TRCV_SUBMITTED_AT' => date('Y-m-d'),
                'TRCV_SUBMITTED_BY' => Auth::user()->nick_name,
                'TRCV_DOCNO' => "STK-" . date('Ymd'),
                'TRCV_SUPCD' => '',
                'created_by' => Auth::user()->nick_name,
            ]);

        // (D) Kalau xls → convert jadi xlsx (FIX path save-nya)
        if ($extNya === 'xls') {
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load(
                storage_path('app/public/upload_stock_take/' . $nama_file)
            );
            $writer = new Xlsx($spreadsheet);
            $nama_file = $fileHash . '.xlsx';
            $writer->save(storage_path('app/public/upload_stock_take/' . $nama_file));
        }

        // (E) Meta user sekali saja (jangan Auth di import)
        $meta = [
            'branch' => Auth::user()->branch,
            'nick_name' => Auth::user()->nick_name,
        ];

        // (F) Dedicated connection sekali saja (jangan cookie di import)
        // kalau kamu sudah punya $this->dedicatedConnection yang valid, pakai itu:
        $dedicatedConnection = $this->dedicatedConnection;

        // (G) Import per chunk
        $headerId = (string) $createdHeader->id;
        $totalRowsKey = 'stocktake_total_' . $headerId;
        $currentRowKey = 'stocktake_current_' . $headerId;

        $spreadsheetPath = storage_path('app/public/upload_stock_take/' . $nama_file);
        $reader = IOFactory::createReaderForFile($spreadsheetPath);
        $reader->setReadDataOnly(true);
        $loadedSpreadsheet = $reader->load($spreadsheetPath);
        $loadedSheet = $loadedSpreadsheet->getActiveSheet();
        $totalRows = max(0, $loadedSheet->getHighestRow() - 1);
        $loadedSpreadsheet->disconnectWorksheets();

        Cache::put($totalRowsKey, $totalRows, now()->addHours(1));
        Cache::put($currentRowKey, 0, now()->addHours(1));

        $importer = new ImportStockTake(
            $req->date,
            $headerId,
            (bool) $req->isRegItem,
            $dedicatedConnection,
            $meta
        );

        Excel::import(
            $importer,
            storage_path('app/public/upload_stock_take/' . $nama_file)
        );

        $pendingNow = Queue::size('stockTake');
        Cache::put('stocktake_total_dispatched', $pendingNow, now()->addHours(1));

        return ['msg' => 'Upload Success', 'headerId' => (int) $createdHeader->id, 'total_rows' => $pendingNow];
    }

    function findStockByBarcode($bc, $loc = null)
    {

        ini_set('max_execution_time', '300');
        $data = C_ITRN::on($this->dedicatedConnection)
            ->select(
                'CITRN_ITMCD',
                'CITRN_LOCCD',
                DB::raw('COALESCE(SUM(CITRN_ITMQT),0) AS STOCK'),
                'MITM_ITMCD',
                'MITM_ITMNM',
                DB::raw('COALESCE((MITMBPRC_PRC),0) AS MITMBPRC_PRC'),
                DB::raw('COALESCE((MITMSPRC_PRC),0) AS MITMSPRC_PRC'),
                DB::raw('id_reff AS BC')
            )
            ->join('M_ITM', 'MITM_ITMCD', 'CITRN_ITMCD')
            ->leftjoin(DB::raw('jatpower_tribin.M_ITMBPRICE'), function ($j) {
                $j->on('MITMBPRC_ITMCD', 'CITRN_ITMCD')
                    ->on('MITMBPRC_BRANCH', DB::raw("'" . Auth::user()->branch . "'"))
                    ->on('MITMBPRC_CG', DB::raw("'" . $this->dedicatedConnection . "'"))
                    ->where('MITMBPRC_ACTIVE', 1);
            })
            ->leftjoin(DB::raw('jatpower_tribin.M_ITMSPRICE'), function ($j) {
                $j->on('MITMSPRC_ITMCD', 'CITRN_ITMCD')
                    ->on('MITMSPRC_BRANCH', DB::raw("'" . Auth::user()->branch . "'"))
                    ->on('MITMSPRC_CG', DB::raw("'" . $this->dedicatedConnection . "'"))
                    ->where('MITMSPRC_ACTIVE', 1);
            })
            ->where('id_reff', $bc)
            ->groupBy(
                'CITRN_ITMCD',
                'CITRN_LOCCD',
                'MITM_ITMCD',
                'MITM_ITMNM',
                'MITMBPRC_PRC',
                'MITMSPRC_PRC',
                'id_reff'
            );

        if (!empty($loc)) {
            $data->where('CITRN_LOCCD', $loc);
        }

        $data = $data->get();
        if ($data->isEmpty()) {
            return response()->json(['msg' => 'Barcode not found'], 404);
        } else {
            return response()->json($data, 200);
        }
    }

    function downloadStockTakeTemplate()
    {
        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $headers = ['Item Code', 'Item Name', 'Qty', 'Price Buy', 'Price Sell', 'Location Code', 'UOM'];
        foreach ($headers as $col => $header) {
            $cell = $sheet->getCellByColumnAndRow($col + 1, 1);
            $cell->setValue($header);
            $cell->getStyle()->getFont()->setBold(true);
            $cell->getStyle()->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $cell->getStyle()->getBorders()->getBottom()->setBorderStyle(Border::BORDER_THIN);
        }

        $sample = ['ITEM001', 'Sample Item', 10, 15000, 14000, 'WH01', 'PCS'];
        foreach ($sample as $col => $value) {
            $sheet->getCellByColumnAndRow($col + 1, 2)->setValue($value);
        }

        $sheet->getColumnDimension('A')->setWidth(15);
        $sheet->getColumnDimension('B')->setWidth(25);
        $sheet->getColumnDimension('C')->setWidth(10);
        $sheet->getColumnDimension('D')->setWidth(12);
        $sheet->getColumnDimension('E')->setWidth(12);
        $sheet->getColumnDimension('F')->setWidth(15);
        $sheet->getColumnDimension('G')->setWidth(10);

        $writer = new Xlsx($spreadsheet);
        $fileName = 'stock_take_template.xlsx';

        $tempPath = storage_path('app/' . $fileName);
        $writer->save($tempPath);

        return response()->download($tempPath, $fileName, [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ])->deleteFileAfterSend(true);
    }

    function stockTakeHeaderId()
    {
        $row = T_RCV_HEAD::on($this->dedicatedConnection)
            ->updateOrCreate([
                'TRCV_DOCNO' => "STK-" . date('Ymd'),
            ], [
                'TRCV_BRANCH' => Auth::user()->branch,
                'TRCV_RCVCD' => "STK-" . date('Ymd'),
                'TRCV_ISSUDT' => date('Y-m-d'),
                'TRCV_SUBMITTED_AT' => date('Y-m-d'),
                'TRCV_SUBMITTED_BY' => Auth::user()->nick_name,
                'TRCV_SUPCD' => '',
                'created_by' => Auth::user()->nick_name,
            ]);

        return response()->json([
            'headerId' => (int) $row->id,
        ]);
    }

    function stockTakeProgress()
    {
        // 1. Ambil sisa pending job di Redis
        $pendingCount = Queue::size('stockTake');

        // 2. Ambil total yang di-dispatch dari Cache
        $totalDispatched = Cache::get('stocktake_total_dispatched', 0);
        $completed = max(0, $totalDispatched - $pendingCount);

        // 3. Hitung failed jobs dari tabel DB (1 jam terakhir)
        $failedCount = DB::table('failed_jobs')
            ->where('failed_at', '>=', now()->subHours(1))
            ->count();

        if ($totalDispatched > 0) {
            $percent = round(($completed / $totalDispatched) * 100);
        } else {
            $percent = $pendingCount > 0 ? 0 : 100;
        }

        return response()->json([
            'pending' => $pendingCount,
            'total' => $totalDispatched,
            'completed' => $completed,
            'percent' => min(100, max(0, $percent)),
            'failed' => $failedCount, // <--- FAILED COUNT DIKEMBALIKAN
            'is_done' => $pendingCount === 0 && $totalDispatched > 0,
        ]);
    }
}
