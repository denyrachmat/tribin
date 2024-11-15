<style type="text/css">
    .tg {
        border-collapse: collapse;
        border-spacing: 0;
    }

    .tg td {
        border-color: black;
        border-style: solid;
        border-width: 1px;
        font-family: Arial, sans-serif;
        font-size: 10px;
        overflow: hidden;
        padding: 10px 5px;
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
        padding: 10px 5px;
        word-break: normal;
    }
    .tg2 {
        border-collapse: collapse;
        border-spacing: 0;
    }

    .tg2 td {
        border-color: black;
        border-style: solid;
        border-width: 0px;
        font-family: Arial, sans-serif;
        font-size: 15px;
        overflow: hidden;
        padding: 10px 5px;
        word-break: normal;
        font-style: bold;
    }

    .tg2 th {
        border-color: black;
        border-style: solid;
        border-width: 0px;
        font-family: Arial, sans-serif;
        font-size: 15px;
        font-weight: normal;
        overflow: hidden;
        padding: 10px 5px;
        word-break: normal;
    }

    .tg .tg-0lax {
        text-align: left;
        vertical-align: top
    }

    .tg .tg-0laxa {
        text-align: left;
        vertical-align: top;
        font-size: 12px;
        font-style: bold;
    }
</style>
<div style="text-align: center;">
    <h2 style="font-family: Arial, sans-serif; font-style: bold">Sales Report by Day</h2>
    <br>
    <span style="font-family: Arial, sans-serif; font-style: bold">From {{date('d M Y', strtotime($dateRange[0]))}} to {{date('d M Y', strtotime($dateRange[1]))}}</span>
    <br>
</div>
<table class="tg">
    <thead style="font-family: Arial, sans-serif; font-style: bold;">
        <tr>
            <th class="tg-0lax">Item Code</th>
            <th class="tg-0lax">Item Name</th>
            <th class="tg-0lax">No Nota</th>
            <th class="tg-0lax">Lokasi</th>
            <th class="tg-0lax">Sopir</th>
            <th class="tg-0lax">Operator</th>
            <th class="tg-0lax">Perusahaan</th>
            <th class="tg-0lax">Jumlah</th>
            <th class="tg-0lax">Status Bayar</th>
            <th class="tg-0lax">Marketing</th>
            <th class="tg-0lax">Tgl Awal</th>
            <th class="tg-0lax">Tgl Akhir</th>
        </tr>
    </thead>
    <tbody style="page-break-inside: avoid;">
        @php
        $total = 0;
        @endphp
        @foreach($data as $key => $value)
        <tr style="page-break-inside: avoid;">
            <td class="tg-0lax" style="text-align: center;" colspan="12">
                <h3>{{$key}}</h3>
            </td>
        </tr>
        @php
        $subtotal = 0;
        @endphp
        @foreach($value as $keyDet => $valueDet)
        @php
        $subtotal += $valueDet['TSLODETA_ITMQT'];
        $total += $valueDet['TSLODETA_ITMQT'];
        @endphp
        <tr>
            <td class="tg-0lax" style="text-align: left;">{{$valueDet['MITM_ITMCD']}}</td>
            <td class="tg-0lax" style="text-align: left;">{{$valueDet['MITM_ITMNM']}}</td>
            <td class="tg-0lax" style="text-align: left;"></td>
            <td class="tg-0lax" style="text-align: left;">{{$valueDet['TQUO_PROJECT_LOCATION']}}</td>
            <td class="tg-0lax" style="text-align: left;">{{$valueDet['CSPK_PIC_AS'] == 'DRIVER' ? $valueDet['CSPK_PIC_NAME'] : ''}}</td>
            <td class="tg-0lax" style="text-align: left;">{{$valueDet['CSPK_PIC_AS'] == 'OPERATOR' ? $valueDet['CSPK_PIC_NAME'] : ''}}</td>
            <td class="tg-0lax" style="text-align: left;">{{$valueDet['MCUS_CUSNM']}}</td>
            <td class="tg-0lax" style="text-align: right;">Rp {{number_format($valueDet['TSLODETA_ITMQT'])}}</td>
            <td class="tg-0lax" style="text-align: left;"></td>
            <td class="tg-0lax" style="text-align: left;">{{$valueDet['name']}}</td>
            <td class="tg-0lax" style="text-align: left;">{{date('d M Y', strtotime($valueDet['TSLODETA_PERIOD_FR']))}}</td>
            <td class="tg-0lax" style="text-align: left;">{{date('d M Y', strtotime($valueDet['TSLODETA_PERIOD_TO']))}}</td>
        </tr>
        @endforeach
        <tr>
            <td class="tg-0laxa" style="text-align: left;" colspan="7">
                Subtotal
            </td>
            <td class="tg-0laxa" style="text-align: right; font-size:9px">Rp {{number_format($subtotal)}}</td>
            <td class="tg-0laxa" style="text-align: center;" colspan="4">
            </td>
        </tr>
        @endforeach
        <tr>
            <td class="tg-0laxa" style="text-align: left;" colspan="7">
                Grand Total
            </td>
            <td class="tg-0laxa" style="text-align: right; font-size:9px">Rp {{number_format($total)}}</td>
            <td class="tg-0laxa" style="text-align: center;" colspan="4">
            </td>
        </tr>
    </tbody>
</table>

<table class="tg2" style="margin-top: 5em;width:100%;text-align:center;border:0">
    <tr>
        <td colspan="3">Dibuat Oleh</td>
        <td>Diperiksa Oleh</td>
        <td colspan="3">Diketahui Oleh</td>
    </tr>
    <tr>
        <td colspan="7"></td>
    </tr>
    <tr>
        <td colspan="7"></td>
    </tr>
    <tr>
        <td colspan="7"></td>
    </tr>
    <tr>
        <td colspan="7"></td>
    </tr>
    <tr>
        <td colspan="3">{{Auth::user()->name}}</td>
        <td>Manager Acc</td>
        <td colspan="3">Pimpinan</td>
    </tr>
</table>
