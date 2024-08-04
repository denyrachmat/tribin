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
use App\Imports\importStockTake;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\T_RCV_HEAD;

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
        $OpeningBalance = C_ITRN::on($this->dedicatedConnection)
            ->where('CITRN_ISSUDT', '<', $param['date'])
            ->where('CITRN_LOCCD', $param['location'])
            ->where('CITRN_BRANCH', Auth::user()->branch)
            ->select('CITRN_ITMCD', DB::raw("SUM(CITRN_ITMQT) OPENINGQT"))
            ->groupBy('CITRN_ITMCD');

        $InOut = C_ITRN::on($this->dedicatedConnection)
            ->where('CITRN_ISSUDT', $param['date'])
            ->where('CITRN_LOCCD', $param['location'])
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
            ->where('CITRN_LOCCD', $param['location'])
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

        $AllItemPerLocation = C_ITRN::on($this->dedicatedConnection)
            ->leftJoin('M_ITM', function ($join) {
                $join->on('CITRN_BRANCH', '=', 'MITM_BRANCH')->on('CITRN_ITMCD', '=', 'MITM_ITMCD');
            })
            ->where('CITRN_LOCCD', $param['location'])
            ->where($columnMap[$param['searchBy']], 'like', '%' . $param['searchValue'] . '%')
            ->where('CITRN_BRANCH', Auth::user()->branch)
            ->select('CITRN_ITMCD', 'CITRN_BRANCH', 'MITM_STKUOM', 'MITM_ITMNM')
            ->groupBy('CITRN_ITMCD', 'CITRN_BRANCH', 'MITM_STKUOM', 'MITM_ITMNM');

        $OpeningBalance = C_ITRN::on($this->dedicatedConnection)
            ->where('CITRN_ISSUDT', '<', $param['date'])
            ->where('CITRN_LOCCD', $param['location'])
            ->where('CITRN_BRANCH', Auth::user()->branch)
            ->select('CITRN_ITMCD', DB::raw("SUM(CITRN_ITMQT) OPENINGQT"))
            ->groupBy('CITRN_ITMCD');

        $OpeningAllBalance = DB::connection($this->dedicatedConnection)
            ->query()
            ->fromSub($AllItemPerLocation, 'V1')
            ->leftJoinSub($OpeningBalance, 'V2', function ($join) {
                $join->on('V1.CITRN_ITMCD', '=', 'V2.CITRN_ITMCD');
            })
            ->select('V1.CITRN_ITMCD', 'MITM_STKUOM', 'MITM_ITMNM', DB::raw('IFNULL(OPENINGQT,0) OPENINGQT'))
            ->get();
        if ($OpeningAllBalance) {

            $DetailTransaction = C_ITRN::on($this->dedicatedConnection)
                ->where('CITRN_ISSUDT', '>=', $param['date'])
                ->where('CITRN_ISSUDT', '<=', $param['date2'])
                ->where('CITRN_LOCCD', $param['location'])
                ->where('CITRN_BRANCH', Auth::user()->branch)
                ->select(
                    'CITRN_ITMCD',
                    'CITRN_ISSUDT',
                    'CITRN_FORM',
                    'CITRN_DOCNO',
                    DB::raw("SUM(CASE WHEN CITRN_ITMQT > 0 THEN CITRN_ITMQT END) INQT"),
                    DB::raw("SUM(CASE WHEN CITRN_ITMQT < 0 THEN CITRN_ITMQT * -1 END) OUTQT"),

                )
                ->groupBy('CITRN_ITMCD', 'CITRN_ISSUDT', 'CITRN_FORM', 'CITRN_DOCNO')
                ->orderBy('CITRN_ITMCD')
                ->orderBy('CITRN_ISSUDT')
                ->get();
            $dataArray = json_decode(json_encode($DetailTransaction), true);
            $data = [];
            foreach ($OpeningAllBalance as $t) {
                $data[] = [
                    'CITRN_ITMCD' => $t->CITRN_ITMCD,
                    'MITM_ITMNM' => $t->MITM_ITMNM,
                    'EVENT' => '',
                    'CITRN_DOCNO' => '',
                    'DATEKU' => '',
                    'INQT' => '',
                    'OUTQT' => '',
                    'BALQT' => $t->OPENINGQT,
                    'UM' => $t->MITM_STKUOM,
                ];
                $balance = $t->OPENINGQT;
                foreach ($dataArray as $r) {
                    if ($r['CITRN_ITMCD'] == $t->CITRN_ITMCD) {
                        $balance += $r['INQT'] - $r['OUTQT'];
                        $data[] = [
                            'CITRN_ITMCD' => $t->CITRN_ITMCD,
                            'MITM_ITMNM' => $t->MITM_ITMNM,
                            'EVENT' => $r['CITRN_FORM'],
                            'CITRN_DOCNO' => $r['CITRN_DOCNO'],
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
            $sheet->setCellValue([4, $y], $request->location);
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
            ->where('TLOCREQ_DOCNO', base64_decode($request->data))
            ->join('M_ITM', 'MITM_ITMCD', 'TLOCREQ_ITMCD')
            ->get()
            ->toArray();

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

    function viewStockByItemLoc($item, $loc)
    {
        return C_ITRN::on($this->dedicatedConnection)
            ->select(
                DB::raw('COALESCE(SUM(CITRN_ITMQT),0) AS STOCK')
            )
            ->where('CITRN_ITMCD', base64_decode($item))
            ->where('CITRN_LOCCD', base64_decode($loc))
            ->first()
            ->STOCK;
    }

    function uploadStockTakeView()
    {
        return view('tribinapp_layouts', ['routeApp' => 'stocktake']);
    }

    function uploadStockTake(Request $req)
    {
        ini_set('max_execution_time', '30000');
        // $nama_file = $req->file->hashName();
        $file = new File($req->file);
        $extNya = $req->file('file')->getClientOriginalExtension();

        $fileHash = str_replace('.' . $file->extension(), '', $file->hashName());
        $nama_file = $fileHash . '.' . $extNya;

        // return $nama_file;

        $req->file->storeAs('/public/upload_stock_take/', $nama_file);
        $createdHeader = T_RCV_HEAD::on($this->dedicatedConnection)
            ->updateOrCreate([
                'TRCV_DOCNO' => "STK-".date('Ymd'),
            ],[
                'TRCV_BRANCH' => Auth::user()->branch,
                'TRCV_RCVCD' => "STK-".date('Ymd'),
                'TRCV_ISSUDT' => $req->date,
                'TRCV_SUBMITTED_AT' => date('Y-m-d'),
                'TRCV_SUBMITTED_BY' => Auth::user()->nick_name,
                'TRCV_DOCNO' => "STK-".date('Ymd'),
                'TRCV_SUPCD' => '',
                'created_by' => Auth::user()->nick_name,
            ]);


        if ($extNya == 'xls') {
            $spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($file);
            $writer = new Xlsx($spreadsheet);
            $nama_file = $fileHash . '.xlsx';
            $writer->save('/public/upload_stock_take/' . $nama_file);
        }

        $importer = new importStockTake($req->date, $createdHeader->id, $req->isRegItem);

        Excel::import($importer, public_path('/storage/upload_stock_take/' . $nama_file));

        return ['msg' => 'Upload Success'];
    }
}
