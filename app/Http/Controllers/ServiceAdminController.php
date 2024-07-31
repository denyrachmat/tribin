<?php

namespace App\Http\Controllers;

use App\Models\T_SRV_FIXDET;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\File;
use Illuminate\Support\Facades\Storage;
use App\Models\CompanyGroup;

use App\Models\T_SRV_HEAD;
use App\Models\T_SRV_DET;
use App\Models\T_LOC_REQ;

use App\Traits\LocationTraits;

class ServiceAdminController extends Controller
{
    use LocationTraits;
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
        return view('tribinapp_layouts', ['routeApp' => 'services']);
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
            'detail.*.TSRVD_QTY' => 'required',
            'detail.*.TSRVD_PHOTO' => 'required'
        ], [
            'header.SRVH_ISSDT.required' => 'Issue Date cannot be null !',
            'header.SRVH_CUSCD.required' => 'Customer cannot be null !',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        $cekHariIni = T_SRV_HEAD::on($this->dedicatedConnection)->whereBetween('created_at', [date('y-m-d 00:00:00'), date('y-m-d 23:59:59')])->first();
        $IDSPK = 'JAT/SRV/' . date('y/m/d') . '/' . (empty($cekHariIni) ? '0001' : sprintf('%04d', (int) substr($cekHariIni->SRVH_DOCNO, -3) + 1));

        $headerStore = T_SRV_HEAD::on($this->dedicatedConnection)->updateOrCreate([
            'SRVH_DOCNO' => $IDSPK
        ], [
            'SRVH_DOCNO' => $IDSPK,
            'SRVH_CUSCD' => $request->header['SRVH_CUSCD'],
            'SRVH_BRANCH' => Auth::user()->branch,
            'SRVH_ISSDT' => $request->header['SRVH_ISSDT'],
            'created_by' => Auth::user()->nick_name,
            'SRVH_ISINT' => $request->header['SRVH_ISINT'],
        ]);

        $det = [];
        foreach ($request->detail as $key => $value) {
            ini_set('max_execution_time', '300');
            // $nama_file = $req->file->hashName();
            $base64_str = substr($value['TSRVD_PHOTO'], strpos($value['TSRVD_PHOTO'], ",") + 1);

            //decode base64 string
            $base64_image = $base64_str; // your base64 encoded
            @list($type, $file_data) = explode(';', $base64_image);
            @list(, $file_data) = explode(',', $file_data);
            $imageName = $headerStore->id . '/photo_service_' . date('Ymd_his') . '.' . 'jpg';
            Storage::put($imageName, base64_decode($file_data));

            $det[] = T_SRV_DET::on($this->dedicatedConnection)->updateOrCreate([
                'TSRVH_ID' => $headerStore->id,
            ], [
                'TSRVH_ID' => $headerStore->id,
                'TSRVD_ITMCD' => $value['TSRVD_ITMCD'],
                'TSRVD_LINE' => $value['TSRVD_LINE'],
                'TSRVD_CUSTRMK' => $value['TSRVD_CUSTRMK'],
                'TSRVD_QTY' => $value['TSRVD_QTY'],
                'TSRVD_PHOTO' => public_path($imageName),
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
        T_SRV_HEAD::on($this->dedicatedConnection)->where('SRVH_DOCNO', base64_decode($id))
            ->update($request->all());

        return ['msg' => 'Data has been updated'];
    }

    public function updateByDet(Request $request, string $id)
    {
        if ($request->has('TSRVD_FLGSTS') && $request->TSRVD_FLGSTS === 3) {
            $listDet = T_SRV_FIXDET::on($this->dedicatedConnection)
                ->join('M_ITM', 'MITM_ITMCD', 'TSRVF_ITMCD')
                ->where('MITM_ITMTYPE', '<>', 3)
                ->where('TSRVD_ID', base64_decode($id))
                ->get();

            $listEmptyStock = [];
            foreach ($listDet as $key => $value) {
                $cekStockonService = DB::connection($this->dedicatedConnection)
                    ->table('V_STOCK_CHECK')
                    ->where('CITRN_ITMCD', $value['TSRVF_ITMCD'])
                    ->where('CITRN_LOCCD', 'WH-SRV')
                    ->first();

                if (empty($cekStockonService) || (!empty($cekStockonService) && $cekStockonService->CITRN_ITMQT < $value['TSRVF_QTY'])) {
                    $listEmptyStock[] = 'Stock Item ' . $value['TSRVF_ITMCD'] . ' on service location is empty or not enough, please request part to warehouse!';
                }
            }

            if (count($listEmptyStock) > 0) {
                return response([
                    'STOK' => $listEmptyStock
                ], 406);
            }
        }

        T_SRV_DET::on($this->dedicatedConnection)->where('id', base64_decode($id))
            ->update($request->all());

        return ['msg' => 'Data has been updated'];
    }

    public function updateDetByIDHead(Request $request, string $id)
    {
        $dataHead = T_SRV_HEAD::on($this->dedicatedConnection)
            ->where('id', base64_decode($id))
            ->first();

        $dataDet = T_SRV_DET::on($this->dedicatedConnection)
            ->where('TSRVH_ID', base64_decode($id))
            ->get();

        $listForDODet = [];
        foreach ($dataDet as $key => $value) {
            $this->updateByDet(new Request($request->all()), base64_encode($value->id));

            if ($request->has('TSRVD_FLGSTS') && $request->TSRVD_FLGSTS == 1) {
                $getFixedDet = T_SRV_FIXDET::on($this->dedicatedConnection)
                    ->where('TSRVD_ID', $value->id)
                    ->get();

                foreach ($getFixedDet as $key => $valueFixedDet) {
                    $listForDODet[] = [
                        'TSLODETA_ITMCD' => $valueFixedDet->TSRVF_ITMCD,
                        'BALQT' => $valueFixedDet->TSRVF_QTY,
                        'TSLODETA_PRC' => $valueFixedDet->TSRVF_PRC,
                        'TDLVORDDETA_ITMCD_ACT' => $valueFixedDet->TSRVF_ITMCD,
                    ];
                }
            }
        }

        $postToDelivery = [];
        if ($request->has('TSRVD_FLGSTS') && $request->TSRVD_FLGSTS == 1 && $dataHead->SRVH_ISINT == 1) {
            $createReq = new Request([
                'TDLVORD_CUSCD' => $dataHead->SRVH_CUSCD,
                'TDLVORD_ISSUDT' => $dataHead->SRVH_ISSDT,
                'TDLVORD_REMARK' => 'SERVICE-INTERNAL',
                'SO_DET' => $listForDODet,
            ]);

            $postToDelivery = app('App\Http\Controllers\DeliveryController')->save($createReq);
        }

        return ['msg' => 'Data has been updated', 'dataHead' => $dataHead, 'data' => $postToDelivery];
    }

    public function confirmDoneItem(Request $request, string $id)
    {
        $hasil = T_SRV_FIXDET::on($this->dedicatedConnection)->where('id', base64_decode($id));
        if ((clone $hasil)->count() > 0) {
            $cekDataOS = (clone $hasil)->where('TSRVF_ISCONF', 0)->count();

            if ($cekDataOS > 0) {
                $cekData = [];
                foreach ($request->data as $key => $value) {
                    if ($value['STOCK'] > 0 && (int) $value['TSRVF_QTY'] > 0 && $value['STOCK'] >= (int) $value['TSRVF_QTY']) {
                        $cekOld = T_SRV_FIXDET::on($this->dedicatedConnection)->where('id', $value['id'])->where('TSRVF_ISCONF', 0)->first();
                        $cekData[] = ['value' => $value, 'check' => $cekOld];
                        $createdNew = T_SRV_FIXDET::on($this->dedicatedConnection)->create($cekOld->toArray());
                        T_SRV_FIXDET::on($this->dedicatedConnection)->where('id', $createdNew->id)->update([
                            'TSRVF_ISCONF' => 1
                        ]);

                        T_SRV_FIXDET::on($this->dedicatedConnection)->where('id', $value['id'])->delete();
                    }
                }

                return response(['msg' => 'Some item has been updated !', 'data' => $cekData]);
            } else {
                $cekDataAll = (clone $hasil)->get()->toArray();
                $doc = T_SRV_HEAD::on($this->dedicatedConnection)->join('T_SRV_DET', 'T_SRV_HEAD.id', 'TSRVH_ID')
                    ->where('T_SRV_DET.id', base64_decode($id))
                    ->first();

                foreach ($cekDataAll as $key => $valueDet) {
                    // Move Location from service to after service
                    $this->transferLoc(new Request([
                        'LOCFROM' => 'WH-SRV',
                        'LOCTO' => 'WH-SRV-DONE',
                        'ITMCD' => $valueDet['TSRVF_ITMCD'],
                        'QTY' => $valueDet['TSRVF_QTY'],
                        'DOC' => "{$doc->SRVH_DOCNO}-{base64_decode($id)}"
                    ]));
                }

                // Set to done
                (clone $hasil)->update([
                    'TSRVD_FLGSTS' => 3
                ]);

                return response(['msg' => 'All fixed item has been submited']);
            }
        } else {
            return response()->json('ID Not found, please check again !!', 406);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $getData = T_SRV_HEAD::on($this->dedicatedConnection)->where('SRVH_DOCNO', base64_decode($id))->first();

        if (!empty($getData)) {
            T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $getData->id)->delete();
            T_SRV_HEAD::on($this->dedicatedConnection)->where('SRVH_DOCNO', base64_decode($id))->delete();

            return ['msg' => 'Data has been deleted'];
        }

        return ['msg' => 'Data cannot be found!, delete failed'];
    }

    public function search(Request $request)
    {
        $RSTemp = T_SRV_HEAD::on($this->dedicatedConnection)
            ->select(
                'T_SRV_HEAD.id',
                'T_SRV_HEAD.SRVH_DOCNO',
                'T_SRV_HEAD.SRVH_ISSDT',
                'MCUS_CUSNM',
                'MCUS_CUSCD',
                'MCUS_ADDR1',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'T_SRV_HEAD.created_at',
                'TSRVD_FLGSTS',
                'TQUO_QUOCD',
                DB::raw("CONCAT(T_SRV_HEAD.SRVH_DOCNO, ' - ', MCUS_CUSNM) AS LBLDATA"),
                DB::raw("SUM(TSRVF_PRC) AS TOTFIX")
            )
            ->leftjoin('T_SRV_DET', 'TSRVH_ID', 'T_SRV_HEAD.id')
            ->leftjoin('T_SRV_FIXDET', 'TSRVD_ID', 'T_SRV_DET.id')
            ->join('M_CUS', 'MCUS_CUSCD', 'SRVH_CUSCD')
            ->leftjoin('T_QUOHEAD', 'TQUO_SBJCT', 'like', DB::raw("CONCAT('%',SRVH_DOCNO, '%')"))
            ->groupBy(
                'T_SRV_HEAD.id',
                'T_SRV_HEAD.SRVH_DOCNO',
                'T_SRV_HEAD.SRVH_ISSDT',
                'MCUS_CUSNM',
                'MCUS_CUSCD',
                'MCUS_ADDR1',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'T_SRV_HEAD.created_at',
                'TSRVD_FLGSTS',
                'TQUO_QUOCD'
            )
            ->orderBy('created_at', 'desc');

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RSTemp->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        if ($request->has('onlyShowWoQuo') && $request->onlyShowWoQuo == true) {
            $RSTemp->whereNull('TQUO_QUOCD');
        }

        $head = $RSTemp->get()->toArray();

        $hasil = [];
        foreach ($head as $key => $value) {
            $getDet = T_SRV_DET::on($this->dedicatedConnection)
                ->with([
                    'listFixDet' => function ($j) {
                        $j->select('*', DB::raw('TSRVF_QTY * TSRVF_PRC as SUBTOT_AMT'));
                        $j->join('M_ITM', 'MITM_ITMCD', 'TSRVF_ITMCD');
                        $j->where('TSRVF_ISCONF', 1);
                    }
                ])
                ->where('TSRVH_ID', $value['id'])
                ->get()
                ->toArray();
            $getUnresolve = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->where('TSRVD_FLGSTS', 0)->get()->toArray();
            $getResolve = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->where('TSRVD_FLGSTS', 1)->get()->toArray();
            $hasil[] = array_merge($value, ['detail' => $getDet, 'unresolve' => $getUnresolve, 'resolve' => $getResolve]);
        }

        return ['data' => $hasil];
    }

    function numberToSentence($nilai)
    {
        $nilai = abs($nilai);
        $huruf = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
        $temp = "";
        if ($nilai < 12) {
            $temp = " " . $huruf[$nilai];
        } else if ($nilai < 20) {
            $temp = $this->numberToSentence($nilai - 10) . " Belas";
        } else if ($nilai < 100) {
            $temp = $this->numberToSentence($nilai / 10) . " Puluh" . $this->numberToSentence($nilai % 10);
        } else if ($nilai < 200) {
            $temp = " seratus" . $this->numberToSentence($nilai - 100);
        } else if ($nilai < 1000) {
            $temp = $this->numberToSentence($nilai / 100) . " Ratus" . $this->numberToSentence($nilai % 100);
        } else if ($nilai < 2000) {
            $temp = " seribu" . $this->numberToSentence($nilai - 1000);
        } else if ($nilai < 1000000) {
            $temp = $this->numberToSentence($nilai / 1000) . " Ribu" . $this->numberToSentence($nilai % 1000);
        } else if ($nilai < 1000000000) {
            $temp = $this->numberToSentence($nilai / 1000000) . " Juta" . $this->numberToSentence($nilai % 1000000);
        } else if ($nilai < 1000000000000) {
            $temp = $this->numberToSentence($nilai / 1000000000) . " Milyar" . $this->numberToSentence(fmod($nilai, 1000000000));
        } else if ($nilai < 1000000000000000) {
            $temp = $this->numberToSentence($nilai / 1000000000000) . " Trilyun" . $this->numberToSentence(fmod($nilai, 1000000000000));
        }
        return $temp;
    }

    public function printInvoicePDF($id)
    {
        $data = $this->search(new Request([
            'searchBy' => 'SRVH_DOCNO',
            'searchValue' => base64_decode($id)
        ]));

        $getCompGroups = CompanyGroup::where('connection', empty($conn) ? $this->dedicatedConnection : base64_decode($conn))->first();

        $total = 0;
        foreach ($data['data'] as $key => $value) {
            foreach ($value['detail'] as $key => $valueDet) {
                if (isset($valueDet['list_fix_det']) && count($valueDet['list_fix_det']) > 0) {
                    $total += array_sum(array_column($valueDet['list_fix_det'], 'SUBTOT_AMT'));
                }
            }
        }

        $pdf = Pdf::loadView('pdf.spkservice', [
            'data' => $data['data'],
            'total' => $total,
            'isPPN' => $getCompGroups->flg_ppn,
            'total' => $total,
            'ppn' => ($total * 0.11),
            // 'terbilang' => $this->numberToSentence($total + ($total * 0.11)),
            'terbilang' => $this->numberToSentence($getCompGroups->flg_ppn == 1 ? $total + ($total * 0.11) : $total),
            'header' => 'JAYA ABADI TEKNIK',
            'subHeader' => 'SALES & RENTAL DIESEL GENSET - FORKLIF - TRAVOLAS - TRUK',
            'addr' => 'Jl. Tembus Terminal No. 17 KM. 12 Alang-alang Lebar, Palembang-Indonesia'
        ]);

        return $pdf->stream('invoice.pdf');
    }

    public function printPartRequestPDF($id)
    {
        $data = T_LOC_REQ::on($this->dedicatedConnection)
            ->where('TLOCREQ_DOCNO', base64_decode($id))
            ->where('TLOCREQ_ISREP', 0)
            ->join('M_ITM', 'MITM_ITMCD', 'TLOCREQ_ITMCD')
            ->get()
            ->toArray();

        $pdf = Pdf::loadView('pdf.partRequestForm', [
            'data' => $data,
            'header' => 'JAYA ABADI TEKNIK',
            'subHeader' => 'SALES & RENTAL DIESEL GENSET - FORKLIF - TRAVOLAS - TRUK',
            'addr' => 'Jl. Tembus Terminal No. 17 KM. 12 Alang-alang Lebar, Palembang-Indonesia'
        ]);

        return $pdf->stream('part-request.pdf');
    }

    public function showListUnapproveMgr()
    {
        $unapproveService = T_SRV_HEAD::on($this->dedicatedConnection)
            ->select('T_SRV_HEAD.*', 'M_CUS.MCUS_CUSNM')
            ->join('T_SRV_DET', 'TSRVH_ID', 'T_SRV_HEAD.id')
            ->join('M_CUS', 'MCUS_CUSCD', 'SRVH_CUSCD')
            ->where('TSRVD_FLGSTS', 5)
            ->get();

        return $unapproveService;
    }

    public function viewUnapproveDetail($id)
    {
        $head = T_SRV_HEAD::on($this->dedicatedConnection)->where('SRVH_DOCNO', base64_decode($id))->first();
        $unapproveService = T_SRV_DET::on($this->dedicatedConnection)
            ->where('TSRVH_ID', $head->id)
            ->with('listFixDet')
            ->get()
            ->toArray();

        return $unapproveService;
    }

    public function viewUnapproveMgr()
    {
        return view('tribinapp_layouts', ['routeApp' => 'servicesApproval']);
    }
}
