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

use App\Traits\LocationTraits;
use App\Traits\gencodeTraits;

class ServiceOprController extends Controller
{
    use LocationTraits, gencodeTraits;
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
        $checkOnlyWithFix = array_filter($request->data, function ($f) {
            return isset($f['listFixDet']);
        });

        $hasil = [];
        foreach ($checkOnlyWithFix as $key => $value) {
            T_SRV_DET::on($this->dedicatedConnection)->where('id', $value['id'])->update([
                'TSRVD_FLGSTS' => $value['TSRVD_FLGSTS'],
                'TSRVD_REMARK' => $value['TSRVD_REMARK'],
                'TSRVD_LOC' => $value['TSRVD_LOC']
            ]);

            if ($value['opr'] && count($value['opr']) > 0) {
                foreach ($value['opr'] as $keyOpr => $valueOpr) {
                    $this->saveGencode(new Request([
                        'data' => [
                            [
                                'MGECD_CODE' => "SRV_OPR_TYPE_{$this->dedicatedConnection}_{$value['id']}",
                                'MGECD_VALUE' => $valueOpr['OPRTYPE'],
                                'MGECD_DESC' => $valueOpr['OPRNAME'],
                                'MGECD_ACTIVE' => 1
                            ]
                        ]
                    ]));
                }
            }

            if ($value['type'] && count($value['type']) > 0) {
                foreach ($value['type'] as $keyType => $valueType) {
                    $this->saveGencode(new Request([
                        'data' => [
                            [
                                'MGECD_CODE' => "SRV_TYPE_{$this->dedicatedConnection}_{$value['id']}",
                                'MGECD_VALUE' => $valueType['OPRNAME'],
                                'MGECD_DESC' => '-',
                                'MGECD_ACTIVE' => 1
                            ]
                        ]
                    ]));
                }
            }

            foreach ($value['listFixDet'] as $key => $valueDet) {
                $hasil[] = T_SRV_FIXDET::on($this->dedicatedConnection)->updateOrCreate([
                    'TSRVD_ID' => $value['id'],
                    'TSRVF_ITMCD' => $valueDet['TSRVF_ITMCD'],
                ], [
                    'TSRVD_ID' => $value['id'],
                    'TSRVF_ITMCD' => $valueDet['TSRVF_ITMCD'],
                    'TSRVF_PRC' => $valueDet['TSRVF_PRC'],
                    'TSRVF_QTY' => $valueDet['TSRVF_QTY'],
                    'TSRVF_BC' => $valueDet['TSRVF_BC']
                ]);
            }
        }

        return ['msg' => 'Success', 'data' => $hasil];
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

    public function search(Request $request)
    {
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

        // return $request->allFixed;

        $hasil = [];
        foreach ($head as $key => $value) {
            $getDet = T_SRV_DET::on($this->dedicatedConnection)
                ->with([
                    'listFixDet' => function ($j) use ($request) {
                        $j->select(
                            '*',
                            DB::raw('TSRVF_QTY * TSRVF_PRC as SUBTOT_AMT'),
                            DB::raw("(
                            SELECT COALESCE(SUM(CITRN_ITMQT),0) AS STOCK
                            FROM C_ITRN
                            WHERE CITRN_ITMCD = TSRVF_ITMCD
                            AND CITRN_LOCCD = 'WH-SRV'
                        ) as STOCK_BENGKEL"),
                            DB::raw('1 as SAVED_DATA')
                        );
                        $j->join('M_ITM', 'MITM_ITMCD', 'TSRVF_ITMCD');
                        if (($request->has('allFixed') && $request->allFixed == 1)) {
                            $j->where('TSRVF_ISCONF', 0);
                        }
                    }
                ])
                ->where('TSRVH_ID', $value['id'])
                ->get()
                ->toArray();

            $checkDataFlagApproved = array_filter($getDet, function ($f) {
                return $f['TSRVD_FLGSTS'] === 2;
            });

            $listPartReq = [];
            foreach ($getDet as $keyDet => $valueDet) {
                $getListOPR = [];
                $IDCode = "SRV_OPR_TYPE_{$this->dedicatedConnection}_{$valueDet['id']}";
                foreach ($this->getGencode(base64_encode($IDCode)) as $key => $valueGenCode) {
                    $getListOPR[] = [
                        'OPRTYPE' => $valueGenCode['MGECD_VALUE'],
                        'OPRNAME' => $valueGenCode['MGECD_DESC'],
                    ];
                }

                $getListType = [];
                $IDCodeType = "SRV_TYPE_{$this->dedicatedConnection}_{$valueDet['id']}";
                foreach ($this->getGencode(base64_encode($IDCodeType)) as $key => $valueGenCode) {
                    $getListType[] = [
                        'OPRNAME' => $valueGenCode['MGECD_VALUE'],
                    ];
                }

                $listPartReq[] = array_merge(
                    $valueDet,
                    [
                        'partReq' => T_LOC_REQ::on($this->dedicatedConnection)
                            ->where('TLOCREQ_DOCNO', $value['SRVH_DOCNO'] . '-' . $valueDet['TSRVD_LINE'])
                            ->get()
                            ->toArray(),
                        'opr' => $getListOPR,
                        'type' => $getListType
                    ]
                );
            }

            $getUnresolve = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->where('TSRVD_FLGSTS', count($checkDataFlagApproved) > 0 ? 2 : 0)->get()->toArray();
            $getResolve = T_SRV_DET::on($this->dedicatedConnection)->where('TSRVH_ID', $value['id'])->where('TSRVD_FLGSTS', count($checkDataFlagApproved) > 0 ? 3 : 1)->get()->toArray();
            $hasil[] = array_merge($value, ['detail' => $listPartReq, 'unresolve' => $getUnresolve, 'resolve' => $getResolve]);
        }

        return ['data' => $hasil];
    }

    function saveTransferLocDraft(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'TLOCREQ_DOCNO' => 'required',
            'TLOCREQ_FRLOC' => 'required',
            'TLOCREQ_TOLOC' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        // If add new item, ask manager again & customer again
        if ($request->has('add_items') && $request->add_items == 1) {
            $splitID = explode('-', $request->TLOCREQ_DOCNO);
            $getDoc = $splitID[0];
            $getLine = $splitID[1];

            $cekHead = T_SRV_HEAD::on($this->dedicatedConnection)->where('SRVH_DOCNO', $getDoc)->first();
            if (!empty($cekHead)) {
                $getDetailID = T_SRV_DET::on($this->dedicatedConnection)
                    ->where('TSRVH_ID', $cekHead->id)
                    ->where('TSRVD_LINE', $getLine)
                    ->first();

                if (!empty($getDetailID)) {
                    T_SRV_DET::on($this->dedicatedConnection)->where('id', $getDetailID->id)->update([
                        'TSRVD_FLGSTS' => 0,
                        // 'TSRVD_REMARK' => $getDetailID->TSRVD_REMARK. ' - Additional items.'
                    ]);

                    $hasil = [];
                    foreach ($request->detail as $key => $valueDet) {
                        if ($valueDet['SAVED_DATA'] == 0) {
                            $hasil[] = T_SRV_FIXDET::on($this->dedicatedConnection)->updateOrCreate([
                                'TSRVD_ID' => $getDetailID->id,
                                'TSRVF_ITMCD' => $valueDet['TLOCREQ_ITMCD'],
                            ], [
                                'TSRVD_ID' => $getDetailID->id,
                                'TSRVF_ITMCD' => $valueDet['TLOCREQ_ITMCD'],
                                'TSRVF_PRC' => $valueDet['TLOCREQ_PRC'],
                                'TSRVF_QTY' => $valueDet['TLOCREQ_QTY'],
                                'TSRVF_BC' => $valueDet['TSRVF_BC']
                            ]);
                        }
                    }

                    return ['msg' => 'OK', 'DATA' => $hasil];
                }
            }
        }

        $create = [];
        foreach ($request->detail as $key => $value) {
            $create[] = T_LOC_REQ::on($this->dedicatedConnection)->create([
                'TLOCREQ_DOCNO' => $request->TLOCREQ_DOCNO,
                'TLOCREQ_ITMCD' => $value['TLOCREQ_ITMCD'],
                'TLOCREQ_QTY' => $value['TLOCREQ_QTY'],
                'TLOCREQ_FRLOC' => $request->TLOCREQ_FRLOC,
                'TLOCREQ_TOLOC' => $request->TLOCREQ_TOLOC,
                'TLOCREQ_ISREP' => 0
            ]);

            if ($value['TLOCREQ_ISREP'] == 1) {
                $create[] = T_LOC_REQ::on($this->dedicatedConnection)->create([
                    'TLOCREQ_DOCNO' => $request->TLOCREQ_DOCNO,
                    'TLOCREQ_ITMCD' => $value['TLOCREQ_ITMCD'],
                    'TLOCREQ_QTY' => $value['TLOCREQ_QTY'],
                    'TLOCREQ_FRLOC' => $request->TLOCREQ_TOLOC,
                    'TLOCREQ_TOLOC' => $request->TLOCREQ_FRLOC,
                    'TLOCREQ_ISREP' => $value['TLOCREQ_ISREP']
                ]);
            }
        }

        return ['msg' => 'OK', 'DATA' => $create];
    }
}
