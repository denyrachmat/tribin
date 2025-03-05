<?php

namespace App\Http\Controllers;

use App\Models\CompanyGroup;
use App\Models\M_COND_GROUP;
use App\Models\M_Condition;
use App\Models\M_ITM;
use App\Models\M_USAGE;
use App\Models\T_DLVORDDETA;
use App\Models\T_SLO_DRAFT_DETAIL;
use App\Models\T_SLO_DRAFT_HEAD;
use App\Models\T_SLODETA;
use App\Models\T_SLOHEAD;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use PhpOffice\PhpSpreadsheet\IOFactory;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use charlieuki\ReceiptPrinter\ReceiptPrinter as ReceiptPrinter;

use App\Traits\gencodeTraits;

class ReceiveOrderController extends Controller
{
    use gencodeTraits;
    protected $dedicatedConnection;
    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    public function testPrint()
    {
        $mid = '123123456';
        $store_name = 'YOURMART';
        $store_address = 'Mart Address';
        $store_phone = '1234567890';
        $store_email = 'yourmart@email.com';
        $store_website = 'yourmart.com';
        $tax_percentage = 10;
        $transaction_id = 'TX123ABC456';
        $currency = 'Rp';
        $image_path = 'logo.png';

        // Set items
        $items = [
            [
                'name' => 'French Fries (tera)',
                'qty' => 2,
                'price' => 65000,
            ],
            [
                'name' => 'Roasted Milk Tea (large)',
                'qty' => 1,
                'price' => 24000,
            ],
            [
                'name' => 'Honey Lime (large)',
                'qty' => 3,
                'price' => 10000,
            ],
            [
                'name' => 'Jasmine Tea (grande)',
                'qty' => 3,
                'price' => 8000,
            ],
        ];

        // Init printer
        $printer = new ReceiptPrinter;
        $printer->init(
            config('receiptprinter.connector_type'),
            config('receiptprinter.connector_descriptor')
        );

        // Set store info
        $printer->setStore($mid, $store_name, $store_address, $store_phone, $store_email, $store_website);

        // Set currency
        $printer->setCurrency($currency);

        // Add items
        foreach ($items as $item) {
            $printer->addItem(
                $item['name'],
                $item['qty'],
                $item['price']
            );
        }
        // Set tax
        $printer->setTax($tax_percentage);

        // Calculate total
        $printer->calculateSubTotal();
        $printer->calculateGrandTotal();

        // Set transaction ID
        $printer->setTransactionID($transaction_id);

        // Set logo
        // Uncomment the line below if $image_path is defined
        //$printer->setLogo($image_path);

        // Set QR code
        $printer->setQRcode([
            'tid' => $transaction_id,
        ]);

        // Print receipt
        $printer->printReceipt();
    }

    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'so']);
        $Usages = M_USAGE::on($this->dedicatedConnection)->get();
        return view('transaction.receive_order', ['usages' => $Usages]);
    }

    public function save(Request $request)
    {
        $monthOfRoma = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

        # data quotation header
        $validator = Validator::make($request->all(), [
            'TSLO_CUSCD' => 'required',
            'TSLO_ATTN' => 'required',
            'TSLO_QUOCD' => 'required',
            'TSLO_ISSUDT' => 'required|date',
            'TSLO_PLAN_DLVDT' => 'required',
            'TSLO_ADDRESS_NAME' => 'required',
            'TSLO_ADDRESS_DESCRIPTION' => 'required',
            'TSLO_TYPE' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $LastLine = DB::connection($this->dedicatedConnection)->table('T_SLOHEAD')
            ->whereMonth('created_at', '=', date('m'))
            ->whereYear('created_at', '=', date('Y'))
            ->where('TSLO_BRANCH', Auth::user()->branch)
            ->max('TSLO_LINE');

        $quotationHeader = [];
        $newDocumentCode = '';
        $newPOCode = '';
        if (!$LastLine) {
            $LastLine = 1;
            $newDocumentCode = '001/PT/SLO/' . $monthOfRoma[date('n') - 1] . '/' . date('Y');
        } else {
            $LastLine++;
            $newDocumentCode = substr('00' . $LastLine, -3) . '/PT/SLO/' . $monthOfRoma[date('n') - 1] . '/' . date('Y');
        }

        if ($request->TSLO_POCD == '') {
            $POLastLine = DB::connection($this->dedicatedConnection)->table('T_SLOHEAD')
                ->whereMonth('created_at', '=', date('m'))
                ->whereYear('created_at', '=', date('Y'))
                ->max('TSLO_POLINE');
            if (!$POLastLine) {
                $POLastLine = 1;
                $newPOCode = 'A-' . date('Ym') . '-1';
            } else {
                $POLastLine++;
                $newPOCode = 'A-' . date('Ym') . '-' . $POLastLine;
            }
        } else {
            $POLastLine = 0;
            $newPOCode = $request->TSLO_POCD;
        }

        $quotationHeader = [
            'TSLO_SLOCD' => $newDocumentCode,
            'TSLO_CUSCD' => $request->TSLO_CUSCD,
            'TSLO_LINE' => $LastLine,
            'TSLO_ATTN' => $request->TSLO_ATTN,
            'TSLO_QUOCD' => $request->TSLO_QUOCD,
            'TSLO_POCD' => $newPOCode,
            'TSLO_POLINE' => $POLastLine,
            'TSLO_ISSUDT' => $request->TSLO_ISSUDT,
            'TSLO_PLAN_DLVDT' => $request->TSLO_PLAN_DLVDT,
            'TSLO_ADDRESS_NAME' => $request->TSLO_ADDRESS_NAME,
            'TSLO_ADDRESS_DESCRIPTION' => $request->TSLO_ADDRESS_DESCRIPTION,
            'TSLO_MAP_URL' => $request->TSLO_MAP_URL,
            'TSLO_TYPE' => $request->TSLO_TYPE,
            'TSLO_SERVTRANS_COST' => $request->TSLO_SERVTRANS_COST,
            'created_by' => Auth::user()->nick_name,
            'TSLO_BRANCH' => Auth::user()->branch
        ];


        # data quotation detail item
        $validator = Validator::make($request->all(), [
            'TSLODETA_ITMCD' => 'required|array',
            'TSLODETA_USAGE_DESCRIPTION' => 'required|array',
            'TSLODETA_PRC' => 'required|array',
            'TSLODETA_PRC.*' => 'required|numeric',
            // 'TSLODETA_MOBDEMOB' => 'required|array',
            // 'TSLODETA_MOBDEMOB.*' => 'required|numeric',
            // 'TSLODETA_OPRPRC' => 'required|array',
            // 'TSLODETA_OPRPRC.*' => 'required|numeric',
            // 'TSLODETA_MOBDEMOB' => 'required|array',
            // 'TSLODETA_MOBDEMOB.*' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }
        $countDetail = count($request->TSLODETA_ITMCD);
        $quotationDetail = [];
        for ($i = 0; $i < $countDetail; $i++) {
            $quotationDetail[] = [
                'TSLODETA_SLOCD' => $newDocumentCode,
                'TSLODETA_ITMCD' => $request->TSLODETA_ITMCD[$i],
                'TSLODETA_ITMQT' => $request->TSLODETA_ITMQT[$i],
                'TSLODETA_USAGE_DESCRIPTION' => $request->TSLODETA_USAGE_DESCRIPTION[$i],
                'TSLODETA_USAGE' => 0,
                'TSLODETA_PRC' => $request->TSLODETA_PRC[$i],
                'TSLODETA_OPRPRC' => 0,
                'TSLODETA_MOBDEMOB' => 0,
                'TSLODETA_PERIOD_FR' => $request->TSLODETA_PERIOD_FR[$i],
                'TSLODETA_PERIOD_TO' => $request->TSLODETA_PERIOD_TO[$i],
                'created_by' => Auth::user()->nick_name,
                'created_at' => date('Y-m-d H:i:s'),
                'TSLODETA_BRANCH' => Auth::user()->branch
            ];
        }

        T_SLOHEAD::on($this->dedicatedConnection)->create($quotationHeader);
        if (!empty($quotationDetail)) {
            T_SLODETA::on($this->dedicatedConnection)->insert($quotationDetail);
        }

        return [
            'msg' => 'OK',
            'doc' => $newDocumentCode,
            '$RSLast' => $LastLine,
            'quotationHeader' => $quotationHeader,
            'quotationDetail' => $quotationDetail,
            'newPOCode' => $newPOCode,
        ];
    }

    public function saveAPI(Request $request)
    {
        $monthOfRoma = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
        # data quotation header
        $validator = Validator::make($request->all(), [
            'TSLO_CUSCD' => 'required',
            'TSLO_ATTN' => 'required',
            // 'TSLO_QUOCD' => 'required',
            'TSLO_ISSUDT' => 'required|date',
            'TSLO_PLAN_DLVDT' => 'required',
            'TSLO_ADDRESS_NAME' => 'required',
            'TSLO_ADDRESS_DESCRIPTION' => 'required',
            'TSLO_TYPE' => 'required',
            'det' => 'array',
            'det.*.TSLODETA_ITMCD' => 'required',
            'det.*.TSLODETA_ITMQT' => 'required',
            'det.*.TSLODETA_PRC' => 'required',
            'det.*.TSLODETA_PERIOD_FR' => 'required',
            'det.*.TSLODETA_PERIOD_TO' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $LastLine = DB::connection($this->dedicatedConnection)->table('T_SLOHEAD')
            ->whereMonth('created_at', '=', date('m'))
            ->whereYear('created_at', '=', date('Y'))
            ->where('TSLO_BRANCH', Auth::user()->branch)
            ->max('TSLO_LINE');

        $quotationHeader = [];
        $newDocumentCode = '';
        $newPOCode = '';

        if ($request->has('TSLO_SLOCD') && !empty($request->TSLO_SLOCD)) {
            if ($request->isRecreate) {
                $cekSLOData = T_SLOHEAD::on($this->dedicatedConnection)->where('TSLO_SLOCD', 'like', $request->TSLO_SLOCD . '%')->orderBy('created_at', 'desc')->first();
                $newDocumentCode =  $request->TSLO_SLOCD . (str_contains($cekSLOData->TSLO_SLOCD, '-') ? '-' . sprintf('%03d', (int) substr($cekSLOData->TSLO_SLOCD, -3) + 1) :  '-001');
                $LastLine = $cekSLOData->TSLO_LINE;
            } else {
                $newDocumentCode =  $request->TSLO_SLOCD;
            }
        } else {
            if (!$LastLine) {
                $LastLine = 1;
                $newDocumentCode = '001/PT/SLO/' . $monthOfRoma[date('n') - 1] . '/' . date('Y');
            } else {
                $LastLine++;
                $newDocumentCode = substr('00' . $LastLine, -3) . '/PT/SLO/' . $monthOfRoma[date('n') - 1] . '/' . date('Y');
            }
        }

        if ($request->TSLO_POCD == '') {
            $POLastLine = DB::connection($this->dedicatedConnection)->table('T_SLOHEAD')
                ->whereMonth('created_at', '=', date('m'))
                ->whereYear('created_at', '=', date('Y'))
                ->max('TSLO_POLINE');
            if (!$POLastLine) {
                $POLastLine = 1;
                $newPOCode = 'A-' . date('Ym') . '-1';
            } else {
                $POLastLine++;
                $newPOCode = 'A-' . date('Ym') . '-' . $POLastLine;
            }
        } else {
            $POLastLine = 0;
            $newPOCode = $request->TSLO_POCD;
        }

        $quotationHeader = [
            'TSLO_SLOCD' => $newDocumentCode,
            'TSLO_CUSCD' => $request->TSLO_CUSCD,
            'TSLO_LINE' => $LastLine,
            'TSLO_ATTN' => $request->TSLO_ATTN,
            'TSLO_QUOCD' => $request->TSLO_QUOCD,
            'TSLO_POCD' => $newPOCode,
            'TSLO_POLINE' => $POLastLine,
            'TSLO_ISSUDT' => $request->TSLO_ISSUDT,
            'TSLO_PLAN_DLVDT' => $request->TSLO_PLAN_DLVDT,
            'TSLO_ADDRESS_NAME' => $request->TSLO_ADDRESS_NAME,
            'TSLO_ADDRESS_DESCRIPTION' => $request->TSLO_ADDRESS_DESCRIPTION,
            'TSLO_MAP_URL' => $request->TSLO_MAP_URL,
            'TSLO_TYPE' => $request->TSLO_TYPE,
            'TSLO_SERVTRANS_COST' => $request->TSLO_SERVTRANS_COST,
            'TSLO_ISCON' => (int)$request->TSLO_ISCON,
            'created_by' => Auth::user()->nick_name,
            'TSLO_BRANCH' => Auth::user()->branch
        ];

        T_SLOHEAD::on($this->dedicatedConnection)->updateOrCreate([
            'TSLO_SLOCD' => $newDocumentCode,
            'TSLO_LINE' => $LastLine,
        ], $quotationHeader);

        T_SLODETA::on($this->dedicatedConnection)->where('TSLODETA_SLOCD', $newDocumentCode)->delete();

        $quotationDetail = [];
        $getTotalAmnt = 0;
        foreach ($request->det as $key => $value) {
            $getTotalAmnt += $value['TSLODETA_ITMQT'] * $value['TSLODETA_PRC'];
            $quotationDetail[] = T_SLODETA::on($this->dedicatedConnection)->create([
                'TSLODETA_SLOCD' => $newDocumentCode,
                'TSLODETA_ITMCD' => $value['TSLODETA_ITMCD'],
                'TSLODETA_ITMQT' => $value['TSLODETA_ITMQT'],
                'TSLODETA_USAGE_DESCRIPTION' => $value['TSLODETA_USAGE_DESCRIPTION'],
                'TSLODETA_USAGE' => 0,
                'TSLODETA_PRC' => $value['TSLODETA_PRC'],
                'TSLODETA_OPRPRC' => 0,
                'TSLODETA_MOBDEMOB' => 0,
                'TSLODETA_PERIOD_FR' => $value['TSLODETA_PERIOD_FR'],
                'TSLODETA_PERIOD_TO' => $value['TSLODETA_PERIOD_TO'],
                'created_by' => Auth::user()->nick_name,
                'TSLODETA_BRANCH' => Auth::user()->branch
            ]);
        }

        // Check for default account
        $cekInvoiceAcc = $this->getGencode(base64_encode('DEF_CUST_INVOICE'));

        $hasilAPI = [];
        // if (count($cekInvoiceAcc) > 0 && $getTotalAmnt > 0) {
        //     try {
        //         $client = new \GuzzleHttp\Client([
        //             'verify' => false,
        //         ]);
        //         $response = $client->request('POST', env('ACC_URL').'api/post-journal', [
        //             'body' => json_encode([
        //                 'cg_code' => $this->dedicatedConnection,
        //                 'date' => date('Y-m-d'),
        //                 'reference_number' => $newDocumentCode,
        //                 'journal_code' => $cekInvoiceAcc[0]->MGECD_VALUE,
        //                 'description' => 'Sales Order ' . $newDocumentCode,
        //                 'amount' => $getTotalAmnt,
        //                 'payload' => []
        //             ]),
        //             'headers' => [
        //                 'Content-Type' => 'application/json',
        //                 'X-API-KEY' => env('ACC_KEY'),
        //             ],
        //         ]);

        //         if ($response->getStatusCode() != 201) {
        //             return $response->getBody();
        //         }

        //         $hasilAPI = json_decode($response->getBody(), true);
        //     } catch (\GuzzleHttp\Exception\RequestException $e) {
        //         $this->deleteByID(base64_encode($newDocumentCode), true);
        //         return response()->json([
        //             'error' => 'Failed to post data to API',
        //             'message' => $e->getMessage(),
        //             'param' => [
        //                 'cg_code' => $this->dedicatedConnection,
        //                 'date' => date('Y-m-d'),
        //                 'reference_number' => $newDocumentCode,
        //                 'journal_code' => $cekInvoiceAcc[0]->MGECD_VALUE,
        //                 'description' => 'Sales Order ' . $newDocumentCode,
        //                 'amount' => $getTotalAmnt,
        //             ]
        //         ], 500);
        //     }
        // }

        return [
            'msg' => 'OK',
            'doc' => $newDocumentCode,
            '$RSLast' => $LastLine,
            'quotationHeader' => $quotationHeader,
            'quotationDetail' => $quotationDetail,
            'newPOCode' => $newPOCode,
            'hasilAPI' => $hasilAPI,
            'paramnya' => [
                'cg_code' => $this->dedicatedConnection,
                'date' => date('Y-m-d'),
                'reference_number' => $newDocumentCode,
                'journal_code' => count($cekInvoiceAcc) > 0 ? $cekInvoiceAcc[0]->CODE_VALUE : '',
                'description' => 'Sales Order ' . $newDocumentCode,
                'amount' => $getTotalAmnt,
            ],
            'gencode' => $cekInvoiceAcc
        ];
    }

    function search(Request $request)
    {
        $columnMap = [
            'TSLO_SLOCD',
            'MCUS_CUSNM',
            'TSLO_POCD',
        ];

        $RS = T_SLOHEAD::on($this->dedicatedConnection)->select([
            "TSLO_SLOCD",
            "TSLO_CUSCD",
            "MCUS_CUSNM",
            "TSLO_ISSUDT",
            "TSLO_QUOCD",
            "TSLO_POCD",
            "TSLO_ATTN",
            "TSLO_PLAN_DLVDT",
            "TSLO_ADDRESS_NAME",
            "TSLO_ADDRESS_DESCRIPTION",
            "TSLO_TYPE",
            "TSLO_SERVTRANS_COST",
            'TSLO_MAP_URL',
            'TSLO_ISCON'
        ])
            ->leftJoin("M_CUS", function ($join) {
                $join->on("TSLO_CUSCD", "=", "MCUS_CUSCD")
                    ->on('TSLO_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->where($columnMap[$request->searchBy], 'like', '%' . $request->searchValue . '%')
            ->where('TSLO_BRANCH', Auth::user()->branch)
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

        $activeRole = CompanyGroupController::getRoleBasedOnCompanyGroup($this->dedicatedConnection);

        $RS = T_SLOHEAD::on($this->dedicatedConnection)->select([
            "TSLO_SLOCD",
            "TSLO_CUSCD",
            "MCUS_CUSNM",
            "TSLO_ISSUDT",
            "TSLO_QUOCD",
            "TSLO_POCD",
            "TSLO_ATTN",
            "TSLO_PLAN_DLVDT",
            "TSLO_ADDRESS_NAME",
            "TSLO_ADDRESS_DESCRIPTION",
            DB::raw("CAST(TSLO_TYPE as UNSIGNED) as TSLO_TYPE"),
            "TSLO_SERVTRANS_COST",
            'TSLO_MAP_URL',
            DB::raw('CAST(TSLO_ISCON AS UNSIGNED) TSLO_ISCON'),
            'TSLO_APPRVDT'
        ])
            ->leftJoin("M_CUS", function ($join) {
                $join->on("TSLO_CUSCD", "=", "MCUS_CUSCD")
                    ->on('TSLO_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->with('dlv')
            // ->where($columnMap[$request->searchBy], 'like', '%' . $request->searchValue . '%')
            ->where('TSLO_BRANCH', Auth::user()->branch)
            ->orderBy('TSLO_ISSUDT', 'desc');

        if (!in_array($activeRole['code'], ['root', 'director', 'manager', 'general_manager'])) {
            $RS->where('T_SLOHEAD.created_by', Auth::user()->nick_name);
        }

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        return ['data' => $RS->get()];
    }

    function searchDraft(Request $request)
    {
        $columnMap = [
            'TSLODRAFT_SLOCD',
            'MCUS_CUSNM',
            'TSLODRAFT_POCD',
        ];

        $RS = T_SLO_DRAFT_HEAD::on($this->dedicatedConnection)->select(["TSLODRAFT_SLOCD", "TSLODRAFT_CUSCD", "MCUS_CUSNM", "TSLODRAFT_ISSUDT", "TSLODRAFT_POCD", "TSLODRAFT_ATTN", "MCUS_ADDR1"])
            ->leftJoin("M_CUS", function ($join) {
                $join->on("TSLODRAFT_CUSCD", "=", "MCUS_CUSCD")
                    ->on('TSLODRAFT_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin("T_SLOHEAD", function ($join) {
                $join->on("TSLODRAFT_SLOCD", "=", "TSLO_QUOCD")
                    ->on('TSLODRAFT_BRANCH', '=', 'TSLO_BRANCH');
            })
            ->whereNull("TSLO_QUOCD")
            ->where($columnMap[$request->searchBy], 'like', '%' . $request->searchValue . '%')
            ->where('TSLODRAFT_BRANCH', Auth::user()->branch)
            ->get();

        return ['data' => $RS];
    }

    function loadById(Request $request)
    {
        $RS = T_SLODETA::on($this->dedicatedConnection)->select([
            "id",
            "TSLODETA_ITMCD",
            "MITM_ITMNM",
            "TSLODETA_USAGE_DESCRIPTION",
            "TSLODETA_ITMQT",
            "TSLODETA_PRC",
            "TSLODETA_OPRPRC",
            "TSLODETA_MOBDEMOB",
            'TSLODETA_PERIOD_FR',
            'TSLODETA_PERIOD_TO'
        ])
            ->leftJoin("M_ITM", function ($join) {
                $join->on("TSLODETA_ITMCD", "=", "MITM_ITMCD")
                    ->on('TSLODETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->where('TSLODETA_SLOCD', base64_decode($request->id))
            ->where('TSLODETA_BRANCH', Auth::user()->branch)
            ->whereNull('deleted_at')->get();
        $RSHeader = T_SLOHEAD::on($this->dedicatedConnection)->select('TSLO_TYPE', 'TSLO_SERVTRANS_COST', 'TSLO_ISCON')
            ->where('TSLO_SLOCD', base64_decode($request->id))
            ->where('TSLO_BRANCH', Auth::user()->branch)
            ->get();
        return ['dataItem' => $RS, 'dataHeader' => $RSHeader];
    }

    function deleteByID($id, $isDeleteOnly = false)
    {
        $getDeletedDetail = T_SLODETA::on($this->dedicatedConnection)
            ->where('TSLODETA_SLOCD', base64_decode($id))
            ->get();

        $totalAmount = 0;
        foreach ($getDeletedDetail as $key => $value) {
            $totalAmount += $value->TSLODETA_ITMQT * $value->TSLODETA_PRC;
        }

        $cekInvoiceAcc = $this->getGencode(base64_encode('DEF_CUST_INVOICE'));

        $hasilApi = [];
        // if (count($cekInvoiceAcc) > 0 && !$isDeleteOnly) {
        //     try {
        //         $client = new \GuzzleHttp\Client();
        //         $response = $client->request('POST', env('ACC_URL').'api/post-journal', [
        //             'body' => json_encode([
        //                 'cg_code' => $this->dedicatedConnection,
        //                 'date' => date('Y-m-d'),
        //                 'reference_number' => base64_decode($id),
        //                 'journal_code' => $cekInvoiceAcc[0]->MGECD_VALUE,
        //                 'description' => 'Sales Order ' . base64_decode($id) . ' Revise',
        //                 'amount' => $totalAmount * - 1,
        //             ]),
        //             'headers' => [
        //                 'Content-Type' => 'application/json',
        //                 'X-API-KEY' => env('ACC_KEY'),
        //             ]
        //         ]);

        //         if ($response->getStatusCode() != 201) {
        //             return $response->getBody();
        //         }

        //         $hasilAPI = json_decode($response->getBody(), true);
        //     } catch (\GuzzleHttp\Exception\RequestException $e) {
        //         return response()->json([
        //             'error' => 'Failed to post data to API',
        //             'message' => $e->getMessage(),
        //             'param' => [
        //                 'cg_code' => $this->dedicatedConnection,
        //                 'date' => date('Y-m-d'),
        //                 'reference_number' => base64_decode($id),
        //                 'journal_code' => $cekInvoiceAcc[0]->MGECD_VALUE,
        //                 'description' => 'Sales Order ' . base64_decode($id) . ' Revise',
        //                 'amount' => $totalAmount * - 1,
        //             ]
        //         ], 500);
        //     }

        //     $hasilApi = json_decode($response->getBody()->getContents());
        // }

        $headerDelete = T_SLOHEAD::on($this->dedicatedConnection)
            ->where('TSLO_SLOCD', base64_decode($id))
            ->delete();

        $getDeletedDetail2 = T_SLODETA::on($this->dedicatedConnection)
            ->where('TSLODETA_SLOCD', base64_decode($id))
            ->delete();

        return [
            'msg' => 'Delete OK',
            'quotationHeader' => $headerDelete,
            'quotationDetail' => $getDeletedDetail2,
            'hasilApi' => $hasilApi
        ];
    }

    function getSLOByIDAPI($id)
    {
        $getData = T_SLOHEAD::on($this->dedicatedConnection)
            ->select(
                'TSLO_SLOCD',
                'TSLO_ISSUDT',
                'TSLO_PLAN_DLVDT',
                'TSLO_QUOCD',
                'TSLO_POCD',
                'TSLO_CUSCD',
                'TSLO_ATTN',
                DB::raw('CAST(TSLO_TYPE AS UNSIGNED) TSLO_TYPE'),
                'TSLO_ADDRESS_NAME',
                'TSLO_ADDRESS_DESCRIPTION',
                'TSLO_SERVTRANS_COST',
                DB::raw('CAST(TSLO_ISCON AS UNSIGNED) TSLO_ISCON')
            )
            ->where('TSLO_SLOCD', base64_decode($id))
            ->with('det', function ($j) {
                $j->select(
                    'TSLODETA_SLOCD',
                    'TSLODETA_ITMCD',
                    'TSLODETA_ITMQT',
                    DB::raw('CONVERT(TSLODETA_USAGE_DESCRIPTION, UNSIGNED) AS TSLODETA_USAGE_DESCRIPTION'),
                    'TSLODETA_PRC',
                    'TSLODETA_PERIOD_FR',
                    'TSLODETA_PERIOD_TO',
                );
            })
            ->with('quot')
            ->with('cust')
            ->first();

        return $getData;
    }

    function loadDraftById(Request $request)
    {
        $RS = T_SLO_DRAFT_DETAIL::on($this->dedicatedConnection)->select(["id", "TSLODRAFTDETA_ITMCD", "MITM_ITMNM", "TSLODRAFTDETA_ITMQT", "TSLODRAFTDETA_ITMPRC_PER"])
            ->leftJoin("M_ITM", function ($join) {
                $join->on("TSLODRAFTDETA_ITMCD", "=", "MITM_ITMCD")
                    ->on('TSLODRAFTDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->where('TSLODRAFTDETA_SLOCD', base64_decode($request->id))
            ->where('TSLODRAFTDETA_BRANCH', Auth::user()->branch)
            ->whereNull('deleted_at')->get();
        return ['dataItem' => $RS];
    }

    function deleteItemById(Request $request)
    {
        $affectedRow = T_SLODETA::on($this->dedicatedConnection)
            ->where('id', $request->id)
            ->where('TSLODETA_BRANCH', Auth::user()->branch)
            ->update([
                'deleted_at' => date('Y-m-d H:i:s'),
                'deleted_by' => Auth::user()->nick_name
            ]);
        return ['msg' => $affectedRow ? 'OK' : 'could not be deleted', 'affectedRow' => $affectedRow];
    }

    public function update(Request $request)
    {
        # ubah data header
        $affectedRow = T_SLOHEAD::on($this->dedicatedConnection)
            ->where('TSLO_SLOCD', base64_decode($request->id))
            ->where('TSLO_BRANCH', Auth::user()->branch)
            ->update([
                'TSLO_CUSCD' => $request->TSLO_CUSCD,
                'TSLO_ATTN' => $request->TSLO_ATTN,
                'TSLO_POCD' => $request->TSLO_POCD,
                'TSLO_ISSUDT' => $request->TSLO_ISSUDT,
                'TSLO_PLAN_DLVDT' => $request->TSLO_PLAN_DLVDT,
                'TSLO_ADDRESS_NAME' => $request->TSLO_ADDRESS_NAME,
                'TSLO_ADDRESS_DESCRIPTION' => $request->TSLO_ADDRESS_DESCRIPTION,
                'TSLO_MAP_URL' => $request->TSLO_MAP_URL,
            ]);
        return ['msg' => $affectedRow ? 'OK' : 'No changes'];
    }
    public function formReport()
    {
        $Usages = M_USAGE::on($this->dedicatedConnection)->select('MUSAGE_DESCRIPTION')->get();
        return view('report.receive_order', ['Usages' => $Usages]);
    }
    function report(Request $request)
    {
        $RS = T_SLOHEAD::on($this->dedicatedConnection)->select(DB::raw("T_SLOHEAD.*,MCUS_CUSNM,TSLODETA_ITMCD,MITM_ITMNM,TSLODETA_ITMQT,TSLODETA_USAGE_DESCRIPTION,TSLODETA_PRC,TSLODETA_OPRPRC,TSLODETA_MOBDEMOB"))
            ->leftJoin('T_SLODETA', function ($join) {
                $join->on('TSLO_SLOCD', '=', 'TSLODETA_SLOCD')->on('TSLO_BRANCH', '=', 'TSLODETA_BRANCH');
            })
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TSLODETA_ITMCD', '=', 'MITM_ITMCD')->on('TSLODETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->join('M_CUS', function ($join) {
                $join->on('TSLO_CUSCD', '=', 'MCUS_CUSCD')->on('TSLO_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->where("TSLO_ISSUDT", ">=", $request->dateFrom)
            ->where("TSLO_ISSUDT", "<=", $request->dateTo)
            ->where('TSLO_BRANCH', Auth::user()->branch)
            ->get()->toArray();
        if ($request->fileType === 'json') {
            return ['data' => $RS];
        } else {
            $spreadsheet = new Spreadsheet();
            $sheet = $spreadsheet->getActiveSheet();
            $sheet->setTitle('RECEIVED-ORDER');
            $sheet->freezePane('A2');

            $sheet->fromArray(array_keys($RS[0]), null, 'A1');
            $sheet->fromArray($RS, null, 'A2');

            foreach (range('A', 'Z') as $r) {
                $sheet->getColumnDimension($r)->setAutoSize(true);
            }

            $stringjudul = "Recived-Order Report " . date('Y-m-d H:i:s');
            $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');
            $filename = $stringjudul;
            header('Content-Type: application/vnd.ms-excel');
            header('Content-Disposition: attachment;filename="' . $filename . '.xlsx"');
            header('Cache-Control: max-age=0');
            $writer->save('php://output');
        }
    }

    function notificationsDraft()
    {
        $dataTobeUpproved = [];
        $dataPurchaseRequestApproved = [];
        $activeRole = CompanyGroupController::getRoleBasedOnCompanyGroup($this->dedicatedConnection);
        if (in_array($activeRole['code'], ['marketing', 'marketing_adm'])) {
            # Query untuk data Purchase Order Draft
            $RSDetail = DB::connection($this->dedicatedConnection)->table('T_SLO_DRAFT_DETAIL')
                ->selectRaw("COUNT(*) TTLDETAIL, TSLODRAFTDETA_SLOCD")
                ->groupBy("TSLODRAFTDETA_SLOCD")
                ->where('TSLODRAFTDETA_BRANCH', Auth::user()->branch)
                ->whereNull('deleted_at');
            $dataTobeUpproved = T_SLO_DRAFT_HEAD::on($this->dedicatedConnection)->select(DB::raw("TSLODRAFT_SLOCD,max(TTLDETAIL) TTLDETAIL, max(T_SLO_DRAFT_HEAD.created_at) CREATED_AT,max(TSLODRAFT_POCD) TSLODRAFT_POCD"))
                ->joinSub($RSDetail, 'dt', function ($join) {
                    $join->on("TSLODRAFT_SLOCD", "=", "TSLODRAFTDETA_SLOCD");
                })
                ->whereNull("TSLODRAFT_APPRVDT")
                ->where('TSLODRAFT_BRANCH', Auth::user()->branch)
                ->groupBy('TSLODRAFT_SLOCD')->get();
        }
        return [
            'data' => $dataTobeUpproved,
            'dataApproved' => $dataPurchaseRequestApproved
        ];
    }

    public function formApprovalDraft()
    {
        return view('transaction.sales_order_draft_status');
    }

    public function updateItem(Request $request)
    {
        $affectedRow = 0;
        # ubah data detail
        $affectedRow = T_SLODETA::on($this->dedicatedConnection)
            ->where('id', $request->id)
            ->where('TSLODETA_BRANCH', Auth::user()->branch)
            ->update([
                'TSLODETA_ITMCD' => $request->TSLODETA_ITMCD,
                'TSLODETA_ITMQT' => $request->TSLODETA_ITMQT,
                'TSLODETA_USAGE_DESCRIPTION' => $request->TSLODETA_USAGE_DESCRIPTION,
                'TSLODETA_PRC' => $request->TSLODETA_PRC,
                'TSLODETA_OPRPRC' => $request->TSLODETA_OPRPRC ? $request->TSLODETA_OPRPRC : 0,
                'TSLODETA_MOBDEMOB' => $request->TSLODETA_MOBDEMOB ? $request->TSLODETA_MOBDEMOB : 0,
            ]);
        return ['msg' => $affectedRow ? 'OK' : 'No changes'];
    }

    public function salesReportForm()
    {
        return view('tribinapp_layouts', ['routeApp' => 'salesReport']);
    }

    public function marketingReport(Request $request)
    {
        $activeRole = CompanyGroupController::getRoleBasedOnCompanyGroup($this->dedicatedConnection);

        $hasilTemp = [
            'BARU' => [],
            'PERPANJANGAN' => []
        ];
        $listCat = [];
        if (count($request->itmCat) > 0) {
            $listCat = $request->itmCat;
        } else {
            $listCat = M_ITM::on($this->dedicatedConnection)->select('MITM_ITMCAT')->groupBy('MITM_ITMCAT')->get()->pluck('MITM_ITMCAT');
        }

        foreach ($listCat as $key => $value) {
            $RSTemp = T_DLVORDDETA::on($this->dedicatedConnection)
                ->select(
                    'TSLO_SLOCD',
                    'MITM_ITMCD',
                    'MITM_ITMNM',
                    'TQUO_PROJECT_LOCATION',
                    'CSPK_PIC_AS',
                    'CSPK_PIC_NAME',
                    'MCUS_CUSNM',
                    DB::raw('SUM(TDLVORDDETA_ITMQT * TDLVORDDETA_PRC) AS TSLODETA_ITMQT'),
                    'name',
                    'T_SLOHEAD.created_by',
                    'TSLODETA_PERIOD_FR',
                    'TSLODETA_PERIOD_TO',
                    'TDLVORDDETA_DLVCD'
                )
                ->join('T_SLODETA', function ($j) {
                    $j->on('TDLVORDDETA_SLOCD', 'TSLODETA_SLOCD');
                    $j->on('TDLVORDDETA_ITMCD', 'TSLODETA_ITMCD');
                })
                ->join('T_SLOHEAD', 'TSLODETA_SLOCD', 'TSLO_SLOCD')
                ->join('T_QUOHEAD', 'TSLO_QUOCD', 'TQUO_QUOCD')
                ->join('M_ITM', 'MITM_ITMCD', 'TDLVORDDETA_ITMCD_ACT')
                ->join('M_CUS', 'MCUS_CUSCD', 'TSLO_CUSCD')
                ->leftjoin('C_SPK', 'CSPK_REFF_DOC', 'TDLVORDDETA_DLVCD')
                ->join('jatpower_tribin.users', 'T_SLODETA.created_by', 'nick_name')
                ->where('MITM_ITMCAT', $value)
                ->whereBetween('T_SLODETA.created_at', [$request->fdate . " 00:00:00", $request->ldate . " 23:59:59"])
                ->groupBy(
                    'TSLO_SLOCD',
                    'MITM_ITMCD',
                    'MITM_ITMNM',
                    'TQUO_PROJECT_LOCATION',
                    'CSPK_PIC_AS',
                    'CSPK_PIC_NAME',
                    'MCUS_CUSNM',
                    'name',
                    'T_SLOHEAD.created_by',
                    'TSLODETA_PERIOD_FR',
                    'TSLODETA_PERIOD_TO',
                    'TDLVORDDETA_DLVCD'
                );

            if (!in_array($activeRole['code'], ['root', 'accounting', 'director', 'manager', 'general_manager'])) {
                $RSTemp->where('T_QUOHEAD.created_by', Auth::user()->nick_name);
            }

            // return Auth::user();

            $cekTotalData = $RSTemp->get()->toArray();

            if (count($cekTotalData) > 0) {
                $hasilTemp['BARU'][$value] = array_values(array_filter($cekTotalData, function ($f) {
                    if (!str_contains($f['TSLO_SLOCD'], '-')) {
                        return $f;
                    }
                }));

                $hasilTemp['PERPANJANGAN'][$value] = array_values(array_filter($cekTotalData, function ($f) {
                    if (str_contains($f['TSLO_SLOCD'], '-')) {
                        return $f;
                    }
                }));
            }
        }

        $companyGroupData = CompanyGroup::where('connection', $this->dedicatedConnection)->first();

        $hasil = $hasilTemp;

        $pdf = Pdf::setPaper('A4', 'landscape')->loadView('pdf.salesReport', [
            'data' => $hasil,
            'dateRange' => [$request->fdate, $request->ldate],
            'header' => $companyGroupData->name,
            'subHeader' => 'SALES & RENTAL DIESEL GENSET - FORKLIF - TRAVOLAS - TRUK',
            'addr' => $companyGroupData->address
        ]);

        return base64_encode($pdf->output());
    }
}
