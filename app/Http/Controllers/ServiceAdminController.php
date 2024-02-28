<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

use App\Models\T_SRV_HEAD;
use App\Models\T_SRV_DET;

class ServiceAdminController extends Controller
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
        $validator = Validator::make($request->all(), [
            'header.SRVH_ISSDT' => 'required',
            'header.SRVH_CUSCD' => 'required',
            'detail.*' => 'required',
            'detail.*.TSRVD_ITMCD' => 'required',
            'detail.*.TSRVD_QTY' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $cekHariIni = T_SRV_HEAD::on($this->dedicatedConnection)->whereBetween('created_at', [date('yyyy-mm-dd 00:00:00'), date('yyyy-mm-dd 23:59:59')])->first();
        $IDSPK = 'JAT/SRV/' . date('y/m/d') . '/' . (empty($cekHariIni) ? '0001' : sprintf('%04d', (int) substr($cekHariIni->ID_TRANS, -3) + 1));

        $headerStore = T_SRV_HEAD::on($this->dedicatedConnection)->updateOrCreate([
            'SRVH_DOCNO' => $IDSPK
        ], [
            'SRVH_DOCNO' => $IDSPK,
            'SRVH_CUSCD' => $request->header['SRVH_CUSCD'],
            'SRVH_BRANCH' => Auth::user()->branch,
            'SRVH_ISSDT' => $request->header['SRVH_ISSDT'],
            'created_by' => Auth::user()->nick_name,
        ]);

        $det = [];
        foreach ($request->detail as $key => $value) {
            $det[] = T_SRV_DET::on($this->dedicatedConnection)->updateOrCreate([
                'TSRVH_ID' => $headerStore->id,
                'TSRVD_ITMCD' => $value['TSRVD_ITMCD'],
                'TSRVD_LINE' => $value['TSRVD_LINE'],
                'TSRVD_CUSTRMK' => $value['TSRVD_CUSTRMK'],
                'TSRVD_QTY' => $value['TSRVD_QTY'],
                'created_by' => Auth::user()->nick_name,
            ]);
        }

        return ['msg' => 'Service Stored !!', 'data' => ['header' => $headerStore, 'det' => $det]];
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {

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
        $RSTemp = T_SRV_HEAD::on($this->dedicatedConnection);
        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RSTemp->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        $head = $RSTemp->get()->toArray();

        $hasil = [];
        foreach ($head as $key => $value) {
            $getDet = T_SRV_DET::where('TSRVH_ID', $value['id'])->get()->toArray();
            $hasil[] = array_merge($value, ['detail' => $getDet]);
        }

        return ['msg' => 'Data Fetched', 'data' => $hasil];
    }
}
