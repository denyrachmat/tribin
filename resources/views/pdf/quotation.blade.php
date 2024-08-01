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

            table {
                page-break-inside: auto
            }

            div {
                page-break-inside: avoid;
            }

            /* This is the key */
            thead {
                display: table-header-group
            }

            tfoot {
                display: table-footer-group
            }

            /* page-break-after works, as well */

            footer {
                position: fixed;
                text-align: center;
                bottom: 15px;
                width: 95%;
            }

            body {
                margin: 0;
                font-family: arial, sans-serif;
                height: 100vh;
            }
        }

        .avoid {
            page-break-inside: avoid !important;
            margin: 4px 0 4px 0;
            /* to keep the page break from cutting too close to the text in the div */
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

        footer {
            position: fixed;
            text-align: center;
            bottom: 15px;
            width: 95%;
        }

        .header,
        .footer {
            width: 100%;
            text-align: center;
            position: fixed;
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
            width: 10%;
        }

        .col12 {
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
            font-size: 12px;
            overflow: hidden;
            padding: 5px 5px;
            word-break: normal;
        }

        .tg th {
            border-color: black;
            border-style: solid;
            border-width: 1px;
            font-family: Arial, sans-serif;
            font-size: 12px;
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
        <div style="text-align: center; font-size: 32px;padding-bottom: 15px"><span style="text-decoration: underline;"><strong>{{$header}}</strong></span></div>
        <div style="text-align: center; font-size: 16px;padding-bottom: 4px"><strong>{{$subHeader}}</strong></div>
        <div style="text-align: center;font-size: 13px;padding-bottom: 10px"><strong>{{$addr}}</strong></div>
        <div style="text-align: center;font-size: 13px;padding-bottom: 10px"><strong>{{$telp}}</strong></div>
    </div>

    <div>
        <hr class="s1">
    </div>

    <div class="row">
        <div class="col">
            <table style="font-size: 9">
                <tr>
                    <td>To</td>
                    <td>:</td>
                    <td>{{$headerQuo->MCUS_CUSNM}}</td>
                </tr>
                <tr>
                    <td>Attn</td>
                    <td>:</td>
                    <td>{{$headerQuo->TQUO_ATTN}}</td>
                </tr>
                <tr>
                    <td>Telp</td>
                    <td>:</td>
                    <td>{{$headerQuo->MCUS_TELNO}}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Subject</td>
                    <td>:</td>
                    <td>{{$headerQuo->TQUO_SBJCT}}</td>
                </tr>
                <tr>
                    <td>Project Location</td>
                    <td>:</td>
                    <td>{{$headerQuo->TQUO_PROJECT_LOCATION}}</td>
                </tr>
            </table>
        </div>
        <div class="col">
            <table style="font-size: 9">
                <tr>
                    <td>Date</td>
                    <td>:</td>
                    <td>{{$quoIssDate}}</td>
                </tr>
                <tr>
                    <td>Our Ref</td>
                    <td>:</td>
                    <td>{{$ref}}</td>
                </tr>
                <tr>
                    <td>From</td>
                    <td>:</td>
                    <td>{{$users->name}}</td>
                </tr>
                <tr>
                    <td>Telp</td>
                    <td>:</td>
                    <td>{{$users->phone}}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>:</td>
                    <td>{{$users->email}}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row" style="padding-top:5px;font-size: 9">
        <div class="col-12">
            <table>
                @if($headerQuo->TQUO_TYPE === 1)
                <tr>
                    <td>
                        <span>Bersama ini kami sampaikan {{$headerQuo->TQUO_SBJCT}} dengan data sebagai berikut :</span>
                    </td>
                </tr>
                @else
                <tr>
                    <td>
                        <span>Sebelumnya kami ucapkan terima kasih atas kepercayaan yang diberikan kepada kami,</span>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span>dengan ini kami sampaikan surat penawaran dengan rincian sebagai berikut :</span>
                    </td>
                </tr>
                @endif
            </table>
        </div>
    </div>

    <div class="row" style="padding-top:5px;font-size: 9">
        <div class="col-12">
        @if($headerQuo->TQUO_TYPE == 1)
            <table class="tg">
                <thead>
                    <tr>
                        <th class="tg-0lax" style="text-align:center">No</td>
                        <th class="tg-0lax" style="text-align:center">Item</td>
                        <th class="tg-0lax" style="text-align:center">Pemakaian</td>
                            @if(count($checkIsTruckCount) === 0)
                        <th class="tg-0lax" style="text-align:center">Freq / Volt</td>
                            @endif
                        <th class="tg-0lax" style="text-align:center">Qty</td>
                        <th class="tg-0lax" style="text-align:center">Harga Sewa</td>
                        <th class="tg-0lax" style="text-align:center">Total</td>
                    </tr>
                </thead>
                <tbody>
                    @php
    $totalAll = 0;
                    @endphp
                    @foreach($listQuoDet as $keyQuoDet => $valueQuoDet)
                    <tr>
                        <td class="tg-0lax">{{$keyQuoDet + 1}}</td>
                        <td class="tg-0lax">{{$valueQuoDet['MITM_ITMNM']}}</td>
                        <td class="tg-0lax">{{$valueQuoDet['TQUODETA_USAGE_DESCRIPTION']}}</td>
                        @if(count($checkIsTruckCount) === 0)
                        <td class="tg-0lax">{{$valueQuoDet['TQUODETA_ELECTRICITY']}}</td>
                        @endif
                        <td class="tg-0lax">{{$valueQuoDet['TQUODETA_ITMQT']}}</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($valueQuoDet['TQUODETA_PRC'])}}</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($valueQuoDet['TQUODETA_PRC'] * $valueQuoDet['TQUODETA_ITMQT'])}}</td>
                    </tr>

                    @php
        $totalAll += ($valueQuoDet['TQUODETA_PRC'] * $valueQuoDet['TQUODETA_ITMQT']);
                    @endphp
                    @endforeach
                    <tr>
                        <td class="tg-0lax" colspan="{{count($checkIsTruckCount) === 0 ? 6 : 5}}">Total</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($totalAll)}}</td>
                    </tr>
                </tbody>
            </table>
        @else
        <table class="tg">
                <thead>
                    <tr>
                        <th class="tg-0lax" style="text-align:center">No</td>
                        <th class="tg-0lax" style="text-align:center">Keterangan</td>
                        <th class="tg-0lax" style="text-align:center">Jumlah</td>
                        <th class="tg-0lax" style="text-align:center">Satuan</td>
                        <th class="tg-0lax" style="text-align:center">Harga</td>
                        <th class="tg-0lax" style="text-align:center">Total</td>
                    </tr>
                </thead>
                <tbody>
                    @php
    $totalAll = 0;
                    @endphp
                    @foreach($listQuoDet as $keyQuoDet => $valueQuoDet)
                    <tr>
                        <td class="tg-0lax">{{$keyQuoDet + 1}}</td>
                        <td class="tg-0lax">{{$valueQuoDet['MITM_ITMNM']}}</td>
                        <td class="tg-0lax">{{$valueQuoDet['TQUODETA_ITMQT']}}</td>
                        <td class="tg-0lax">{{$valueQuoDet['MITM_STKUOM']}}</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($valueQuoDet['TQUODETA_PRC'])}}</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($valueQuoDet['TQUODETA_PRC'] * $valueQuoDet['TQUODETA_ITMQT'])}}</td>
                    </tr>

                    @php
        $totalAll += ($valueQuoDet['TQUODETA_PRC'] * $valueQuoDet['TQUODETA_ITMQT']);
                    @endphp
                    @endforeach
                    @if($headerQuo->TQUO_SERVTRANS_COST > 0)
                    <tr>
                        <td class="tg-0lax">{{count($listQuoDet) + 1}}</td>
                        <td class="tg-0lax" colspan="4">Service & Transport Cost</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($headerQuo->TQUO_SERVTRANS_COST)}}</td>
                    </tr>
                    @endif
                    <tr>
                        <td class="tg-0lax" colspan="5">Total</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($totalAll + $headerQuo->TQUO_SERVTRANS_COST)}}</td>
                    </tr>
                    <!-- <tr>
                        <td class="tg-0lax" colspan="5">Jasa Service & Transportasi</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($headerQuo->TQUO_SERVTRANS_COST)}}</td>
                    </tr> -->
                    <!-- <tr>
                        <td class="tg-0lax" colspan="5">Grand Total</td>
                        <td class="tg-0lax" style="white-space: nowrap;text-align: right">Rp {{number_format($totalAll + $headerQuo->TQUO_SERVTRANS_COST)}}</td>
                    </tr> -->
                </tbody>
            </table>
        @endif
        </div>
    </div>

    <div class="row" style="padding-top:5px">
        <div class="col-12">
            <table style="font-size: 9">
                <tr>
                    <td colspan=2>TERM OF CONDITION :</td>
                </tr>
                @foreach($listCondition as $key => $valueCond)
                <tr>
                    <td style="width: 3">{{ $key + 1}}.</td>
                    <td>{{ $valueCond['TQUOCOND_CONDI']}}</td>
                </tr>
                @endforeach
            </table>
        </div>
    </div>

        <div class="row" style="padding-top:5px">
            <div class="col-12">
                <table class="tg">
                    <thead>
                        <tr>
                            <th class="tg-0lax">Bank</th>
                            <th class="tg-0lax">Atas Nama</th>
                            <th class="tg-0lax">Nomor Rekening</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($paymentList as $key => $valuePayment)
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

    <div class="avoid">
        <div class="row" style="padding-top:5px">
            <div class="col-12" style="font-size: 9">
                Besar harapan kami penawaran ini dapat menjadi pertimbangan prioritas untuk pengadaan kebutuhan di Perusahaan Bapak / Ibu.
                Demikian kami sampaikan penawaran ini, dan sambil menunggu kabar lebih lanjut, atas perhatian dan kerjasama yang baik kami
                ucapkan banyak terima kasih.
            </div>
        </div>

        <div class="row" style="padding-top:5px">
            <div class="col-12" style="font-size: 9;">
                <table style="width: 100%;text-align:center">
                    <tr>
                        <td>Hormat Kami,</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Dibuat Oleh,</td>
                        <td>Diketahui Oleh,</td>
                        <td>Disetujui Oleh,</td>
                    </tr>
                    <tr>
                        <td style="height: 5em;">
                            <img style="height: 5em;" src="{{storage_path('app/public/mkt_sign.jpg')}}" />
                        </td>
                        <td style="height: 5em;">
                            @if(!empty($headerQuo->TQUO_APPRVDT))
                            <img style="height: 5em;" src="{{storage_path('app/public/dir_sign.jpg')}}" />
                            @endif
                        </td>
                        <td style="height: 5em;"></td>
                    </tr>
                    <tr>
                        <td>{{$headerQuo->created_by}}</td>
                        <td>Syapril, S.T</td> <!-- Harcode sementara -->
                        <td>{{$headerQuo->TQUO_ATTN}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>

    <footer>
        <table class="tg" style="font-size: 9;">
            <tr>
                <td class="tg-0lax" style="text-align: center;">
                    Cetakan dari system komputer tidak memerlukan tanda tangan basah
                </td>
            </tr>
        </table>
    </footer>
</body>
