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
use Barryvdh\DomPDF\Facade\Pdf;

class ReceiveBarcodeController extends Controller
{
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
        return view('tribinapp_layouts', ['routeApp' => 'incomingBC']);
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
        //
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

    function searchApi(Request $request)
    {
        $RS = T_RCV_BC_DETAIL::on($this->dedicatedConnection)
            ->select(
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

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%{ $request->searchValue }%');
        }

        return ['data' => $RS->get()];
    }

    public function printBarcode(Request $request) {
        // return view('pdf.barcode', ['data' => $request->data]);
        $pdf = Pdf::loadView('pdf.barcode', ['data' => $request->data])->setPaper('a4');

        return base64_encode($pdf->stream('barcode.pdf'));
    }
}
