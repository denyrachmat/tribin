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
            width: 100% !important;
        }

        .tg {
            border-collapse: collapse;
            border-spacing: 0;
            width: 100% !important;
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
        <div style="text-align: center; font-size: 32px;padding-bottom: 15px"><span
                style="text-decoration: underline;"><strong>{{$header}}</strong></span></div>
        <div style="text-align: center; font-size: 16px;padding-bottom: 4px"><strong>{{$subHeader}}</strong></div>
        <div style="text-align: center;font-size: 13px;padding-bottom: 10px"><strong>{{$addr}}</strong></div>
    </div>

    <div>
        <hr class="s1">
    </div>

    <div>
        <div style="text-align: center; font-size: 20px;padding-bottom: 15px"><span><strong>BUKTI TANDA
                    TERIMA</strong></span></div>
    </div>

    <div class="row">
        <div class="col">
            <table style="font-size: 13px">
                <tr>
                    <td>Inv No</td>
                    <td>:</td>
                    <td>{{$data[0]['TLOCREQ_DOCNO']}}</td>
                </tr>
                <tr>
                    <td>Date</td>
                    <td>:</td>
                    <td>{{date('d M Y')}}</td>
                </tr>
            </table>
        </div>
    </div>

    <div class="row">
        <div class="col12">
            <h3>Serah Terima</h3>
            <div style="font-size: 13px;padding-bottom:10">
                Dengan ini kami menyatakan bahwa kami telah menerima sejumlah barang dalam kondisi baik dengan jumlah dan deskripsi sebagai berikut :
            </div>
            <table class="tg">
                <thead>
                    <tr>
                        <th class="tg-0lax"><b>Item Code</b></th>
                        <th class="tg-0lax"><b>Item Name</b></th>
                        <th class="tg-0lax"><b>Qty</b></th>
                        <th class="tg-0lax"><b>Remarks</b></th>
                    </tr>
                </thead>
                <tbody>
                    @foreach(array_filter($data, function ($f) {
                            return $f['TLOCREQ_ISREP'] == 0;
                        }) as $key => $valueDet)
                                            <tr>
                                                <td class="tg-0lax">{{$valueDet['TLOCREQ_ITMCD']}}</td>
                                                <td class="tg-0lax">{{$valueDet['MITM_ITMNM']}}</td>
                                                <td class="tg-0lax">{{number_format($valueDet['TLOCREQ_QTY'], 0, ".", ",")}}</td>
                                                <td class="tg-0lax"></td>
                                            </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>

    <div class="row" style="font-size: 13px; position: absolute;
            bottom: 10em; right: 2em">
        <table class="tg">
            <tr>
                <td>Diserahkan Oleh :</td>
                <td>Diterima Oleh</td>
            </tr>
            <tr>
                <td style="height:5em"></td>
                <td style="height:5em"></td>
            </tr>
            <tr>
                <td>Name:</td>
                <td>Name:</td>
            </tr>
        </table>
    </div>

    @if (
            count(array_filter($data, function ($f) {
                return $f['TLOCREQ_ISREP'] == 1;
            })) > 0
        )
            <div class="pagebreak">
            </div>
            <div style="text-align: center">
                <div style="text-align: center; font-size: 32px;padding-bottom: 15px"><span
                        style="text-decoration: underline;"><strong>{{$header}}</strong></span></div>
                <div style="text-align: center; font-size: 16px;padding-bottom: 4px"><strong>{{$subHeader}}</strong></div>
                <div style="text-align: center;font-size: 13px;padding-bottom: 10px"><strong>{{$addr}}</strong></div>
            </div>

            <div>
                <hr class="s1">
            </div>

            <div>
                <div style="text-align: center; font-size: 20px;padding-bottom: 15px"><span><strong>BUKTI TANDA
                            TERIMA</strong></span></div>
            </div>

            <div class="row">
                <div class="col">
                    <table style="font-size: 13px">
                        <tr>
                            <td>Inv No</td>
                            <td>:</td>
                            <td>{{$data[0]['TLOCREQ_DOCNO']}}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>:</td>
                            <td>{{date('d M Y')}}</td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="row">
                <div class="col12">
                    <h3>Menerima</h3>
                    <table class="tg">
                        <thead>
                            <tr>
                                <th class="tg-0lax"><b>Item Code</b></th>
                                <th class="tg-0lax"><b>Item Name</b></th>
                                <th class="tg-0lax"><b>Qty</b></th>
                                <th class="tg-0lax"><b>Remarks</b></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach(array_filter($data, function ($f) {
                                    return $f['TLOCREQ_ISREP'] == 1;
                                }) as $key => $valueDet)
                                                <tr>
                                                    <td class="tg-0lax">{{$valueDet['TLOCREQ_ITMCD']}}</td>
                                                    <td class="tg-0lax">{{$valueDet['MITM_ITMNM']}}</td>
                                                    <td class="tg-0lax">{{number_format($valueDet['TLOCREQ_QTY'], 0, ".", ",")}}</td>
                                                    <td class="tg-0lax"></td>
                                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>
            </div>

            <div class="row" style="font-size: 13px; position: absolute;
                                            bottom: 10em; right: 2em">
                <table class="tg">
                    <tr>
                        <td>Diserahkan Oleh :</td>
                        <td>Diterima Oleh</td>
                    </tr>
                    <tr>
                        <td style="height:5em"></td>
                        <td style="height:5em"></td>
                    </tr>
                    <tr>
                        <td>Name:</td>
                        <td>Name:</td>
                    </tr>
                </table>
            </div>
    @endif
</body>