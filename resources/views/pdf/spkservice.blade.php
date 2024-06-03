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

    <div>
        <div style="text-align: center; font-size: 20px;padding-bottom: 15px"><span><strong>ESTIMATION SERVICE COST</strong></span></div>
    </div>

    <div class="row">
        <div class="col">
            <table style="font-size: 13px">
                <tr>
                    <td>Inv No</td>
                    <td>:</td>
                    <td>{{$data[0]['SRVH_DOCNO']}}</td>
                </tr>
                <tr>
                    <td>To</td>
                    <td>:</td>
                    <td>{{$data[0]['MCUS_CUSNM']}}</td>
                </tr>
            </table>
        </div>
        <div class="col">
            <table style="font-size: 13px">
                <tr>
                    <td>Phone</td>
                    <td>:</td>
                    <td>{{$data[0]['MCUS_PIC_TELNO']}}</td>
                </tr>
                <tr>
                    <td>Address</td>
                    <td>:</td>
                    <td>{{$data[0]['MCUS_ADDR1']}}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row" style="font-size: 13px; padding-top: 10px">
        <div class="col12">
            Dengan hormat,
            <br><br>
            Sehubungan dengan usaha untuk memberikan pelayanan yang memuaskan kepada customer kami,
            <br>
            maka berikut kami berikan total harga pengerjaan dari service tersebut :
        </div>
    </div>

    <div class="row" style="font-size: 13px; padding-top: 10px">
        <div class="col12">
            <table class="tg">
                <thead>
                    <tr>
                        <th class="tg-0lax"><b>Item Name</b></th>
                        <th class="tg-0lax"><b>Note</b></th>
                        <th class="tg-0lax"><b>Qty</b></th>
                        <th class="tg-0lax"><b>Note From Tech.</b></th>
                        <th class="tg-0lax"><b>Fix Price</b></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($data[0]['detail'] as $key => $value)
                    <tr>
                        <td class="tg-0lax">{{$value['TSRVD_ITMCD']}}</td>
                        <td class="tg-0lax">{{$value['TSRVD_CUSTRMK']}}</td>
                        <td class="tg-0lax">{{$value['TSRVD_QTY']}}</td>
                        <td class="tg-0lax">{!!$value['TSRVD_REMARK']!!}</td>
                        <td class="tg-0lax">Rp {{number_format(array_sum(array_column($value['list_fix_det'], 'SUBTOT_AMT')),0,".",",") }}</td>
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="row" style="font-size: 13px; padding-top: 10px">
        <div class="col12" style="text-align:right">
            <table style="padding-left: 20%">
                @if($isPPN == 1)
                <tr>
                    <td><b>Total</b></td>
                    <td><b>:</b></td>
                    <td><b>Rp {{number_format($total,0,".",",")}}</b></td>
                </tr>
                <tr>
                    <td><b>PPN (11%)</b></td>
                    <td><b>:</b></td>
                    <td><b>Rp {{number_format($ppn,0,".",",")}}</b></td>
                </tr>
                <tr>
                    <td><b>Total Tagihan</b></td>
                    <td><b>:</b></td>
                    <td><b>Rp {{number_format($total + $ppn,0,".",",")}}</b></td>
                </tr>
                @else
                <tr>
                    <td><b>Total</b></td>
                    <td><b>:</b></td>
                    <td><b>Rp {{number_format($total,0,".",",")}}</b></td>
                </tr>
                @endif
                <tr>
                    <td><b>Terbilang</b></td>
                    <td><b>:</b></td>
                    <td><b>{{$terbilang}} Rupiah</b></td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row" style="font-size: 13px; padding-top: 10px">
        <div class="col12">
            Adapun rincian part serta harga yang di gunakan, kami lampirkan di halaman berikutnya
            <br><br>
            Hormat Kami,<br>
            {{$header}}
        </div>
    </div>

    <div class="row" style="font-size: 13px; position: absolute;
            bottom: 10em; right: 10em">
        <div class="col12">
            {{date('d M Y');}}
        </div>

        <div class="row" style="padding-top: 7em">
            (..................)
        </div>
    </div>

    <div class="pagebreak">
    </div>

    @foreach($data[0]['detail'] as $key => $value2)
    <div class="row" style="font-size: 13px; padding-top: 10px">
        <div class="col12">
            <table>
                <tr>
                    <td><b>Item</b></td>
                    <td><b>:</b></td>
                    <td><b>{{$value2['TSRVD_ITMCD']}}</b></td>
                </tr>
            </table>
        </div>
    </div>
    <div class="row" style="font-size: 13px; padding-top: 10px">
        <div class="col12">
            <table class="tg">
                <thead>
                    <tr>
                        <th class="tg-0lax"><b>Item Code</b></th>
                        <th class="tg-0lax"><b>Item Name</b></th>
                        <th class="tg-0lax"><b>Price</b></th>
                        <th class="tg-0lax"><b>Qty</b></th>
                        <th class="tg-0lax"><b>Total Price</b></th>
                    </tr>
                </thead>
                <tbody>
                    @php $tot = 0; @endphp
                    @foreach($value2['list_fix_det'] as $key => $valueDet)
                    @php $tot += $valueDet['SUBTOT_AMT']; @endphp
                    <tr>
                        <td class="tg-0lax">{{$valueDet['MITM_ITMCD']}}</td>
                        <td class="tg-0lax">{{$valueDet['MITM_ITMNM']}}</td>
                        <td class="tg-0lax">Rp {{number_format($valueDet['TSRVF_PRC'],0,".",",")}}</td>
                        <td class="tg-0lax">{{number_format($valueDet['TSRVF_QTY'],0,".",",")}}</td>
                        <td class="tg-0lax">Rp {{number_format($valueDet['SUBTOT_AMT'],0,".",",")}}</td>
                    </tr>
                    @endforeach
                    <tr>
                        <td class="tg-0lax" colspan=4 style="text-align: right"><b>Total</b></td>
                        <td class="tg-0lax"><b>Rp {{number_format($tot, 0, ".", ",")}}</b></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    @endforeach
</body>

</html>
