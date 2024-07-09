<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barcode Print</title>
    <link href="{{ url('assets/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <style>
        @page {
            margin: 10px;
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

        .border-5 {
            border: 1px solid black;
            border-width: 0.1em;
        }

        .line{
            width: 100%;
            /* height: 47px; */
            border-bottom: 1px solid black;
            padding-bottom: 2px;
            /* position: absolute; */
        }
    </style>
</head>

<body>
<div class="container-md">
    <div class="row row-cols-2">
        @foreach($data as $key => $value)
            <div class="col-xs-6 p-1 text-center">
                <div class="p-1 border-5">
                    <div class="row text-center">
                        <div class="col full-width">
                        <img src="data:image/png;base64,{{DNS1D::getBarcodePNG($value['TRCVBC_BCCD'], 'C39+',1,33)}}" alt="barcode"   />
                        </div>
                    </div>
                    <div class="row text-center">
                        <div class="col">
                            {{$value['TRCVBC_BCCD']}}
                        </div>
                    </div>
                    <div class="line"></div>
                    <div class ="row">
                        <table style="font-size:10">
                            <tr>
                                <td style="width:20%">Item</td>
                                <td style="width:5%">:</td>
                                <td>{{$value['item_code']}}</td>
                            </tr>
                            <tr>
                                <td style="width:20%;">Item Desc</td>
                                <td style="width:5%">:</td>
                                <td>{{$value['MITM_ITMNM']}}</td>
                            </tr>
                            <tr>
                                <td style="width:20%;">Qty</td>
                                <td style="width:5%">:</td>
                                <td>{{$value['TRCVBC_BCQT']}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        @endforeach
    </div>
</div>
</body>

</html>
