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
        <div style="text-align: center; font-size: 20px;padding-bottom: 15px"><span><strong>PART REQUEST</strong></span></div>
    </div>

    <div class="row">
        <div class="col">
            <table style="font-size: 13px">
                <tr>
                    <td>Inv No</td>
                    <td>:</td>
                    <td>{{$data[0]['TLOCREQ_DOCNO']}}</td>
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
            maka berikut kami membutuhkan part berikut :
        </div>
    </div>

    <table class="tg">
        <thead>
            <tr>
                <th class="tg-0lax"><b>Item Code</b></th>
                <th class="tg-0lax"><b>Item Name</b></th>
                <th class="tg-0lax"><b>Qty</b></th>
            </tr>
        </thead>
        <tbody>
            @foreach($data as $key => $valueDet)
            <tr>
                <td class="tg-0lax">{{$valueDet['TLOCREQ_ITMCD']}}</td>
                <td class="tg-0lax">{{$valueDet['MITM_ITMNM']}}</td>
                <td class="tg-0lax">{{number_format($valueDet['TSRVF_QTY'],0,".",",")}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="row" style="font-size: 13px; position: absolute;
            bottom: 10em; right: 10em">
        <div class="col12">
            {{date('d M Y');}}
        </div>

        <div class="row" style="padding-top: 7em">
            (..................)
        </div>
    </div>
</body>

</html>
