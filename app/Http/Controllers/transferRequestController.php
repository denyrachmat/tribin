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

class transferRequestController extends Controller
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
        $data = T_LOC_REQ::on($this->dedicatedConnection)
            ->select(
                'TLOCREQ_DOCNO',
                'TLOCREQ_FRLOC',
                'TLOCREQ_TOLOC',
                'TLOCREQ_APPRVBY',
                DB::raw('(select max(TLOCREQ_ISREP) from T_LOC_REQ tlr where tlr.TLOCREQ_DOCNO = TLOCREQ_DOCNO limit 1) as TLOCREQ_ISREP')
            )
            ->where('TLOCREQ_ISREP', 0)
            ->groupBy(
                'TLOCREQ_APPRVBY',
                'TLOCREQ_DOCNO',
                'TLOCREQ_FRLOC',
                'TLOCREQ_TOLOC',
            );

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $data->where($request->searchBy, 'like', '%{ $request->searchValue }%');
        }

        $hasil = [];
        foreach ($data->get()->toArray() as $key => $value) {
            $hasil[] = array_merge($value, [
                'detail' => T_LOC_REQ::on($this->dedicatedConnection)
                    ->where('TLOCREQ_DOCNO', $value['TLOCREQ_DOCNO'])
                    ->where('TLOCREQ_ISREP', $value['TLOCREQ_ISREP'])
                    ->get()
            ]);
        }

        return ['data' => $hasil];
    }

    function approveData($id) {
        $data = T_LOC_REQ::on($this->dedicatedConnection)
        ->where('TLOCREQ_DOCNO', base64_decode($id))
        ->get();

        foreach ($data as $key => $value) {
            $cekForIss = DB::connection($this->dedicatedConnection)
                ->table('V_STOCK_CHECK')
                ->where('CITRN_ITMCD', $value['TLOCREQ_ITMCD'])
                ->where('CITRN_ITMQT','>', 0)
                ->first();

            if($value['TLOCREQ_ISREP'] === 0) {
                // Issue Stock
                $iss = C_ITRN::on($this->dedicatedConnection)->create([
                    'CITRN_BRANCH' => Auth::user()->branch,
                    'CITRN_LOCCD' => $value['TLOCREQ_FRLOC'],
                    'CITRN_DOCNO' => $value['TLOCREQ_DOCNO'],
                    'CITRN_ISSUDT' => date('Y-m-d'),
                    'CITRN_FORM' => 'OUT-TRF-LOC',
                    'CITRN_ITMCD' => $value['TLOCREQ_ITMCD'],
                    'CITRN_ITMQT' => $value['TLOCREQ_QTY'] * -1,
                    'CITRN_PRCPER' => empty($cekForIss) ? 0 : $cekForIss->CITRN_PRCPER,
                    'CITRN_PRCAMT' => empty($cekForIss) ? 0 : $value['TLOCREQ_QTY'] * $cekForIss->CITRN_PRCPER,
                    'created_by' => Auth::user()->nick_name,
                    'id_reff' => empty($cekForIss) ? 0 : $cekForIss->id_reff,
                ]);
            }

            // Receive Stock
            $rcv = C_ITRN::on($this->dedicatedConnection)->create([
                'CITRN_BRANCH' => Auth::user()->branch,
                'CITRN_LOCCD' => $value['TLOCREQ_TOLOC'],
                'CITRN_DOCNO' => $value['TLOCREQ_DOCNO'],
                'CITRN_ISSUDT' => date('Y-m-d'),
                'CITRN_FORM' => 'INC-TRF-LOC',
                'CITRN_ITMCD' => $value['TLOCREQ_ITMCD'],
                'CITRN_ITMQT' => $value['TLOCREQ_QTY'],
                'CITRN_PRCPER' => empty($cekForIss) ? 0 : $cekForIss->CITRN_PRCPER,
                'CITRN_PRCAMT' => empty($cekForIss) ? 0 : $value['TLOCREQ_QTY'] * $cekForIss->CITRN_PRCPER,
                'created_by' => Auth::user()->nick_name,
                'id_reff' => empty($cekForIss) ? 0 : $cekForIss->id_reff,
            ]);
        }

        T_LOC_REQ::on($this->dedicatedConnection)
        ->where('TLOCREQ_DOCNO', base64_decode($id))
        ->update([
            'TLOCREQ_APPRVDT' => date('Y-m-d H:i:s'),
            'TLOCREQ_APPRVBY' => Auth::user()->nick_name
        ]);

        return ['msg' => 'Transfer Approved !!'];
    }
}
