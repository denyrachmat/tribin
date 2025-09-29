<!DOCTYPE html>
<html>

<head>
    <style>
        @page {
            margin: 0px;
        }

        @media print {
            .pagebreak {
                page-break-before: always;
            }

            /* page-break-after works, as well */
        }

        .pagebreak {
            clear: both;
            page-break-after: always;
        }

        body {
            margin: 15px;
            font-family: arial, sans-serif;
            height: 100vh;
        }

        .header,
        .footer {
            width: 100%;
            text-align: center;
            position: fixed;
        }

        .header {
            top: 5px;
        }

        .footer {
            bottom: 0px;
        }

        .pagenum:before {
            content: counter(page);
        }

        hr {
            background-color: white;
            margin: 0 0 10px 0;
            border-width: 0;
        }

        hr.s1 {
            height: 5px;
            border-top: 1px solid black;
            border-bottom: 2px solid black;
        }

        .row {
            display: flex;
        }

        .col {
            float: left;
            width: 50%;
        }

        .col1 {
            float: left;
            width: 20%;
        }

        .col2 {
            float: left;
            width: 40%;
        }

        .col3 {
            float: left;
            width: 60%;
        }

        .col4 {
            float: left;
            width: 80%;
        }

        .col5 {
            float: left;
            width: 100%;
        }

        /* Clear floats after the columns */
        .row:after {
            content: "";
            display: table;
            clear: both;
        }

        .tg {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100%;
        }

        .tg td {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 10px;
            overflow: hidden;
            padding: 5px 5px;
            word-break: normal;
        }

        .tg th {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 10px;
            font-weight: normal;
            overflow: hidden;
            padding: 5px 5px;
            word-break: normal;
        }

        .tg .tg-0lax {
            text-align: left;
            vertical-align: top
        }
    </style>
</head>

<body>
    <div style="text-align: center">
        <div style="text-align: center; font-size: 32px;padding-bottom: 15px"><span
                style="text-decoration: underline;"><strong>{{$header}}</strong></span></div>
        <div style="text-align: center; font-size: 16px;padding-bottom: 4px"><strong>{{$subHeader}}</strong></div>
        <div style="text-align: center;font-size: 12px;padding-bottom: 10px"><strong>{{$addr}}</strong></div>
        <div style="text-align: center;font-size: 12px;padding-bottom: 10px"><strong>{{$telp}}</strong></div>
    </div>

    <div>
        <hr class="s1">
    </div>

    <div>
        <div style="text-align: center; font-size: 25px;padding-bottom: 15px"><span><strong>PROFORMA
                    INVOICE</strong></span>
        </div>
    </div>

    <div class="row">
        <div class="col3">
            <table style="font-size: 12px">
                <tr>
                    <td>To</td>
                    <td>:</td>
                    <td>{{$MCUS_CUSNM}}</td>
                </tr>
                <tr>
                    <td>Attn</td>
                    <td>:</td>
                    <td>{{$TQUO_ATTN}}</td>
                </tr>
                <tr>
                    <td>Telp. / Fax</td>
                    <td>:</td>
                    <td>{{$MCUS_TELNO}}</td>
                </tr>
                <tr>
                    <td>Subject</td>
                    <td>:</td>
                    <td>{{$TQUO_SBJCT}}</td>
                </tr>
                <tr>
                    <td>Lokasi</td>
                    <td>:</td>
                    <td>{{$TQUO_PROJECT_LOCATION}}</td>
                </tr>
            </table>
        </div>
        <div class="col">
            <table style="font-size: 12px">
                <tr>
                    <td>SO No</td>
                    <td>:</td>
                    <td>{{$TSLO_SLOCD}}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>:</td>
                    <td>{{date('d-M-Y', strtotime($TSLO_ISSUDT))}}</td>
                </tr>
                <tr>
                    <td>Telp. / Fax</td>
                    <td>:</td>
                    <td>{{$telp}}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row" style="font-size: 12px; padding-top: 10px">
        <div class="col5">
            Dengan hormat,
            <br><br>
            Bersama ini kami lakukan penagihan atas {{$TQUO_SBJCT}} dengan rincian sebagai berikut :
        </div>
    </div>

    <!-- <div class="row" style="font-size: 12px; padding-top: 10px">
        No PR: {{$TSLO_POCD}}
    </div> -->
    <div class="row" style="font-size: 12px; padding-top: 5px">
        <div class="col5">
            <table class="tg">
                <thead>
                    <tr>
                        <!-- <th class="tg-0lax"><b>Merk</b></th> -->
                        <th class="tg-0lax"><b>Capacity / Model</b></th>
                        <th class="tg-0lax"><b>Pemakaian / Periode</b></th>
                        <th class="tg-0lax"><b>Qty</b></th>
                        <th class="tg-0lax"><b>{{$TQUO_TYPE > 2 ? 'Total Harga Barang' : 'Total Harga Sewa'}}</b></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($det as $key => $value)
                        <tr>
                            <!-- <td class="tg-0lax">{{$value['MITM_BRAND']}}</td> -->
                            <td class="tg-0lax">{{$value['MITM_ITMNM']}}</td>
                            <td class="tg-0lax">{{date('d M Y', strtotime($value['TSLODETA_PERIOD_FR']))}} -
                                {{date('d M Y', strtotime($value['TSLODETA_PERIOD_TO']))}}</td>

                            <td class="tg-0lax">{{$value['TSLODETA_ITMQT']}}</td>
                            <td class="tg-0lax">Rp {{number_format($value['TSLODETA_PRC'], 0, ".", ",") }}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="row" style="font-size: 12px; padding-top: 10px">
        <div class="col5" style="text-align:right">
            <table style="padding-left: 20%">
                <tr>
                    <td><b>Total</b></td>
                    <td><b>:</b></td>
                    <td><b>Rp {{number_format($total, 0, ".", ",")}}</b></td>
                </tr>
                @foreach($taxes as $key => $valueTax)
                    @php
                        $taxSum = is_array($valueTax['TTAXM_TAXAMT']) ? array_sum($valueTax['TTAXM_TAXAMT']) : 0;
                    @endphp
                    <tr>
                        <td><b>{{$valueTax['MTAX_DESC']}}</b></td>
                        <td><b>:</b></td>
                        <td><b>Rp {{number_format($valueTax['TTAXM_TAXAMT'], 0, ".", ",")}}</b></td>
                    </tr>
                @endforeach
                <tr>
                    <td><b>Total Tagihan</b></td>
                    <td><b>:</b></td>
                    <td><b>Rp {{number_format($totalAll, 0, ".", ",")}}</b></td>
                </tr>
                <tr>
                    <td><b>Terbilang</b></td>
                    <td><b>:</b></td>
                    <td><b>{{$terbilang}} Rupiah</b></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row" style="font-size: 12px; padding-top: 10px">
        <div class="col5">
            Invoice/tagihan tersebut agar dapat ditransfer ke rekening kami sebagai berikut :
        </div>
    </div>

    <div class="row" style="font-size: 12px; padding-top: 10px">
        <div class="col5">
            <table class="tg">
                <thead>
                    <tr>
                        <td class="tg-0lax"><b>BANK</b></td>
                        <td class="tg-0lax"><b>Atas Name</b></td>
                        <td class="tg-0lax"><b>No Rekening</b></td>
                    </tr>
                </thead>
                <tbody>
                    @foreach($payment as $key => $valuePayment)
                        <tr>
                            <td class="tg-0lax">{{$valuePayment['bank_name']}}</td>
                            <td class="tg-0lax">{{$valuePayment['bank_account_name']}}</td>
                            <td class="tg-0lax">{{$valuePayment['bank_account_number']}}</td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="row" style="font-size: 12px; padding-top: 10px">
        <div class="col5">
            Pada keterangan slip transfer mohon diisi sejelas-jelasnya, seperti nama penyewa, periode, nomor invoice dan
            sebagainya.
            Untuk Pembayaran yang menggunakan Bilyet Giro/Cheque, dianggap lunas jika dana sudah masuk ke rekening kami.
        </div>
    </div>

    <div class="row" style="font-size: 12px; padding-top: 10px">
        <div class="col5">
            Demikian Invoice kami buat, atas perhatian dan kerjasama yang baik kami sampaikan terima kasih
        </div>
    </div>

    <div class="row" style="font-size: 12px;padding-top: 5em; left: 10em">
        @foreach ($approvalList as $approval)
            <div class="col5">
                {{$approval['remarks']}}

                <div class="row" style="padding-top: 7em">
                    {{ $approval['name'] }}
                </div>
            </div>
        @endforeach
    </div>
</body>

</html>
