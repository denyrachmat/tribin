<?php

namespace App\Http\Controllers;

use App\Models\T_SLODETA;
use Illuminate\Http\Request;
use App\Models\T_DLVORDHEAD;
use App\Models\T_DLVORDDETA;
use App\Models\T_QUOHEAD;
use App\Models\T_SLOHEAD;
use App\Models\User;
use App\Models\M_BRANCH;
use Illuminate\Support\Facades\Crypt;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Models\COMPANY_BRANCH;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Codedge\Fpdf\Fpdf\Fpdf;
use App\Models\T_DLVSJDETA;
use App\Models\CompanyGroup;
use App\Models\T_DLVPAYDETA;

class InvoiceController extends Controller
{
    protected $dedicatedConnection;

    protected $fpdf;
    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
        $this->fpdf = new Fpdf;
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
        $validator = Validator::make($request->all(), [
            'TDLVSJDETA_DLVCD' => 'required',
            'TDLVSJDETA_TYPE' => 'required',
            'TDLVSJDETA_CONDGRP' => 'required',
            // 'TDLVSJDETA_STARTDT' => 'required|date',
            // 'TDLVSJDETA_ENDDT' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        // T_DLVORDHEAD::on($this->dedicatedConnection)->where('TDLVORD_DLVCD', 'LIKE', $request->TDLVSJDETA_DLVCD . '%')->update([
        //     'TDLVORD_CONDGRP' => count($request->condition) > 0 ? $request->condition[0]['MCOND_GRPNM'] : ''
        // ]);

        $updatedRecordsHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->where('TDLVORD_DLVCD', 'LIKE', $request->TDLVSJDETA_DLVCD . '%')
            ->tap(function ($query) use ($request) {
                $query->update([
                    'TDLVORD_CONDGRP' => count($request->condition) > 0 ? $request->condition[0]['MCOND_GRPNM'] : ''
                ]);
            })
            ->get();

        foreach ($updatedRecordsHeader as $key => $valueHead) {

            T_DLVSJDETA::on($this->dedicatedConnection)->updateOrCreate([
                'TDLVSJDETA_DLVCD' => $valueHead->TDLVORD_DLVCD,
            ], [
                'TDLVSJDETA_DLVCD' => $valueHead->TDLVORD_DLVCD,
                'TDLVSJDETA_TYPE' => $request->TDLVSJDETA_TYPE,
                'TDLVSJDETA_CONDGRP' => $request->TDLVSJDETA_CONDGRP,
                'TDLVSJDETA_STARTDT' => $request->TDLVSJDETA_STARTDT,
                'TDLVSJDETA_ENDDT' => $request->TDLVSJDETA_ENDDT,
                'TDLVSJDETA_COND_GRP' => $request->has('condition') && !empty($request->condition) ? $request->condition[0]['MCOND_GRPNM'] : '',
                'TDLVSJDETA_ISSPLITSJ' => $request->TDLVSJDETA_ISSPLITSJ
            ]);

            T_DLVPAYDETA::on($this->dedicatedConnection)->where('TDLVPAYDETA_DLVCD', $valueHead->TDLVORD_DLVCD)->delete();

            foreach ($request->payment as $key => $valuePays) {
                $dataOrd = explode('/',$valueHead->TDLVORD_DLVCD);
                T_DLVPAYDETA::on($this->dedicatedConnection)->updateOrCreate([
                    'TDLVPAYDETA_DLVCD' => count($dataOrd) > 0 ? $dataOrd[0] : $valueHead->TDLVORD_DLVCD,
                    'TDLVPAYDETA_IDPAY' => $valuePays['TDLVPAYDETA_IDPAY'],
                ]);
            }
        }

        return ['msg' => 'SJ Detail Saved !'];
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
        $data = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                DB::raw("CONCAT(SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1), ' (', MCUS_CUSNM, ' - ', TQUO_ATTN, ')') AS LABEL"),
                'TDLVORD_INVCD',
                DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1) as TDLVORD_DLVCD"),
                // 'TDLVORD_DLVCD',
                DB::raw('max(TDLVORD_ISSUDT) as TDLVORD_ISSUDT'),
                'TDLVORD_INVCD',
                'TDLVORD_REC_NO',
                'TDLVORDDETA_SLOCD',
                'TDLVORD_CUSCD',
                'MCUS_CUSNM',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'MCUS_ADDR1',
                'TSLO_QUOCD',
                'TSLO_POCD',
                'TQUO_SBJCT',
                'TQUO_ATTN',
                'TDLVORD_CONDGRP',
                'TDLVORD_REMARK',
                'TDLVOR_ISSPLITSJ',
                'TDLVORD_TYPE',
            )
            ->with([
                'dlvacc',
                'payment' => function ($f) {
                    $f->select(
                        '*',
                        DB::raw('branch_payment_accounts.id as TDLVPAYDETA_IDPAY'),
                        DB::raw("SUBSTRING_INDEX(TDLVPAYDETA_DLVCD, '/', 1) as TDLVPAYDETA_DLVCD")
                    );
                },
                'condition' => function ($f) {
                    $f->leftjoin('M_CONDITIONS', 'MCOND_ID', 'M_CONDITIONS.id');
                },
                'spk' => function ($f) {
                    $f->where('CSPK_PIC_AS', 'DRIVER');
                }
            ])
            ->join('T_DLVORDDETA', DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"))
            ->join('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_SLOHEAD', 'TSLO_SLOCD', 'TDLVORDDETA_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TQUO_QUOCD', 'TSLO_QUOCD')
            ->where(DB::raw('RTRIM(TDLVORDDETA_ITMCD_ACT)'), '<>', '')
            ->groupBy(
                DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"),
                // 'TDLVORD_DLVCD',
                DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"),
                DB::raw("CONCAT(SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1), ' (', MCUS_CUSNM, ' - ', TQUO_ATTN, ')')"),
                'TDLVORD_INVCD',
                'TDLVORD_REC_NO',
                'TDLVORD_CUSCD',
                'TDLVORDDETA_SLOCD',
                'MCUS_CUSNM',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'MCUS_ADDR1',
                'TSLO_QUOCD',
                'TSLO_POCD',
                'TQUO_SBJCT',
                'TQUO_ATTN',
                'TDLVORD_CONDGRP',
                'TDLVORD_REMARK',
                'TDLVOR_ISSPLITSJ',
                'TDLVORD_TYPE',
            )
            ->orderBy('T_DLVORDHEAD.created_at', 'desc');

        if (!empty($request->searchBy)) {
            $data->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        $hasil = [];
        $listData = $data->get()->map(function ($dlv) {
            $dlv->dlvsj = T_DLVSJDETA::on($this->dedicatedConnection)->where(DB::raw("SUBSTRING_INDEX(TDLVSJDETA_DLVCD, '/', 1)"), '=', $dlv->TDLVORD_DLVCD)->first();
            $dlv->dlvdet = T_DLVORDDETA::on($this->dedicatedConnection)->select(
                'T_DLVORDDETA.id',
                'T_DLVORDDETA.TDLVORDDETA_DLVCD',
                'T_DLVORDDETA.TDLVORDDETA_ITMCD',
                'T_DLVORDDETA.TDLVORDDETA_ITMCD_ACT',
                'T_DLVORDDETA.TDLVORDDETA_ITMQT',
                'T_DLVORDDETA.TDLVORDDETA_PRC',
                'M_ITM_GRP.MITM_ITMNM',
                'M_ITM_GRP.MITM_ITMNMREAL',
                'M_ITM.MITM_BRAND',
                'M_ITM.MITM_MODEL'
            )->groupBy(
                'T_DLVORDDETA.id',
                'T_DLVORDDETA.TDLVORDDETA_DLVCD',
                'T_DLVORDDETA.TDLVORDDETA_ITMCD',
                'T_DLVORDDETA.TDLVORDDETA_ITMCD_ACT',
                'T_DLVORDDETA.TDLVORDDETA_ITMQT',
                'T_DLVORDDETA.TDLVORDDETA_PRC',
                'M_ITM_GRP.MITM_ITMNM',
                'M_ITM_GRP.MITM_ITMNMREAL',
                'M_ITM.MITM_BRAND',
                'M_ITM.MITM_MODEL'
            )
                ->leftJoin("M_ITM_GRP", function ($join) {
                    $join->on('TDLVORDDETA_ITMCD', '=', 'MITM_ITMNM')
                        ->on('TDLVORDDETA_BRANCH', '=', 'M_ITM_GRP.MITM_BRANCH');
                })
                ->leftJoin("M_ITM", function ($join) {
                    $join->on('TDLVORDDETA_ITMCD_ACT', '=', 'MITM_ITMCD')
                        ->on('TDLVORDDETA_BRANCH', '=', 'M_ITM.MITM_BRANCH');
                })
                ->leftJoin(DB::raw("(SELECT SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1) as TDLVORD_DLVCD, TDLVORD_BRANCH FROM T_DLVORDHEAD) as TDLVORDHEAD_ALIAS"), function ($join) {
                    $join->on('T_DLVORDDETA.TDLVORDDETA_DLVCD', '=', 'TDLVORDHEAD_ALIAS.TDLVORD_DLVCD')
                        ->on('T_DLVORDDETA.TDLVORDDETA_BRANCH', '=', 'TDLVORDHEAD_ALIAS.TDLVORD_BRANCH');
                })
                ->where(DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"), '=', $dlv->TDLVORD_DLVCD)
                ->get();

            return $dlv;
        })->toArray();

        foreach ($listData as $key => $value) {
            $hasil[] = array_merge(
                $value,
                [
                    'sloDet' => T_SLODETA::on($this->dedicatedConnection)
                        ->where('TSLODETA_SLOCD', $value['TDLVORDDETA_SLOCD'])
                        ->join('M_USAGE', 'M_USAGE.id', 'TSLODETA_USAGE_DESCRIPTION')
                        ->get()
                ]
            );
        }

        return ['data' => $hasil];
    }

    public function printInvoice(Request $request)
    {
        $getCompGroups = CompanyGroup::where('connection', empty($conn) ? $this->dedicatedConnection : base64_decode($conn))->first();
        $RSCG = COMPANY_BRANCH::on(empty($conn) ? $this->dedicatedConnection : base64_decode($conn))->select('name', 'address', 'phone', 'fax', 'letter_head')
            ->where('connection', empty($conn) ? $this->dedicatedConnection : base64_decode($conn))
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $Subject = T_QUOHEAD::on($this->dedicatedConnection)
            ->where('TQUO_QUOCD', $request->TSLO_QUOCD)
            ->where('TQUO_BRANCH', Auth::user()->branch)
            ->first();

        $total = 0;
        $dlvDetParse = [];
        $cek = [];
        foreach ($request->dlvdet as $key => $value) {
            if ($request->TDLVORD_TYPE === 1) {
                $getSLOByItem = array_values(array_filter($request->sloDet, function ($f) use ($value) {
                    return $f['TSLODETA_ITMCD'] == $value['TDLVORDDETA_ITMCD'] && $f['TSLODETA_PRC'] == $value['TDLVORDDETA_PRC'];
                }));
            } else {
                // $getSLOByItem = $request->sloDet;
                $getSLOByItemX = json_decode(json_encode($this->search(new Request([
                    'searchBy' => 'TDLVORD_INVCD',
                    'searchValue' => $request->TDLVORD_INVCD
                ]))['data']), true);

                $getSLOByItemxx = $getSLOByItemX[count($getSLOByItemX) - 1];
                $getSLOByItem = array_values(array_filter($getSLOByItemxx['sloDet'], function ($f) use ($value) {
                    return $f['TSLODETA_ITMCD'] == $value['TDLVORDDETA_ITMCD'];
                }));
            }
            // return $getSLOByItem;
            $cek[] = $getSLOByItem;
            // return $getSLOByItem[0];
            if (count($getSLOByItem) > 0) {
                if ($request->TDLVORD_TYPE === 1) {
                    $getTotalPrice = ($getSLOByItem[0]['TSLODETA_PRC'] * $value['TDLVORDDETA_ITMQT']) + $getSLOByItem[0]['TSLODETA_OPRPRC'] + $getSLOByItem[0]['TSLODETA_MOBDEMOB'];
                } else {
                    $getTotalPrice = ($value['TDLVORDDETA_ITMQT'] * $value['TDLVORDDETA_PRC']) + $getSLOByItem[0]['TSLODETA_OPRPRC'] + $getSLOByItem[0]['TSLODETA_MOBDEMOB'];
                }

                $total += $getTotalPrice;
                $dlvDetParse[] = array_merge($value, ['dataSLO' => $getSLOByItem[0], 'totPRCSLO' => $getTotalPrice]);
            }
        }

        $ppn = $total * 0.11;

        $pdf = Pdf::loadView(
            'pdf.invoiceDlv',
            array_merge(
                [
                    'header' => $RSCG->letter_head,
                    'subHeader' => 'SALES & RENTAL DIESEL GENSET - FORKLIF - TRAVOLAS - TRUK',
                    'addr' => $RSCG->address,
                    'telp' => $RSCG->phone,
                    'isPPN' => $getCompGroups->flg_ppn,
                    'total' => $total,
                    'ppn' => $ppn,
                    'dlvDetNew' => $dlvDetParse,
                    'payment' => $request->payment,
                    'terbilang' => $this->numberToSentence($getCompGroups->flg_ppn == 1 ? $total + $ppn : $total),
                    'subject' => $Subject
                ],
                $request->all()
            )
        );

        return base64_encode($pdf->output());
    }

    public function numberToSentence($nilai)
    {
        $nilai = round(abs($nilai));
        $huruf = ["", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas"];
        $temp = "";

        if ($nilai < 12) {
            $temp = " " . $huruf[$nilai];
        } else if ($nilai < 20) {
            $temp = $this->numberToSentence($nilai - 10) . " belas";
        } else if ($nilai < 100) {
            $temp = $this->numberToSentence(floor($nilai / 10)) . " puluh" . $this->numberToSentence($nilai % 10);
        } else if ($nilai < 200) {
            $temp = " seratus" . $this->numberToSentence($nilai - 100);
        } else if ($nilai < 1000) {
            $temp = $this->numberToSentence(floor($nilai / 100)) . " ratus" . $this->numberToSentence($nilai % 100);
        } else if ($nilai < 2000) {
            $temp = " seribu" . $this->numberToSentence($nilai - 1000);
        } else if ($nilai < 1000000) {
            $temp = $this->numberToSentence(floor($nilai / 1000)) . " ribu" . $this->numberToSentence($nilai % 1000);
        } else if ($nilai < 1000000000) {
            $temp = $this->numberToSentence(floor($nilai / 1000000)) . " juta" . $this->numberToSentence($nilai % 1000000);
        } else if ($nilai < 1000000000000) {
            $temp = $this->numberToSentence(floor($nilai / 1000000000)) . " milyar" . $this->numberToSentence($nilai % 1000000000);
        } else if ($nilai < 1000000000000000) {
            $temp = $this->numberToSentence(floor($nilai / 1000000000000)) . " trilyun" . $this->numberToSentence($nilai % 1000000000000);
        }

        return $temp;
    }

    public function printKwitansi($doc)
    {
        $doc = base64_decode($doc);
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select('TDLVORD_ISSUDT', 'MCUS_CUSNM', 'MCUS_ADDR1', 'TDLVORD_REMARK', 'MCUS_TELNO', 'TDLVORD_INVCD', 'TDLVORD_LINE', 'TDLVORD_REC_NO')
            ->leftJoin('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->with('condition')
            ->where(DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), $doc)
            ->where('TDLVORD_BRANCH', Auth::user()->branch)
            ->first();

        $RSDetail = T_DLVORDDETA::on($this->dedicatedConnection)->select(
            'TDLVORDDETA_ITMCD',
            'TDLVORDDETA_ITMQT',
            'MITM_ITMNM',
            'MITM_STKUOM',
            'created_by',
            'TDLVORDDETA_SLOCD',
            'MITM_ITMNM',
            'MITM_MODEL',
            'MITM_BRAND',
            'TDLVORDDETA_PRC'
        )
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TDLVORDDETA_ITMCD', '=', 'MITM_ITMCD')->on('TDLVORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->where(DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"), $doc)
            ->where('TDLVORDDETA_BRANCH', Auth::user()->branch)
            ->get();

        $Company = COMPANY_BRANCH::on($this->dedicatedConnection)->select(
            'name',
            'COMPANY_BRANCHES.address',
            'COMPANY_BRANCHES.phone',
            'invoice_letter_id'
        )
            ->where('connection', $this->dedicatedConnection)
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $Branch = M_BRANCH::select('MBRANCH_NM')->where('MBRANCH_CD', Auth::user()->branch)->first();

        $Dibuat = NULL;
        $Attn = NULL;
        $Subject = NULL;

        $Usage = NULL;
        $HargaSewa = NULL;
        foreach ($RSDetail as $r) {
            $Dibuat = User::where('nick_name', $r->created_by)->select('name')->first();
            $Attn = T_SLOHEAD::on($this->dedicatedConnection)->select('TSLO_ATTN', 'TSLO_QUOCD', 'TSLO_POCD', 'TSLO_ADDRESS_DESCRIPTION')
                ->where('TSLO_SLOCD', $r->TDLVORDDETA_SLOCD)
                ->where('TSLO_BRANCH', Auth::user()->branch)
                ->first();

            if (!empty($Attn)) {
                $Subject = T_QUOHEAD::on($this->dedicatedConnection)
                    ->where('TQUO_QUOCD', $Attn->TSLO_QUOCD)
                    ->where('TQUO_BRANCH', Auth::user()->branch)
                    ->first();
            }

            break;
        }

        $totalHargaSewa = 0;
        foreach ($RSDetail as $r) {
            $Usage = T_SLODETA::on($this->dedicatedConnection)->select(
                'TSLODETA_USAGE_DESCRIPTION',
                'TSLODETA_PRC',
                'TSLODETA_OPRPRC',
                'TSLODETA_MOBDEMOB',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO'
            )
                ->join('M_ITM_GRP', 'TSLODETA_ITMCD', 'MITM_ITMNM')
                ->where('TSLODETA_SLOCD', $r->TDLVORDDETA_SLOCD)
                ->where('TSLODETA_ITMCD', $r->TDLVORDDETA_ITMCD)
                ->where('TSLODETA_BRANCH', Auth::user()->branch)
                ->where('MITM_ITMTYPE', 1)
                ->first();

            if (!empty($Usage)) {
                $HargaSewa = ($r->TDLVORDDETA_PRC * $r->TDLVORDDETA_ITMQT) + $Usage->TSLODETA_OPRPRC + $Usage->TSLODETA_MOBDEMOB;
                $PeriodFrom = date_format(date_create($Usage->TSLODETA_PERIOD_FR), 'd-M-Y');
                $PeriodTo = date_format(date_create($Usage->TSLODETA_PERIOD_TO), 'd-M-Y');
            } else {
                $HargaSewa = 0;
                $PeriodFrom = '';
                $PeriodTo = '';
            }

            $totalHargaSewa += $HargaSewa;
            $DOIssuDate = date_format(date_create($RSHeader->TDLVORD_ISSUDT), 'd-M-Y');
        }

        if (in_array($this->dedicatedConnection, ['connect_jos_retail', 'connect_jos_service'])) {
            $PPNAmount = 0;
        } else {
            $PPNAmount = $totalHargaSewa * 11 / 100;
        }

        $subjek = !empty($Subject) ? ucwords(trim(str_replace('penawaran', '', strtolower($Subject->TQUO_SBJCT)))) : '';
        $terbilang = ucwords(rtrim($this->numberToSentence($PPNAmount + $totalHargaSewa)));

        $this->fpdf->AddPage("P", 'A4');
        $this->fpdf->SetFont('Arial', 'B', 10);
        $this->fpdf->SetXY(7, 5);
        $this->fpdf->Cell(0, 8, $Company->name, 0, 0, 'L');
        $this->fpdf->SetXY(150, 5);
        $this->fpdf->Cell(7, 5, $RSHeader->TDLVORD_REC_NO, 0, 0, 'L');
        $this->fpdf->SetFont('Arial', '', 10);
        $this->fpdf->SetXY(7, 12);
        $this->fpdf->MultiCell(95, 4, $Company->address, 0, 'L');
        $this->fpdf->SetFont('Arial', 'B', 14);
        $this->fpdf->SetXY(7, 20);
        $this->fpdf->Cell(0, 8, 'K W I T A N S I', 0, 0, 'C');
        $this->fpdf->SetFont('Arial', '', 10);
        $this->fpdf->SetXY(7, 30);
        $this->fpdf->Cell(25, 5, 'Nomor Invoice', 0, 0, 'L');
        $this->fpdf->Cell(15, 5, ': ' . $RSHeader->TDLVORD_INVCD, 0, 0, 'L');
        // $this->fpdf->SetXY(150, 30);
        // $this->fpdf->Cell(25, 5, 'Proj. Location:', 0, 0, 'L');
        // $this->fpdf->Cell(15, 5, ': ' . $Subject->TQUO_PROJECT_LOCATION, 0, 0, 'L');
        $this->fpdf->SetXY(7, 35);
        $this->fpdf->Cell(195, 110, '', 1, 0, 'L');
        $this->fpdf->SetXY(10, 40);
        $this->fpdf->Cell(50, 5, 'Sudah terima dari', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, ': ' . $RSHeader->MCUS_CUSNM, 0, 0, 'L');
        $this->fpdf->Line(63, 46, 180, 46);
        $this->fpdf->SetXY(10, 50);
        $this->fpdf->Cell(50, 5, 'Alamat', 0, 0, 'L');
        $this->fpdf->Cell(2, 5, ':');
        $this->fpdf->MultiCell(138, 5, $RSHeader->MCUS_ADDR1);
        $this->fpdf->Line(63, $this->fpdf->GetY() + 2, 180, $this->fpdf->GetY() + 2);
        $Yfocus = $this->fpdf->GetY() + 5;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Terbilang', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, ': ' . $terbilang . ' Rupiah', 0, 0, 'L');
        $this->fpdf->Line(63, $Yfocus + 7, 180, $Yfocus + 7);

        $Yfocus += 10;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Untuk Pembayaran', 0, 0, 'L');
        $this->fpdf->Cell(2, 5, ':');
        $this->fpdf->MultiCell(138, 5, $subjek . ' Periode ' . $PeriodFrom . ' s/d ' . $PeriodTo);
        $Yfocus = $this->fpdf->GetY() + 5;
        $this->fpdf->Line(63, $Yfocus - 3, 180, $Yfocus - 3);

        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, '', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, ' Total', 0, 0, 'L');
        $this->fpdf->Cell(10, 5, ' : Rp. ', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, number_format($totalHargaSewa), 0, 0, 'R');
        $Yfocus += 5;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, '', 0, 0, 'L');
        if (in_array($this->dedicatedConnection, ['connect_jos_retail', 'connect_jos_service'])) {
            $this->fpdf->Cell(40, 5, ' PPN 0%', 0, 0, 'L');
        } else {
            $this->fpdf->Cell(40, 5, ' PPN 11%', 0, 0, 'L');
        }
        $this->fpdf->Cell(10, 5, ' : Rp. ', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, number_format($PPNAmount), 0, 0, 'R');
        $this->fpdf->Line(62, $Yfocus + 5, 100, $Yfocus + 5);
        $this->fpdf->Line(110, $Yfocus + 5, 150, $Yfocus + 5);
        $Yfocus += 6;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, '', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, ' Total Yang Dibayar', 0, 0, 'L');
        $this->fpdf->Cell(10, 5, ' : Rp. ', 0, 0, 'L');
        $this->fpdf->Cell(40, 5, number_format($PPNAmount + $totalHargaSewa), 0, 0, 'R');
        $Yfocus += 6;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Lokasi', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, ': ' . (!empty($Subject) ? $Subject->TQUO_PROJECT_LOCATION : ''), 0, 0, 'L');
        $this->fpdf->Line(63, $Yfocus + 5, 150, $Yfocus + 5);
        $Yfocus += 5;
        $this->fpdf->SetXY(110, $Yfocus);
        $this->fpdf->Cell(50, 5, $Branch->MBRANCH_NM . ', ' . $DOIssuDate, 0, 0, 'L');
        $Yfocus += 10;
        $this->fpdf->SetXY(10, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Jumlah', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, ': Rp. ' . number_format($PPNAmount + $totalHargaSewa), 0, 0, 'L');
        $Yfocus += 25;
        $this->fpdf->SetXY(120, $Yfocus);
        $this->fpdf->Cell(50, 5, 'Syapril, S.T', 0, 0, 'L');
        $Yfocus += 9;
        $this->fpdf->SetXY(6, $Yfocus);
        $this->fpdf->SetFont('Arial', '', 8);
        $this->fpdf->Cell(50, 5, 'Note: Pembayaran dengan Giro/Cheque/Transfer dianggap sah apabila dan sudah masuk ke rekening kami', 0, 0, 'L');

        $pdfFile = $this->fpdf->Output("", "S");

        return base64_encode($pdfFile);
        // $this->fpdf->Output('delivery documents ' . $doc . '.pdf', 'I');
        // exit;
    }

    public function printSJ($doc)
    {
        $doc = base64_decode($doc);

        $getCompGroups = CompanyGroup::where('connection', $this->dedicatedConnection)->first();
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO',
                'TSLODETA_PRC',
                'TSLODETA_ITMQT',
                'TDLVSJDETA_TYPE',
                'TDLVSJDETA_STARTDT',
                'TDLVSJDETA_ENDDT',
                'TDLVORD_CONDGRP',
                DB::raw("TDLVORD_DLVCD"),
                'TDLVOR_ISSPLITSJ'
            )
            ->leftJoin('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_DLVORDDETA', DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"))
            ->leftJoin('T_SLOHEAD', 'TDLVORDDETA_SLOCD', 'TSLO_SLOCD')
            ->leftJoin('T_SLODETA', 'TSLO_SLOCD', 'TSLODETA_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TSLO_QUOCD', 'TQUO_QUOCD')
            ->leftJoin('T_DLVSJDETA', DB::raw("SUBSTRING_INDEX(TDLVSJDETA_DLVCD, '/', 1)"), DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"))
            ->where(DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), $doc)
            ->where('TDLVORD_BRANCH', Auth::user()->branch)
            ->with([
                'condition' => function ($f) {
                    $f->leftjoin('M_CONDITIONS', 'MCOND_ID', 'M_CONDITIONS.id');
                },
                'spk' => function ($f) {
                    $f->where('CSPK_PIC_AS', 'DRIVER');
                },
                'dlvsj'
            ])
            ->groupBy(
                'TDLVORD_DLVCD',
                DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"),
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO',
                'TSLODETA_PRC',
                'TSLODETA_ITMQT',
                'TDLVSJDETA_TYPE',
                'TDLVSJDETA_STARTDT',
                'TDLVSJDETA_ENDDT',
                'TDLVORD_CONDGRP',
                'TDLVOR_ISSPLITSJ'
            )
            ->first();

        $RSDetail = T_DLVORDDETA::on($this->dedicatedConnection)->select(
            'TDLVORDDETA_ITMCD',
            'TDLVORDDETA_DLVCD',
            'TDLVORDDETA_ITMCD_ACT',
            'TDLVORDDETA_ITMQT',
            'MITM_ITMNM',
            'MITM_STKUOM',
            'created_by',
            'TDLVORDDETA_SLOCD',
            'MITM_ITMNM',
            'MITM_MODEL',
            'MITM_BRAND',
            'MITM_ITMCAT',
        )
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TDLVORDDETA_ITMCD_ACT', '=', 'MITM_ITMCD')->on('TDLVORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->where(DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"), $doc)
            ->where('TDLVORDDETA_BRANCH', Auth::user()->branch)->get();

        $Company = COMPANY_BRANCH::on($this->dedicatedConnection)->select(
            'name',
            'COMPANY_BRANCHES.address',
            'COMPANY_BRANCHES.phone',
            'invoice_letter_id'
        )
            ->where('connection', $this->dedicatedConnection)
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $Branch = M_BRANCH::select('MBRANCH_NM')->where('MBRANCH_CD', Auth::user()->branch)->first();

        $Dibuat = NULL;
        $Attn = NULL;
        $Subject = NULL;

        $Usage = NULL;
        $HargaSewa = NULL;
        foreach ($RSDetail as $r) {
            $Dibuat = User::where('nick_name', $r->created_by)->select('name')->first();
            $Attn = T_SLOHEAD::on($this->dedicatedConnection)->select('TSLO_ATTN', 'TSLO_QUOCD', 'TSLO_POCD', 'TSLO_ADDRESS_DESCRIPTION')
                ->where('TSLO_SLOCD', $r->TDLVORDDETA_SLOCD)
                ->where('TSLO_BRANCH', Auth::user()->branch)
                ->first();

            if (!empty($Attn)) {
                $Subject = T_QUOHEAD::on($this->dedicatedConnection)
                    ->where('TQUO_QUOCD', $Attn->TSLO_QUOCD)
                    ->where('TQUO_BRANCH', Auth::user()->branch)
                    ->first();
            }
            break;
        }

        $totalHargaSewa = 0;
        $totalQty = 0;
        foreach ($RSDetail as $r) {
            $Usage = T_SLODETA::on($this->dedicatedConnection)->select(
                'TSLODETA_USAGE_DESCRIPTION',
                'TSLODETA_PRC',
                'TSLODETA_OPRPRC',
                'TSLODETA_MOBDEMOB',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO',
            )
                ->where('TSLODETA_SLOCD', $r->TDLVORDDETA_SLOCD)
                ->where('TSLODETA_ITMCD', $r->TDLVORDDETA_ITMCD)
                ->where('TSLODETA_BRANCH', Auth::user()->branch)
                ->first();
            $HargaSewa = ($Usage->TSLODETA_PRC * $r->TDLVORDDETA_ITMQT) + $Usage->TSLODETA_OPRPRC + $Usage->TSLODETA_MOBDEMOB;
            $PeriodFrom = date_format(date_create($Usage->TSLODETA_PERIOD_FR), 'd-M-Y');
            $PeriodTo = date_format(date_create($Usage->TSLODETA_PERIOD_TO), 'd-M-Y');
            $totalHargaSewa += $HargaSewa;
            $DOIssuDate = date_format(date_create($RSHeader->TDLVORD_ISSUDT), 'd-M-Y');

            $totalQty += $r->TDLVORDDETA_ITMQT;
        }
        if (in_array($this->dedicatedConnection, ['connect_jos_retail', 'connect_jos_service'])) {
            $PPNAmount = 0;
        } else {
            $PPNAmount = $totalHargaSewa * 11 / 100;
        }

        $subjek = ucwords(trim(str_replace('penawaran', '', strtolower($Subject->TQUO_SBJCT))));
        $terbilang = ucwords(rtrim($this->numberToSentence($PPNAmount + $totalHargaSewa)));

        $perulangan = 1;
        $getDO = $doc;
        if ($RSHeader->TDLVOR_ISSPLITSJ == 1) {
            $perulangan = count($RSDetail);
        }

        for ($i = 0; $i < $perulangan; $i++) {
            if ($RSHeader->TDLVOR_ISSPLITSJ == 1) {
                $getDO = $RSDetail[$i]->TDLVORDDETA_DLVCD;
            }

            $this->fpdf->AddPage("L", 'A5');
            $this->fpdf->SetAutoPageBreak(true, 0);
            $this->fpdf->SetFont('Arial', 'B', 12);
            $this->fpdf->SetXY(3, 5);
            $this->fpdf->Cell(45, 5, $Company->name, 0, 0, 'L');
            $this->fpdf->SetFont('Arial', '', 10);
            $this->fpdf->SetXY(3, 10);
            $this->fpdf->MultiCell(70, 4, $Company->address . ' Telp.' . $Company->phone, 0, 'L');

            $this->fpdf->SetFont('Arial', '', 8);
            $this->fpdf->SetXY(150, 5);
            $this->fpdf->Cell(45, 5, $Branch->MBRANCH_NM . ', ' . $DOIssuDate, 0, 0, 'L');
            $this->fpdf->SetFont('Arial', '', 8);
            $this->fpdf->SetXY(150, 10);
            $this->fpdf->MultiCell(55, 4, 'Kepada ' . $RSHeader->MCUS_CUSNM, 0, 'L');
            $this->fpdf->SetXY(150, 15);
            $this->fpdf->MultiCell(55, 4, $RSHeader->MCUS_ADDR1, 0, 'L');
            $this->fpdf->SetXY(150, 20);
            $this->fpdf->MultiCell(55, 4, $RSHeader->MCUS_REFF_MKT, 0, 'L');
            $this->fpdf->SetXY(150, 30);
            $this->fpdf->MultiCell(55, 4, $RSHeader->MCUS_TELNO, 0, 'L');

            $this->fpdf->SetFont('Arial', 'U', 10);
            $this->fpdf->SetXY(90, 15);
            $this->fpdf->Cell(29, 5, 'SURAT JALAN', 0, 0, 'C');
            $this->fpdf->SetFont('Arial', '', 10);
            $this->fpdf->SetXY(90, 20);
            $this->fpdf->Cell(29, 5, 'NO : ' . $getDO, 0, 0, 'C');

            $this->fpdf->SetFont('Arial', '', 9);
            $this->fpdf->SetXY(3, 30);
            $this->fpdf->Cell(29, 5, 'Dengan kendaraan No. Pol: ' . (count($RSHeader->spk) > 0 ? $RSHeader->spk[0]->CSPK_VEHICLE_REGNUM . ', kami kirimkan barang-barang di bawah ini :' : ''), 0, 0, 'L');
            if (count($RSHeader->spk) === 0) {
                $this->fpdf->SetXY(70, 30);
                $this->fpdf->Cell(29, 5, ', kami kirimkan barang-barang di bawah ini :', 0, 0, 'L');
            }
            $this->fpdf->SetXY(150, 30);
            // $this->fpdf->Cell(25, 5, date('d M Y H:i:s'), 0, 0, 'L');
            $this->fpdf->Line(3, 35, 205, 35);
            $this->fpdf->Line(3, 36, 205, 36);
            $this->fpdf->Line(3, 42, 205, 42);
            $this->fpdf->Line(3, 43, 205, 43);

            // Isi Header
            $this->fpdf->SetXY(3, 36.5);
            $this->fpdf->Cell(29, 5, 'No', 0, 0, 'L');
            $this->fpdf->SetXY(15, 36.5);
            $this->fpdf->Cell(29, 5, 'Part Number', 0, 0, 'L');
            $this->fpdf->SetXY(45, 36.5);
            $this->fpdf->Cell(29, 5, 'Nama Barang', 0, 0, 'L');
            $this->fpdf->SetXY(100, 36.5);
            $this->fpdf->Cell(29, 5, 'Qty', 0, 0, 'L');
            $this->fpdf->SetXY(120, 36.5);
            $this->fpdf->Cell(29, 5, 'Tanggal Awal', 0, 0, 'L');
            $this->fpdf->SetXY(145, 36.5);
            $this->fpdf->Cell(29, 5, 'Tanggal Akhir', 0, 0, 'L');
            $this->fpdf->SetXY(170, 36.5);
            $this->fpdf->Cell(29, 5, 'Keterangan', 0, 0, 'L');

            # body
            $nomor = 1;
            $Y = 45;

            $listDetail = $RSDetail;

            // Jika split SJ
            if ($RSHeader->TDLVOR_ISSPLITSJ == 1) {
                $listDetail = [$RSDetail[$i]];
            }

            foreach ($listDetail as $r) {
                if ($Y > 130) {
                    $this->fpdf->AddPage("L", 'A5');
                    $this->fpdf->SetAutoPageBreak(true, 0);

                    $Y = 10;
                }

                $qtyNya = $r->TDLVORDDETA_ITMQT;

                $this->fpdf->SetXY(3, $Y);
                $this->fpdf->Cell(29, 5, $nomor++, 0, 0, 'L');
                $this->fpdf->SetXY(15, $Y);
                $this->fpdf->Cell(29, 5, $r->TDLVORDDETA_ITMCD_ACT, 0, 0, 'L');
                $this->fpdf->SetXY(45, $Y);
                $this->fpdf->Cell(29, 5, $r->MITM_ITMNM, 0, 0, 'L');
                $this->fpdf->SetXY(100, $Y);
                $this->fpdf->Cell(29, 5, "{$qtyNya} {$r->MITM_STKUOM}", 0, 0, 'L');
                $this->fpdf->SetXY(120, $Y);
                $this->fpdf->Cell(29, 5, date('d M Y', strtotime($RSHeader->TSLODETA_PERIOD_FR)), 0, 0, 'L');
                $this->fpdf->SetXY(145, $Y);
                $this->fpdf->Cell(29, 5, date('d M Y', strtotime($RSHeader->TSLODETA_PERIOD_TO)), 0, 0, 'L');
                if (str_contains($RSHeader->TDLVSJDETA_TYPE, 'forklift')) {
                    $this->fpdf->SetXY(170, $Y);
                    $this->fpdf->Cell(29, 5, 'Jam Keluar :' . date('H:i', strtotime($RSHeader->TDLVSJDETA_STARTDT)), 0, 0, 'L');
                    $this->fpdf->SetXY(170, $Y + 5);
                    $this->fpdf->Cell(29, 5, 'Jam Masuk :' . date('H:i', strtotime($RSHeader->TDLVSJDETA_ENDDT)), 0, 0, 'L');
                } else {
                    $this->fpdf->SetXY(170, $Y);
                    $this->fpdf->Cell(29, 5, $r['MITM_ITMCAT'], 0, 0, 'L');
                    $Y += 5;
                    $this->fpdf->SetXY(170, $Y);
                    $this->fpdf->Cell(29, 5, 'HM :', 0, 0, 'L');
                    $Y += 5;
                    $this->fpdf->SetXY(170, $Y);
                    $this->fpdf->Cell(29, 5, 'Solar :', 0, 0, 'L');
                }

                if ($RSHeader->TDLVSJDETA_TYPE == 'forklift') {
                    $Y += 10;
                } else {
                    $Y += 10;
                }
            }

            # baris bawah
            $this->fpdf->Line(3, 90, 205, 90);
            $this->fpdf->Line(3, 91, 205, 91);
            $this->fpdf->Line(3, 97, 205, 97);
            $this->fpdf->Line(3, 98, 205, 98);

            $this->fpdf->SetXY(3, 91.5);
            // $this->fpdf->Cell(29, 5, 'Ket:' . $RSHeader->TDLVORD_REMARK, 0, 0, 'L');
            $this->fpdf->Cell(29, 5, "Lokasi : {$RSHeader->TQUO_PROJECT_LOCATION}", 0, 0, 'L');
            $this->fpdf->SetXY(170, 91.5);
            $this->fpdf->Cell(29, 5, date('d M Y H:i:s'), 0, 0, 'L');
            $this->fpdf->SetFont('Arial', 'B', 10);
            // $this->fpdf->SetXY(3, 100);
            // $this->fpdf->Cell(29, 5, "Terbilang : {$this->numberToSentence($RSHeader->TSLODETA_ITMQT * $RSHeader->TSLODETA_PRC)}", 0, 0, 'L');

            $this->fpdf->SetFont('Arial', '', 7);

            if (count($RSHeader->condition) > 0) {
                $startCond = 100;
                foreach ($RSHeader->condition as $keyCond => $valueCond) {
                    $this->fpdf->SetXY(3, $startCond);
                    $this->fpdf->Cell(29, 5, "- " . $valueCond->MCONDITION_DESCRIPTION, 0, 0, 'L');

                    $startCond = $startCond + 3;
                }
            } else {
                $this->fpdf->SetXY(3, 100);
                $this->fpdf->Cell(29, 5, '- Jam Kerja (08:00-16:00), di luar jam kerja ditambah biaya lembur 50%', 0, 0, 'L');
                $this->fpdf->SetXY(3, 103);
                $this->fpdf->Cell(29, 5, '- Bila terjadi sesuatu kecelakaan/kerusakan barang di waktu kerja, semuanya ditanggung oleh penyewa', 0, 0, 'L');

                $startCond = 103;
            }

            $this->fpdf->SetFont('Arial', '', 9);
            $this->fpdf->SetXY(15, $startCond + 3);
            if (str_contains($RSHeader->TDLVSJDETA_TYPE, 'forklift')) {
                $this->fpdf->Cell(52, 5, 'Penerima', 0, 0, 'L');
                $this->fpdf->Cell(48, 5, 'Sopir', 0, 0, 'L');
                $this->fpdf->Cell(50, 5, 'Ks. Gudang', 0, 0, 'L');
                $this->fpdf->Cell(50, 5, 'Dibuat Oleh', 0, 0, 'L');
                $this->fpdf->SetXY(13, 135);
                $this->fpdf->Cell(50, 2, '(                   )', 0, 0, 'L');
                $this->fpdf->Cell(50, 2, '(                   )', 0, 0, 'L');
                $this->fpdf->Cell(52, 2, '(                   )', 0, 0, 'L');
                $this->fpdf->Cell(50, 2, '(' . $Dibuat->name . ')', 0, 0, 'L');
            } else {
                $this->fpdf->Cell(40, 5, 'Penerima', 0, 0, 'L');
                $this->fpdf->Cell(40, 5, 'Sopir', 0, 0, 'L');
                $this->fpdf->Cell(40, 5, 'Operator', 0, 0, 'L');
                $this->fpdf->Cell(40, 5, 'Adm. Stok', 0, 0, 'L');
                $this->fpdf->Cell(40, 5, 'Dibuat Oleh', 0, 0, 'L');
                $this->fpdf->SetXY(13, 135);
                $this->fpdf->Cell(40, 2, '(                   )', 0, 0, 'L');
                $this->fpdf->Cell(40, 2, '(                   )', 0, 0, 'L');
                $this->fpdf->Cell(40, 2, '(                   )', 0, 0, 'L');
                $this->fpdf->Cell(42, 2, '(                   )', 0, 0, 'L');
                $this->fpdf->Cell(40, 2, '(' . $Dibuat->name . ')', 0, 0, 'L');
            }

            $this->fpdf->SetXY(5, 140);
            $this->fpdf->Cell(45, 5, 'Putih : Penyewa', 0, 0, 'L');
            $this->fpdf->Cell(45, 5, 'Merah : Supir / Operator', 0, 0, 'L');
            $this->fpdf->Cell(45, 5, 'Kuning : Penyewa', 0, 0, 'L');
            $this->fpdf->Cell(40, 5, 'Hijau : Lap. Harian', 0, 0, 'L');
            $this->fpdf->Cell(45, 5, 'Biru : Arsip', 0, 0, 'L');
        }

        $pdfFile = $this->fpdf->Output("", "S");

        return base64_encode($pdfFile);
    }

    public function printGensetHarian($doc)
    {
        $doc = base64_decode($doc);
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO',
                'TSLODETA_PRC',
                'TSLODETA_ITMQT',
                'TDLVSJDETA_TYPE',
                'TDLVSJDETA_STARTDT',
                'TDLVSJDETA_ENDDT',
                'TDLVORD_CONDGRP',
                DB::raw("TDLVORD_DLVCD"),
                'TDLVOR_ISSPLITSJ'
            )
            ->leftJoin('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_DLVORDDETA', DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"))
            ->leftJoin('T_SLOHEAD', 'TDLVORDDETA_SLOCD', 'TSLO_SLOCD')
            ->leftJoin('T_SLODETA', 'TSLO_SLOCD', 'TSLODETA_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TSLO_QUOCD', 'TQUO_QUOCD')
            ->leftJoin('T_DLVSJDETA', DB::raw("SUBSTRING_INDEX(TDLVSJDETA_DLVCD, '/', 1)"), DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"))
            ->where(DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"), $doc)
            ->where('TDLVORD_BRANCH', Auth::user()->branch)
            ->with([
                'condition' => function ($f) {
                    $f->leftjoin('M_CONDITIONS', 'MCOND_ID', 'M_CONDITIONS.id');
                },
                'spk' => function ($f) {
                    $f->where('CSPK_PIC_AS', 'DRIVER');
                },
                'dlvsj'
            ])
            ->groupBy(
                'TDLVORD_DLVCD',
                DB::raw("SUBSTRING_INDEX(TDLVORD_DLVCD, '/', 1)"),
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION',
                'TSLODETA_PERIOD_FR',
                'TSLODETA_PERIOD_TO',
                'TSLODETA_PRC',
                'TSLODETA_ITMQT',
                'TDLVSJDETA_TYPE',
                'TDLVSJDETA_STARTDT',
                'TDLVSJDETA_ENDDT',
                'TDLVORD_CONDGRP',
                'TDLVOR_ISSPLITSJ'
            )
            ->first();

        $RSDetail = T_DLVORDDETA::on($this->dedicatedConnection)->select(
            'TDLVORDDETA_ITMCD',
            'TDLVORDDETA_DLVCD',
            'TDLVORDDETA_ITMCD_ACT',
            'TDLVORDDETA_ITMQT',
            'MITM_ITMNM',
            'MITM_STKUOM',
            'T_DLVORDDETA.created_by',
            'TDLVORDDETA_SLOCD',
            'MITM_ITMNM',
            'MITM_MODEL',
            'MITM_BRAND',
            'MITM_ITMCAT',
            'TSLODETA_PERIOD_FR',
            'TSLODETA_PERIOD_TO',
            'name'
        )
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TDLVORDDETA_ITMCD_ACT', '=', 'MITM_ITMCD')
                    ->on('TDLVORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->leftJoin('T_SLODETA', function ($join) {
                $join->on('TSLODETA_SLOCD', '=', 'TDLVORDDETA_SLOCD')
                    ->on('TDLVORDDETA_ITMCD', '=', 'TSLODETA_ITMCD');
            })
            ->join(DB::raw('jatpower_tribin.users'), 'nick_name', 'T_SLODETA.created_by')
            ->where(DB::raw("SUBSTRING_INDEX(TDLVORDDETA_DLVCD, '/', 1)"), $doc)
            ->where('TDLVORDDETA_BRANCH', Auth::user()->branch)
            ->where('MITM_ITMCAT', 'GENSET')
            ->get();

        $Company = COMPANY_BRANCH::on($this->dedicatedConnection)->select(
            'name',
            'COMPANY_BRANCHES.address',
            'COMPANY_BRANCHES.phone',
            'invoice_letter_id'
        )
            ->where('connection', $this->dedicatedConnection)
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $Branch = M_BRANCH::select('MBRANCH_NM')->where('MBRANCH_CD', Auth::user()->branch)->first();
        $DOIssuDate = date_format(date_create($RSHeader->TDLVORD_ISSUDT), 'd-M-Y');

        // return $RSHeader;
        foreach ($RSDetail as $key => $valueDet) {
            $this->fpdf->AddPage("L", 'A5');
            $pageWidth = $this->fpdf->GetPageWidth() - 10;

            $this->fpdf->SetAutoPageBreak(true, 0);
            $this->fpdf->SetFont('Arial', 'B', 12);
            $this->fpdf->Cell($pageWidth, 5, 'FORM OPERASI GENSET HARIAN', 0, 1, 'C');
            $this->fpdf->SetFont('Arial', 'B', 10);
            $this->fpdf->Cell($pageWidth, 5, "No. SJ : {$doc}", 0, 1, 'C');

            $getOperator = count($RSHeader->spk) > 0
                ? array_values(array_filter($RSHeader->spk, function ($f) {
                    return $f['CSPK_PIC_AS'] === 'OPERATOR';
                }))[0]['CSPK_PIC_NAME']
                : '-';

            $getDriver = count($RSHeader->spk) > 0
                ? array_values(array_filter($RSHeader->spk, function ($f) {
                    return $f['CSPK_PIC_AS'] === 'OPERATOR';
                }))[0]['CSPK_PIC_NAME']
                : '-';

            $getKordinator = count($RSHeader->spk) > 0
                ? array_values(array_filter($RSHeader->spk, function ($f) {
                    return $f['CSPK_PIC_AS'] === 'KOORDINATOR';
                }))[0]['CSPK_PIC_NAME']
                : '-';

            $listHeader = [
                [
                    'left_label' => 'Nama Penyewa',
                    'left_value' => $RSHeader->MCUS_CUSNM,
                    'right_label' => 'Period Sewa',
                    'right_value' => date('d M Y', strtotime($valueDet->TSLODETA_PERIOD_FR)) . " - " . date('d M Y', strtotime($valueDet->TSLODETA_PERIOD_TO))
                ],
                [
                    'left_label' => 'No Telp.',
                    'left_value' => $RSHeader->MCUS_TELNO,
                    'right_label' => 'Nama Operator',
                    'right_value' => $getOperator
                ],
                [
                    'left_label' => 'Genset',
                    'left_value' => $valueDet->MITM_ITMNM,
                    'right_label' => 'Sales',
                    'right_value' => $valueDet->name
                ],
                [
                    'left_label' => 'Lokasi',
                    'left_value' => $RSHeader->MCUS_ADDR1,
                    'right_label' => 'Supir',
                    'right_value' => $getDriver
                ],
                [
                    'left_label' => '',
                    'left_value' => '',
                    'right_label' => 'Koor. Lap',
                    'right_value' => $getKordinator
                ],
            ];

            $Y = 25;
            foreach ($listHeader as $keyListHead => $valueListHead) {
                $this->fpdf->SetXY(3, $Y);
                $this->fpdf->SetFont('Arial', '', 9);
                $this->fpdf->Cell(10, 5, $valueListHead['left_label'], 0, 1, 'L');
                $this->fpdf->SetXY(30, $Y);
                $this->fpdf->Cell(10, 5, !empty($valueListHead['left_label']) ? ":" : "", 0, 1, 'L');
                $this->fpdf->SetXY(35, $Y);
                $this->fpdf->MultiCell(70, 5, $valueListHead['left_value'], 0, 'L');

                $this->fpdf->SetXY(120, $Y);
                $this->fpdf->Cell(10, 5, $valueListHead['right_label'], 0, 1, 'L');
                $this->fpdf->SetXY(145, $Y);
                $this->fpdf->Cell(10, 5, ":", 0, 1, 'L');
                $this->fpdf->SetXY(150, $Y);
                $this->fpdf->MultiCell(70, 5, $valueListHead['right_value'], 0, 'L');

                $Y += 5;
            }

            $Y += 5;
            $this->fpdf->SetXY(3, $Y);
            $this->fpdf->SetFont('Arial', '', 9);

            $listHeader = [
                'Tanggal',
                'Hour Awal',
                'Hour Akhir',
                'HM Pemakaian',
                'AMP',
                'Solar Awal',
                'Solar Akhir',
                'Keterangan',
            ];

            $W_Awal = 3;
            $tinggiTable = 110;
            foreach ($listHeader as $keylistHeader => $valuelistHeader) {
                $this->fpdf->SetXY($W_Awal, $Y);
                $this->fpdf->Cell(25, 5, $valuelistHeader, 1, 1, 'C');

                // Tinggi Table 120
                $this->fpdf->Line($W_Awal, $Y, $W_Awal, $tinggiTable);
                $this->fpdf->Line($W_Awal, $tinggiTable, $W_Awal + 25, $tinggiTable);

                $W_Awal += 25;
            }

            // Line kolom terakhir
            $this->fpdf->Line($W_Awal, $Y, $W_Awal, $tinggiTable);

            $Y = $tinggiTable + 5;

            $listTTD = [
                [
                    'mark' => 'Marketing',
                    'markVal' => '(                   )',
                ],
                [
                    'mark' => 'Sopir',
                    'markVal' => '(                   )',
                ],
                [
                    'mark' => 'Operator',
                    'markVal' => '(                   )',
                ],
                [
                    'mark' => 'Adm. Stok',
                    'markVal' => '(                   )',
                ],
                [
                    'mark' => 'Penyewa',
                    'markVal' => '(' . $RSHeader->MCUS_CUSNM . ')',
                ],
            ];

            $startXTTD = 10;
            $panjangTTD = 37;
            foreach ($listTTD as $keylistTTD => $valuelistTTD) {
                $this->fpdf->SetXY($startXTTD, $Y);
                $this->fpdf->Cell($panjangTTD, 5, $valuelistTTD['mark'], 0, 1, 'C');


                $this->fpdf->SetXY($startXTTD, $Y + 20);
                $this->fpdf->Cell($panjangTTD, 5, $valuelistTTD['markVal'], 0, 1, 'C');
                // $this->fpdf->SetXY($startXTTD * $keylistTTD + 1, $Y + 25);
                // $this->fpdf->Cell(40, 2, '(                   )', 0, 0, 'L');
                $startXTTD += $panjangTTD;
            }


            $this->fpdf->SetXY(5, 140);
            $this->fpdf->Cell(45, 5, 'Putih : Marketing', 0, 0, 'R');
            $this->fpdf->Cell(45, 5, 'Merah : Operator', 0, 0, 'R');
            $this->fpdf->Cell(45, 5, 'Kuning : Adm. Sparepart', 0, 0, 'R');
            $this->fpdf->Cell(40, 5, 'Hijau : Penyewa', 0, 0, 'R');
        }

        $pdfFile = $this->fpdf->Output("", "S");

        return base64_encode($pdfFile);
    }

    public function cekKwitansiNo()
    {
        $cek = T_DLVORDHEAD::on($this->dedicatedConnection)->where(DB::raw('YEAR(created_at)'), date('Y'))
            ->orderBy('created_at', 'desc')
            ->first();

        return $cek;
    }

    function searchAPIForInvoice(Request $request)
    {
        $RS = T_SLOHEAD::on($this->dedicatedConnection)->select([
            // "TSLO_SLOCD",
            "TSLO_QUOCD",
            "TSLO_CUSCD",
            "MCUS_CUSNM",
            "TSLO_ISSUDT",
            'TQUO_ATTN'
        ])
            ->join('M_CUS', function ($join) {
                $join->on('TSLO_CUSCD', '=', 'MCUS_CUSCD')->on('TSLO_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_QUOHEAD', 'TQUO_QUOCD', 'TSLO_QUOCD')
            ->groupBy(
                // "TSLO_SLOCD",
                "TSLO_QUOCD",
                "TSLO_CUSCD",
                "MCUS_CUSNM",
                "TSLO_ISSUDT",
                'TQUO_ATTN'
            );

        if (!empty($request->searchBy) && !empty($request->searchValue)) {
            $RS->where($request->searchBy, 'like', '%' . $request->searchValue . '%');
        }

        $hasil = [];
        foreach ($RS->get()->toArray() as $key => $value) {
            $salesOrd = T_SLOHEAD::on($this->dedicatedConnection)->where('TSLO_QUOCD', '=', $value['TSLO_QUOCD'])
                ->get()
                ->toArray();

            $hasilSO = [];
            foreach ($salesOrd as $key => $valueSO) {
                $APISLO = $this->searchAPIBySLO($valueSO['TSLO_SLOCD']);
                foreach ($APISLO as $keyDetSO => $valueDetSO) {
                    $hasilSO[] = $valueDetSO;
                }
            }

            if (count($hasilSO) > 0) {
                $hasil[] = array_merge($value, [
                    'dlv' => $hasilSO
                ]);
            }
        }

        return ['data' => $hasil];
        // return ['data' => $RS->get()->toArray()];
    }

    function searchAPIBySLO($sloCD)
    {
        $data = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                DB::raw("CONCAT(TDLVORD_DLVCD, ' (', MCUS_CUSNM, ' - ', TQUO_ATTN, ')') AS LABEL"),
                'TDLVORD_INVCD',
                'TDLVORD_DLVCD',
                'TDLVORD_ISSUDT',
                'TDLVORD_INVCD',
                'TDLVORD_REC_NO',
                'TDLVORDDETA_SLOCD',
                'TDLVORD_CUSCD',
                'MCUS_CUSNM',
                'MCUS_TELNO',
                'MCUS_PIC_TELNO',
                'MCUS_ADDR1',
                'TSLO_QUOCD',
                'TSLO_POCD',
                'TQUO_SBJCT',
                'TQUO_ATTN'
            )
            ->with([
                'dlvdet' => function ($f) {
                    $f->on($this->dedicatedConnection)->join('M_ITM', 'TDLVORDDETA_ITMCD_ACT', 'MITM_ITMCD');
                },
                'dlvacc',
                'dlvsj',
                'payment' => function ($f) {
                    $f->select('*', DB::raw('branch_payment_accounts.id as TDLVPAYDETA_IDPAY'));
                },
                'condition' => function ($f) {
                    $f->leftjoin('M_CONDITIONS', 'MCOND_ID', 'M_CONDITIONS.id');
                }
            ])
            ->join('T_DLVORDDETA', 'TDLVORD_DLVCD', 'TDLVORDDETA_DLVCD')
            ->join('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_SLOHEAD', 'TSLO_SLOCD', 'TDLVORDDETA_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TQUO_QUOCD', 'TSLO_QUOCD')
            ->where(DB::raw('RTRIM(TDLVORDDETA_ITMCD_ACT)'), '<>', '')
            ->groupBy(
                'TDLVORD_INVCD',
                'TDLVORD_DLVCD',
                'TDLVORD_ISSUDT',
                'TDLVORD_INVCD',
                'TDLVORD_REC_NO',
                'TDLVORD_CUSCD',
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

        $data->where('TDLVORDDETA_SLOCD', '=', $sloCD);

        $hasil = [];
        foreach ($data->get()->toArray() as $key => $value) {
            $hasil[] = array_merge(
                $value,
                [
                    'sloDet' => T_SLODETA::on($this->dedicatedConnection)
                        ->where('TSLODETA_SLOCD', $value['TDLVORDDETA_SLOCD'])
                        ->join('M_USAGE', 'M_USAGE.id', 'TSLODETA_USAGE_DESCRIPTION')
                        ->get()
                ]
            );
        }

        return $hasil;
    }
}
