<?php

namespace App\Http\Controllers;
use App\Models\M_ITM;
use App\Traits\LocationTraits;
use Validator;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Barryvdh\DomPDF\Facade\Pdf;

use App\Models\T_POS;
use App\Models\T_POS_DET;
use App\Models\COMPANY_BRANCH;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use App\Models\CompanyGroup;
use App\Traits\gencodeTraits;

class POSController extends Controller
{
    use LocationTraits, gencodeTraits;

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
            'TPOS_PAY' => 'required',
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
            // $IDPOS = 'POS/' . $cekCG->alias_code . '/' . date('Y/m/d') . '/' . (empty($cek) ? '0001' : sprintf('%04d', (int) substr($cek->TPOS_DOCNO, -4) + 1));
            $IDPOS = $this->getGencodeData('BCGENCODE', $this->dedicatedConnection, true)->getData(true)['data'] ?? null;
        }


        T_POS::on($this->dedicatedConnection)->updateOrCreate([
            'TPOS_DOCNO' => $IDPOS,
            'TPOS_CUSTCD' => $request->TPOS_CUSTCD
        ], [
            'TPOS_DOCNO' => $IDPOS,
            'TPOS_CUSTCD' => $request->TPOS_CUSTCD,
            'TPOS_PAY' => $request->TPOS_PAY,
        ]);


        $listForDODet = [];
        T_POS_DET::on($this->dedicatedConnection)
            ->where('TPOSH_ID', $IDPOS)
            ->delete();
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

        $postToDelivery = $this->sendToDeliveryOrder(new Request([
            'TPOS_DOCNO' => $IDPOS
        ]));

        return response()->json([
            'message' => 'Data berhasil disimpan',
            'data' => $postToDelivery
        ], 200);
    }
    
    public function sendToDeliveryOrder(Request $request) {
        $validator = Validator::make($request->all(), [
            'TPOS_DOCNO' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $IDPOS = $request->TPOS_DOCNO;
        $cg = $request->cg;

        $posData = T_POS::on(Crypt::decryptString($cg))->where('TPOS_DOCNO', $IDPOS)->first();
        if (!$posData) {
            return response()->json(['message' => 'Data POS tidak ditemukan'], 404);
        }

        $posDetData = T_POS_DET::on(Crypt::decryptString($cg))->where('TPOSH_ID', $posData->id)->get();
        if ($posDetData->isEmpty()) {
            return response()->json(['message' => 'Detail POS tidak ditemukan'], 404);
        }

        $listForDODet = [];
        foreach ($posDetData as $det) {
            $listForDODet[] = [
                'TSLODETA_ITMCD' => $det->TPOSD_ITMCD,
                'BALQT' => $det->TPOSD_QTY,
                'TSLODETA_PRC' => $det->TPOSD_PRC,
                'TDLVORDDETA_ITMCD_ACT' => $det->TPOSD_ITMCD,
            ];
        }

        $createReq = new Request([
            'TDLVORD_DLVCD' => $IDPOS,
            'TDLVORD_CUSCD' => $posData->TPOS_CUSTCD,
            'TDLVORD_ISSUDT' => date('Y-m-d H:i:s'),
            'TDLVORD_REMARK' => 'POS',
            'typeOutgoing' => 5,
            'SO_DET' => $listForDODet,
            'splitSJ' => 0,
            'cg' => $request->cg
        ]);

        $postToDelivery = app('App\Http\Controllers\DeliveryController')->save($createReq);

        return response()->json([
            'message' => 'Data berhasil dikirim ke Delivery Order',
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
        $id = base64_decode($id);
        $cek = T_POS::on($this->dedicatedConnection)->where('TPOS_DOCNO', $id)->first();

        if (!$cek) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        // Cek apakah sudah ada delivery order terkait
        $cekDelivery = DB::connection($this->dedicatedConnection)
            ->table('T_DLVORDHEAD')
            ->where('TDLVORD_DLVCD', $id)
            ->first();

        if ($cekDelivery) {
            return response()->json(['message' => 'Tidak dapat menghapus data karena sudah terkait dengan Delivery Order'], 400);
        }

        // Jika belum ada delivery order, lanjutkan dengan penghapusan
        T_POS::on($this->dedicatedConnection)->where('TPOS_DOCNO', $id)->delete();
        T_POS_DET::on($this->dedicatedConnection)->where('TPOSH_ID', $id)->delete();

        return response()->json(['message' => 'Data berhasil dihapus'], 200);
    }

    public function searchAPI(Request $request)
    {
        $data = T_POS::on($this->dedicatedConnection)->where('TPOS_DOCNO', 'like', '%' . $request->search . '%')
            ->select(
                'T_POS.id',
                'T_POS.TPOS_DOCNO', 
                'T_POS.TPOS_CUSTCD',
                'M_CUS.MCUS_CUSNM', 
                'M_CUS.MCUS_CURCD',
                'T_POS.created_at',
                DB::raw("FORMAT(SUM(COALESCE(T_POS_DET.TPOSD_QTY, 0) * COALESCE(T_POS_DET.TPOSD_PRC, 0)), 0, 'en_EN') as TPOS_TOTALAMT"),
                DB::raw('CASE WHEN T_DLVORDHEAD.TDLVORD_DLVCD IS NOT NULL THEN 1 ELSE 0 END as has_delivery_order')
            )
            ->orWhere('TPOS_CUSTCD', 'like', '%' . $request->search . '%')
            ->join('M_CUS', 'M_CUS.MCUS_CUSCD', '=', 'T_POS.TPOS_CUSTCD')
            ->leftjoin('T_POS_DET', 'T_POS_DET.TPOSH_ID', '=', 'T_POS.id')
            ->leftJoin('T_DLVORDHEAD', 'T_DLVORDHEAD.TDLVORD_DLVCD', '=', 'T_POS.TPOS_DOCNO')
            ->groupBy(
                'T_POS.TPOS_DOCNO', 
                'T_POS.TPOS_CUSTCD',
                'M_CUS.MCUS_CUSNM', 
                'M_CUS.MCUS_CURCD',
                'T_POS.created_at'
            );

        if($request->has('withDet') && $request->withDet === true){
            $data->with('det', function ($f)  {
                $f->select(
                    'TPOSH_ID',
                    'TPOSD_ITMCD',
                    'TPOSD_QTY',
                    'TPOSD_PRC',
                    'TPOSD_BC',
                    DB::raw('TPOSD_QTY * TPOSD_PRC as total_price'),
                    DB::raw('M_ITM.MITM_ITMNM as MITM_ITMNMREAL')
                )->join('M_ITM', 'M_ITM.MITM_ITMCD', '=', 'T_POS_DET.TPOSD_ITMCD');
            });
        }

        if (!empty($request->searchBy)) {
            $data->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        if ($request->has('pagination') && !empty($request->pagination)) {
            $data = $data->paginate($request->pagination['rowsPerPage'], ['*'], 'page', $request->pagination['page']);
        } else {
            $data = $data->get();
        }

        return response()->json($data, 200);
    }

    public function listForms(){
        return view('tribinapp_layouts', ['routeApp' => 'posList']);
    }

    public function printStruk(Request $request){
        $conn = $request->has('cg') && !empty($request->cg) ? Crypt::decryptString($request->cg) : $this->dedicatedConnection;
        $user = $request->has('username') && !empty($request->username) ? User::where('nick_name', $request->username)->first() : Auth::user(); // Fallback ke user dengan ID 1 jika tidak ada user yang terautentikasi;
        $RSCG = COMPANY_BRANCH::on($conn)->select('name', 'address', 'phone', 'fax', 'letter_head')
            ->where('connection', $conn)
            ->where('BRANCH', $user->branch)
            ->first();

        $data = T_POS::on($conn)->where('TPOS_DOCNO', $request->TPOS_DOCNO)
            ->select(
                'T_POS.id',
                'T_POS.TPOS_DOCNO', 
                'T_POS.TPOS_CUSTCD',
                'T_POS.TPOS_PAY',
                'M_CUS.MCUS_CUSNM', 
                'M_CUS.MCUS_CURCD',
                'T_POS.created_at',
                DB::raw('SUM(T_POS_DET.TPOSD_QTY * T_POS_DET.TPOSD_PRC) as TPOS_TOTALAMT')
            )
            ->join('M_CUS', 'M_CUS.MCUS_CUSCD', '=', 'T_POS.TPOS_CUSTCD')
            ->join('T_POS_DET', 'T_POS_DET.TPOSH_ID', '=', 'T_POS.id')
            ->groupBy(
                'T_POS.TPOS_DOCNO', 
                'T_POS.TPOS_CUSTCD',
                'T_POS.TPOS_PAY',
                'M_CUS.MCUS_CUSNM', 
                'M_CUS.MCUS_CURCD',
                'T_POS.created_at'
            )
            ->first();

        return Pdf::loadView(
            'pdf.struk', 
            [
                'header' => $RSCG,
                'data' => $data,
                'details' => T_POS_DET::on($conn)
                    ->where('TPOSH_ID', $data->id)
                    ->join('M_ITM', 'M_ITM.MITM_ITMCD', '=', 'T_POS_DET.TPOSD_ITMCD')
                    ->get(),
                'subtotal' => T_POS_DET::on($conn)
                    ->where('TPOSH_ID', $data->id)
                    ->sum(DB::raw('TPOSD_QTY * TPOSD_PRC')),
                'diskon' => $request->diskon ?? 0,
                'bayar' => $request->bayar ?? 0
            ]
        )->stream('struk.pdf');
    }
}
