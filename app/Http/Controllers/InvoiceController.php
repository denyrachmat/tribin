<?php

namespace App\Http\Controllers;

use App\Models\T_SLODETA;
use Illuminate\Http\Request;
use App\Models\T_DLVORDHEAD;
use Illuminate\Support\Facades\Crypt;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\COMPANY_BRANCH;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class InvoiceController extends Controller
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
        return view('tribinapp_layouts', ['routeApp' => 'invoice']);
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

    public function search(Request $request) {
        $data = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                'TDLVORD_INVCD',
                'TDLVORD_DLVCD',
                'TDLVORD_ISSUDT',
                'TDLVORD_INVCD',
                'TDLVORDDETA_SLOCD',
                'MCUS_CUSNM',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'MCUS_ADDR1',
                'TSLO_QUOCD',
                'TSLO_POCD',
                'TQUO_SBJCT',
                'TQUO_ATTN'
            )
            ->with(['dlvdet' => function ($f) {
                $f->join('M_ITM', 'TDLVORDDETA_ITMCD', 'MITM_ITMCD');
            } ,'dlvacc'])
            ->join('T_DLVORDDETA', 'TDLVORD_DLVCD', 'TDLVORDDETA_DLVCD')
            ->join('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_SLOHEAD', 'TSLO_SLOCD', 'TDLVORDDETA_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TQUO_QUOCD', 'TSLO_QUOCD')
            ->whereNotNull('TDLVORDDETA_ITMCD_ACT')
            ->groupBy(
                'TDLVORD_INVCD',
                'TDLVORD_DLVCD',
                'TDLVORD_ISSUDT',
                'TDLVORD_INVCD',
                'TDLVORDDETA_SLOCD',
                'MCUS_CUSNM',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'MCUS_ADDR1',
                'TSLO_QUOCD',
                'TSLO_POCD',
                'TQUO_SBJCT',
                'TQUO_ATTN'
            );

        if (!empty($request->searchBy)) {
            $data->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        $hasil = [];
        foreach ($data->get()->toArray() as $key => $value) {
            $hasil[] = array_merge(
                $value,
                [
                    'sloDet' => T_SLODETA::on($this->dedicatedConnection)
                        ->where('TSLODETA_SLOCD', $value['TDLVORDDETA_SLOCD'])->get()
                ]
            );
        }

        return ['data' => $hasil];
    }

    public function printInvoice(Request $request){
        $RSCG = COMPANY_BRANCH::on(empty($conn) ? $this->dedicatedConnection : base64_decode($conn))->select('name', 'address', 'phone', 'fax', 'letter_head')
            ->where('connection', empty($conn) ? $this->dedicatedConnection : base64_decode($conn))
            ->where('BRANCH', Auth::user()->branch)
            ->first();
            
        $total = 0;
        $dlvDetParse = [];
        foreach ($request->dlvdet as $key => $value) {
            $getSLOByItem = array_filter($request->sloDet, function($f) use ($value) 
                { 
                    return $f['TSLODETA_ITMCD'] == $value['TDLVORDDETA_ITMCD']; 
                });

            // return $getSLOByItem[0];
            if(isset($getSLOByItem[0]) && count($getSLOByItem) > 0){
                $getTotalPrice = ($getSLOByItem[0]['TSLODETA_PRC'] * $value['TDLVORDDETA_ITMQT']) + $getSLOByItem[0]['TSLODETA_OPRPRC']  + $getSLOByItem[0]['TSLODETA_MOBDEMOB'];
                $total += $getTotalPrice;
                $dlvDetParse[] = array_merge($value, ['dataSLO' => $getSLOByItem[0], 'totPRCSLO' => $getTotalPrice]);
                // return array_merge($value, $getSLOByItem[0]);
            }
        }

        $ppn = $total * 0.11;

        $pdf = Pdf::loadView('pdf.invoiceDlv', array_merge(
            [
                'header' => $RSCG->letter_head,
                'subHeader' => 'SALES & RENTAL DIESEL GENSET - FORKLIF - TRAVOLAS - TRUK',
                'addr' => $RSCG->address,
                'telp' => $RSCG->phone,
                'total' => $total,
                'ppn' => $ppn,
                'dlvDetNew' => $dlvDetParse,
                'terbilang' => $this->numberToSentence($total + $ppn)
            ],
            $request->all()
        ));

        return $pdf->stream('invoiceDlv.pdf');
    }

    public function numberToSentence($nilai)
    {
        $nilai = abs($nilai);
        $huruf = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
        $temp = "";
        if ($nilai < 12) {
            $temp = " " . $huruf[$nilai];
        } else if ($nilai < 20) {
            $temp = $this->numberToSentence($nilai - 10) . " belas";
        } else if ($nilai < 100) {
            $temp = $this->numberToSentence($nilai / 10) . " puluh" . $this->numberToSentence($nilai % 10);
        } else if ($nilai < 200) {
            $temp = " seratus" . $this->numberToSentence($nilai - 100);
        } else if ($nilai < 1000) {
            $temp = $this->numberToSentence($nilai / 100) . " ratus" . $this->numberToSentence($nilai % 100);
        } else if ($nilai < 2000) {
            $temp = " seribu" . $this->numberToSentence($nilai - 1000);
        } else if ($nilai < 1000000) {
            $temp = $this->numberToSentence($nilai / 1000) . " ribu" . $this->numberToSentence($nilai % 1000);
        } else if ($nilai < 1000000000) {
            $temp = $this->numberToSentence($nilai / 1000000) . " juta" . $this->numberToSentence($nilai % 1000000);
        } else if ($nilai < 1000000000000) {
            $temp = $this->numberToSentence($nilai / 1000000000) . " milyar" . $this->numberToSentence(fmod($nilai, 1000000000));
        } else if ($nilai < 1000000000000000) {
            $temp = $this->numberToSentence($nilai / 1000000000000) . " trilyun" . $this->numberToSentence(fmod($nilai, 1000000000000));
        }
        return $temp;
    }
}
