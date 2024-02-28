<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Barryvdh\DomPDF\Facade\Pdf;
use DB;

use App\Models\T_SRV_HEAD;
use App\Models\T_SRV_DET;

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
        //
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

    public function search(Request $request){
        $RSTemp = T_SRV_HEAD::on($this->dedicatedConnection)
        ->select(
            'T_SRV_HEAD.id',
            'T_SRV_HEAD.SRVH_DOCNO',
            'T_SRV_HEAD.SRVH_ISSDT',
            'MCUS_CUSNM',
            'MCUS_CUSCD',
            'T_SRV_HEAD.created_at',
        )
        ->join('M_CUS', 'MCUS_CUSCD', 'SRVH_CUSCD')
        ->where(DB::raw('(
            SELECT COUNT(*) FROM T_SRV_DET WHERE TSRVH_ID = T_SRV_HEAD.id
        )'), '>', DB::raw('(
            SELECT COUNT(*) FROM T_SRV_DET WHERE TSRVH_ID = T_SRV_HEAD.id
            AND TSRVD_FLGSTS <> 0
        )'));
        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RSTemp->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        $head = $RSTemp->get()->toArray();

        $hasil = [];
        foreach ($head as $key => $value) {
            $getDet = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->get()->toArray();
            $getUnresolve = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->where('TSRVD_FLGSTS', 0)->get()->toArray();
            $getResolve = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->where('TSRVD_FLGSTS', 1)->get()->toArray();
            $hasil[] = array_merge($value, ['detail' => $getDet, 'unresolve' => $getUnresolve, 'resolve' => $getResolve]);
        }

        return ['msg' => 'Data Fetched', 'data' => $hasil];
    }
}
