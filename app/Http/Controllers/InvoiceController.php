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
            'TDLVSJDETA_STARTDT' => 'required|date',
            'TDLVSJDETA_ENDDT' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 406);
        }

        T_DLVSJDETA::on($this->dedicatedConnection)->updateOrCreate([
            'TDLVSJDETA_DLVCD' => $request->TDLVSJDETA_DLVCD,
        ], [
            'TDLVSJDETA_DLVCD' => $request->TDLVSJDETA_DLVCD,
            'TDLVSJDETA_TYPE' => $request->TDLVSJDETA_TYPE,
            'TDLVSJDETA_CONDGRP' => $request->TDLVSJDETA_CONDGRP,
            'TDLVSJDETA_STARTDT' => $request->TDLVSJDETA_STARTDT,
            'TDLVSJDETA_ENDDT' => $request->TDLVSJDETA_ENDDT,
        ]);

        T_DLVPAYDETA::on($this->dedicatedConnection)->where('TDLVPAYDETA_DLVCD', $request->TDLVPAYDETA_DLVCD)->delete();

        foreach ($request->payment as $key => $valuePays) {
            T_DLVPAYDETA::on($this->dedicatedConnection)->create([
                'TDLVPAYDETA_DLVCD' => $valuePays['TDLVPAYDETA_DLVCD'],
                'TDLVPAYDETA_IDPAY' => $valuePays['TDLVPAYDETA_IDPAY'],
            ]);
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
                'TDLVORD_INVCD',
                'TDLVORD_DLVCD',
                'TDLVORD_ISSUDT',
                'TDLVORD_INVCD',
                'TDLVORD_REC_NO',
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
            ->with([
                'dlvdet' => function ($f) {
                    $f->join('M_ITM', 'TDLVORDDETA_ITMCD', 'MITM_ITMCD');
                },
                'dlvacc',
                'dlvsj',
                'payment'
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

    public function printInvoice(Request $request)
    {
        $getCompGroups = CompanyGroup::where('connection', empty($conn) ? $this->dedicatedConnection : base64_decode($conn))->first();
        $RSCG = COMPANY_BRANCH::on(empty($conn) ? $this->dedicatedConnection : base64_decode($conn))->select('name', 'address', 'phone', 'fax', 'letter_head')
            ->where('connection', empty($conn) ? $this->dedicatedConnection : base64_decode($conn))
            ->where('BRANCH', Auth::user()->branch)
            ->first();

        $total = 0;
        $dlvDetParse = [];
        $cek = [];
        foreach ($request->dlvdet as $key => $value) {
            $getSLOByItem = array_values(array_filter($request->sloDet, function ($f) use ($value) {
                return $f['TSLODETA_ITMCD'] == $value['TDLVORDDETA_ITMCD'];
            }));

            $cek[] = $getSLOByItem;
            // return $getSLOByItem[0];
            if (count($getSLOByItem) > 0) {
                $getTotalPrice = ($getSLOByItem[0]['TSLODETA_PRC'] * $value['TDLVORDDETA_ITMQT']) + $getSLOByItem[0]['TSLODETA_OPRPRC'] + $getSLOByItem[0]['TSLODETA_MOBDEMOB'];
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
                'isPPN' => $getCompGroups->flg_ppn,
                'total' => $total,
                'ppn' => $ppn,
                'dlvDetNew' => $dlvDetParse,
                'payment' => $request->payment,
                'terbilang' => $this->numberToSentence($getCompGroups->flg_ppn == 1 ? $total + $ppn : $total)
            ],
            $request->all()
        )
        );

        return base64_encode($pdf->output());
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

    public function printKwitansi($doc)
    {
        $doc = base64_decode($doc);
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select('TDLVORD_ISSUDT', 'MCUS_CUSNM', 'MCUS_ADDR1', 'TDLVORD_REMARK', 'MCUS_TELNO', 'TDLVORD_INVCD', 'TDLVORD_LINE', 'TDLVORD_REC_NO')
            ->leftJoin('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->where("TDLVORD_DLVCD", $doc)
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
        )
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TDLVORDDETA_ITMCD', '=', 'MITM_ITMCD')->on('TDLVORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->where('TDLVORDDETA_DLVCD', $doc)
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
        }
        if (in_array($this->dedicatedConnection, ['connect_jos_retail', 'connect_jos_service'])) {
            $PPNAmount = 0;
        } else {
            $PPNAmount = $totalHargaSewa * 11 / 100;
        }

        $subjek = ucwords(trim(str_replace('penawaran', '', strtolower($Subject->TQUO_SBJCT))));
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
        $this->fpdf->Cell(50, 5, ': ' . $Subject->TQUO_PROJECT_LOCATION, 0, 0, 'L');
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
        $RSHeader = T_DLVORDHEAD::on($this->dedicatedConnection)
            ->select(
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION'
            )
            ->leftJoin('M_CUS', function ($join) {
                $join->on('TDLVORD_CUSCD', '=', 'MCUS_CUSCD')->on('TDLVORD_BRANCH', '=', 'MCUS_BRANCH');
            })
            ->leftJoin('T_DLVORDDETA', 'TDLVORD_DLVCD', 'TDLVORDDETA_DLVCD')
            ->leftJoin('T_SLOHEAD', 'TDLVORDDETA_SLOCD', 'TSLO_SLOCD')
            ->leftJoin('T_QUOHEAD', 'TSLO_QUOCD', 'TQUO_QUOCD')
            ->where("TDLVORD_DLVCD", $doc)
            ->where('TDLVORD_BRANCH', Auth::user()->branch)
            ->groupBy(
                'TDLVORD_ISSUDT',
                'MCUS_CUSNM',
                'MCUS_ADDR1',
                'TDLVORD_REMARK',
                'MCUS_TELNO',
                'TDLVORD_INVCD',
                'TDLVORD_LINE',
                'TQUO_PROJECT_LOCATION'
            )
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
        )
            ->leftJoin('M_ITM', function ($join) {
                $join->on('TDLVORDDETA_ITMCD', '=', 'MITM_ITMCD')->on('TDLVORDDETA_BRANCH', '=', 'MITM_BRANCH');
            })
            ->where('TDLVORDDETA_DLVCD', $doc)
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

            $Subject = T_QUOHEAD::on($this->dedicatedConnection)
                ->where('TQUO_QUOCD', $Attn->TSLO_QUOCD)
                ->where('TQUO_BRANCH', Auth::user()->branch)
                ->first();
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
        }
        if (in_array($this->dedicatedConnection, ['connect_jos_retail', 'connect_jos_service'])) {
            $PPNAmount = 0;
        } else {
            $PPNAmount = $totalHargaSewa * 11 / 100;
        }

        $subjek = ucwords(trim(str_replace('penawaran', '', strtolower($Subject->TQUO_SBJCT))));
        $terbilang = ucwords(rtrim($this->numberToSentence($PPNAmount + $totalHargaSewa)));

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
        $this->fpdf->Cell(29, 5, 'NO : ' . $doc, 0, 0, 'C');

        $this->fpdf->SetFont('Arial', '', 9);
        $this->fpdf->SetXY(3, 30);
        $this->fpdf->Cell(29, 5, 'Dengan kendaraan No. Pol: , kami kirimkan barang-barang di bawah ini :', 0, 0, 'L');
        $this->fpdf->SetXY(150, 30);
        $this->fpdf->Cell(25, 5, date('d M Y H:i:s'), 0, 0, 'L');
        $this->fpdf->Line(3, 35, 205, 35);
        $this->fpdf->Line(3, 36, 205, 36);
        $this->fpdf->Line(3, 42, 205, 42);
        $this->fpdf->Line(3, 43, 205, 43);

        # body
        $nomor = 1;
        $Y = 45;
        foreach ($RSDetail as $r) {
            $this->fpdf->SetXY(3, $Y);
            $this->fpdf->Cell(12, 5, $nomor++, 0, 0, 'L');
            $this->fpdf->Cell(40, 5, $r->TDLVORDDETA_ITMCD, 0, 0, 'L');
            $this->fpdf->Cell(67, 5, $r->MITM_ITMNM, 0, 0, 'L');
            $this->fpdf->Cell(20, 5, $r->TDLVORDDETA_ITMQT . ' ' . $r->MITM_STKUOM, 0, 0, 'R');
            $Y += 5;
        }

        # baris bawah
        $this->fpdf->Line(3, 90, 205, 90);
        $this->fpdf->Line(3, 91, 205, 91);
        $this->fpdf->Line(3, 97, 205, 97);
        $this->fpdf->Line(3, 98, 205, 98);
        $this->fpdf->SetXY(3, 36.5);
        $this->fpdf->Cell(29, 5, 'No', 0, 0, 'L');
        $this->fpdf->SetXY(15, 36.5);
        $this->fpdf->Cell(29, 5, 'Part Number', 0, 0, 'L');
        $this->fpdf->SetXY(55, 36.5);
        $this->fpdf->Cell(29, 5, 'Nama Barang', 0, 0, 'L');
        $this->fpdf->SetXY(135, 36.5);
        $this->fpdf->Cell(29, 5, 'Qty', 0, 0, 'L');
        $this->fpdf->SetXY(150, 36.5);
        $this->fpdf->Cell(29, 5, 'Lokasi Barang', 0, 0, 'L');

        $this->fpdf->SetXY(3, 92);
        // $this->fpdf->Cell(29, 5, 'Ket:' . $RSHeader->TDLVORD_REMARK, 0, 0, 'L');
        $this->fpdf->Cell(29, 5, $RSHeader->TQUO_PROJECT_LOCATION, 0, 0, 'L');

        $this->fpdf->SetFont('Arial', '', 7);
        $this->fpdf->SetXY(3, 107);
        $this->fpdf->Cell(29, 5, '- Jam Kerja (08:00-16:00), di luar jam kerja ditambah biaya lembur 50% (forklift)', 0, 0, 'L');
        $this->fpdf->SetXY(3, 110);
        $this->fpdf->Cell(29, 5, '- Bila terjadi sesuatu kecelakaan/kerusakan barang di waktu kerja, semuanya ditanggung oleh penyewa', 0, 0, 'L');

        $this->fpdf->SetFont('Arial', '', 9);
        $this->fpdf->SetXY(10, 115);
        $this->fpdf->Cell(52, 5, 'Penerima', 0, 0, 'L');
        $this->fpdf->Cell(48, 5, 'Sopir', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, 'Ks. Gudang', 0, 0, 'L');
        $this->fpdf->Cell(50, 5, 'Dibuat Oleh', 0, 0, 'L');
        $this->fpdf->SetXY(9, 138);
        $this->fpdf->Cell(50, 2, '(                   )', 0, 0, 'L');
        $this->fpdf->Cell(50, 2, '(                   )', 0, 0, 'L');
        $this->fpdf->Cell(50, 2, '(                       )', 0, 0, 'L');
        $this->fpdf->Cell(5, 2, '(' . $Dibuat->name . ')', 0, 0, 'L');
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
}
