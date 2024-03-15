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
            table { page-break-after:always }
            div   { page-break-inside:avoid; } /* This is the key */
            thead { display:table-header-group }
            tfoot { display:table-footer-group }

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
            padding: 10px 5px;
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
            padding: 10px 5px;
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
    </div>

    <div>
        <hr class="s1">
    </div>

    <div class="row">
        <div class="col">
            <table style="font-size: 10px">
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
            <table style="font-size: 10px">
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
                    <td>Fax</td>
                    <td>:</td>
                    <td>{{$users->fax}}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row" style="padding-top:1em;font-size: 10">
        <div class="col-12">
            <table>
                <tr>
                    <td>
                        <span>Bersama ini kami sampaikan {{$headerQuo->TQUO_SBJCT}} dengan data sebagai berikut :</span>
                    </td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row" style="padding-top:1em;font-size: 10">
        <div class="col-12">
            <table class="tg">
                <thead>
                    <tr>
                        <th class="tg-0lax">No</td>
                        <th class="tg-0lax">Item</td>
                        <th class="tg-0lax">Pemakaian</td>
                        @if(count($checkIsTruckCount) === 0)
                            <th class="tg-0lax">Freq / Volt</td>
                        @endif
                        <th class="tg-0lax">Qty</td>
                        <th class="tg-0lax">Harga Sewa</td>
                        <th class="tg-0lax">Total</td>
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
                            <td class="tg-0lax" style="white-space: nowrap">Rp {{number_format($valueQuoDet['TQUODETA_PRC'])}}</td>
                            <td class="tg-0lax" style="white-space: nowrap">Rp {{number_format($valueQuoDet['TQUODETA_PRC'] * $valueQuoDet['TQUODETA_ITMQT'])}}</td>                        
                        </tr>

                        @php 
                            $totalAll += ($valueQuoDet['TQUODETA_PRC'] * $valueQuoDet['TQUODETA_ITMQT']);
                        @endphp
                    @endforeach
                    <tr>
                        <td class="tg-0lax" colspan="{{count($checkIsTruckCount) === 0 ? 6 : 5}}">Total</td>
                        <td class="tg-0lax" style="white-space: nowrap">Rp {{number_format($totalAll)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="row" style="padding-top:1em">
        <div class="col-12">
            <table style="font-size: 10">
                <tr>
                    <td colspan=2>RENTAL CONDITION :</td>
                </tr>
                @foreach($listCondition as $key => $valueCond)
                <tr>
                    <td>{{ $key + 1}}.</td>
                    <td>{{ $valueCond['TQUOCOND_CONDI']}}</td>
                </tr>
                @endforeach
            </table>
        </div>
    </div>

    <div class="row" style="padding-top:1em">
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
</body>