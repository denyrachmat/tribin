<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;

use App\Models\T_SRV_HEAD;
use App\Models\T_SRV_DET;
use App\Models\T_SRV_FIXDET;
use App\Models\T_LOC_REQ;

class ServiceOprController extends Controller
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
        return view('tribinapp_layouts', ['routeApp' => 'servicesOrderList']);
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
        $checkOnlyWithFix = array_filter($request->data, function($f) {
            return isset($f['listFixDet']);
        });

        $hasil = [];
        foreach ($checkOnlyWithFix as $key => $value) {
            T_SRV_DET::on($this->dedicatedConnection)->where('id', $value['id'])->update([
                'TSRVD_FLGSTS' => $value['TSRVD_FLGSTS'],
                'TSRVD_REMARK' => $value['TSRVD_REMARK']
            ]);
            foreach ($value['listFixDet'] as $key => $valueDet) {
                $hasil[] = T_SRV_FIXDET::on($this->dedicatedConnection)->updateOrCreate([
                    'TSRVD_ID' => $value['id'],
                    'TSRVF_ITMCD' => $valueDet['TSRVF_ITMCD'],
                ],[
                    'TSRVD_ID' => $value['id'],
                    'TSRVF_ITMCD' => $valueDet['TSRVF_ITMCD'],
                    'TSRVF_PRC' => $valueDet['TSRVF_PRC'],
                    'TSRVF_QTY' => $valueDet['TSRVF_QTY'],
                ]);
            }
        }
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

    public function search(Request $request){
        $RSTemp = T_SRV_HEAD::on($this->dedicatedConnection)
        ->select(
            'T_SRV_HEAD.id',
            'T_SRV_HEAD.SRVH_DOCNO',
            'T_SRV_HEAD.SRVH_ISSDT',
            'MCUS_CUSNM',
            'MCUS_CUSCD',
            'T_SRV_HEAD.created_at',
            'SRVH_ISINT'
        )
        ->join('M_CUS', 'MCUS_CUSCD', 'SRVH_CUSCD')
        ->where(DB::raw('(
            SELECT COUNT(*) FROM T_SRV_DET WHERE TSRVH_ID = T_SRV_HEAD.id
            and TSRVD_FLGSTS = 3
        )'), '=', 0)
        ->orderBy('created_at', 'desc');
        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RSTemp->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        $head = $RSTemp->get()->toArray();

        $hasil = [];
        foreach ($head as $key => $value) {
            $getDet = T_SRV_DET::on($this->dedicatedConnection)
            ->with(['listFixDet' => function($j) {
                $j->select('*', DB::raw('TSRVF_QTY * TSRVF_PRC as SUBTOT_AMT'));
                $j->join('M_ITM', 'MITM_ITMCD', 'TSRVF_ITMCD');
            }])
            ->where('TSRVH_ID', $value['id'])
            ->get()
            ->toArray();

            $checkDataFlagApproved = array_filter($getDet, function($f){
                return $f['TSRVD_FLGSTS'] === 2;
            });

            $listPartReq = [];
            foreach ($getDet as $keyDet => $valueDet) {
                $listPartReq[] = array_merge(
                    $valueDet,
                    ['partReq' => T_LOC_REQ::on($this->dedicatedConnection)
                    ->where('TLOCREQ_DOCNO', $value['SRVH_DOCNO'].'-'.$valueDet['TSRVD_LINE'])
                    ->get()
                    ->toArray()
                    ]
                );
            }

            $getUnresolve = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->where('TSRVD_FLGSTS', count($checkDataFlagApproved) > 0 ? 2 : 0)->get()->toArray();
            $getResolve = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->where('TSRVD_FLGSTS', count($checkDataFlagApproved) > 0 ? 3 : 1)->get()->toArray();
            $hasil[] = array_merge($value, ['detail' => $listPartReq, 'unresolve' => $getUnresolve, 'resolve' => $getResolve]);
        }

        return ['data' => $hasil];
    }
}
