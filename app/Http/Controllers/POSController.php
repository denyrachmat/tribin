<?php

namespace App\Http\Controllers;
use App\Models\M_ITM;
use App\Traits\LocationTraits;
use Validator;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

use App\Models\T_POS;
use App\Models\T_POS_DET;

use App\Models\CompanyGroup;

class POSController extends Controller
{
    use LocationTraits;

    protected $dedicatedConnection;

    public function __construct()
    {
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return view('tribinapp_layouts', ['routeApp' => 'pos']);
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
            'TPOS_CUSTCD' => 'required',
            'det.*.TPOSD_ITMCD' => 'required',
            'det.*.TPOSD_QTY' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }
        $cekCG = CompanyGroup::where('connection', $this->dedicatedConnection)->first();
        $cek = T_POS::on($this->dedicatedConnection)->where(DB::raw('YEAR(created_at)'), date('Y'))
            ->orderBy('created_at', 'desc')
            ->first();

        if ($request->has('TPOS_DOCNO')) {
            $IDPOS = $request->TPOS_DOCNO;
        } else {
            $IDPOS = 'POS/' . $cekCG->alias_code . '/' . date('Y/m/d') . '/' . (empty($cek) ? '0001' : sprintf('%04d', (int) substr($cek->TPOS_DOCNO, -4) + 1));
        }


        T_POS::on($this->dedicatedConnection)->updateOrCreate([
            'TPOS_DOCNO' => $IDPOS,
            'TPOS_CUSTCD' => $request->TPOS_CUSTCD
        ], [
            'TPOS_DOCNO' => $IDPOS,
            'TPOS_CUSTCD' => $request->TPOS_CUSTCD
        ]);


        $listForDODet = [];
        foreach ($request->det as $key => $value) {
            $checkItem = M_ITM::on($this->dedicatedConnection)->where('MITM_ITMCD', $value['TPOSD_ITMCD'])->first();
            T_POS_DET::on($this->dedicatedConnection)->updateOrCreate([
                'TPOSH_ID' => $IDPOS,
                'TPOSD_ITMCD' => $value['TPOSD_ITMCD']
            ], [
                'TPOSH_ID' => $IDPOS,
                'TPOSD_ITMCD' => !empty($value['BC']) ? $value['TPOSD_ITMCD'] : $checkItem->MITM_ITMNM,
                'TPOSD_QTY' => $value['TPOSD_QTY'],
                'TPOSD_BC' => $value['BC'] ?? '',
                'TPOSD_PRC' => $value['TPOSD_PRC']
            ]);

            $listForDODet[] = [
                'TSLODETA_ITMCD' => $value['TPOSD_ITMCD'],
                'BALQT' => $value['TPOSD_QTY'],
                'TSLODETA_PRC' => $value['TPOSD_PRC'],
                'TDLVORDDETA_ITMCD_ACT' => !empty($value['BC']) ? $value['TPOSD_ITMCD'] : $checkItem->MITM_ITMNM,
            ];
        }

        $createReq = new Request([
            'TDLVORD_DLVCD' => $IDPOS,
            'TDLVORD_CUSCD' => $request->TPOS_CUSTCD,
            'TDLVORD_ISSUDT' => date('Y-m-d H:i:s'),
            'TDLVORD_REMARK' => 'POS',
            'typeOutgoing' => 5,
            'SO_DET' => $listForDODet,
            'splitSJ' => 0,
        ]);

        $postToDelivery = app('App\Http\Controllers\DeliveryController')->save($createReq);

        return response()->json([
            'message' => 'Data berhasil disimpan',
            'data' => $postToDelivery
        ], 200);
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
}
