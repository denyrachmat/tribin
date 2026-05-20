<style type="text/css">
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
        padding: 5px 5px;
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
        padding: 5px 5px;
        word-break: normal;
    }

    .tg .tg-0lax {
        text-align: left;
        font-size: 7px;
        vertical-align: top
    }

    .tg .tg-0laxa {
        text-align: left;
        vertical-align: top;
        font-size: 10px;
        font-style: bold;
    }

    @media print {
        .page-break {
            page-break-after: always;
        }
    }
</style>
<div style="text-align: center">
    <div style="text-align: center; font-size: 32px;padding-bottom: 15px"><span
            style="text-decoration: underline;"><strong>{{$header}}</strong></span></div>
    <div style="text-align: center; font-size: 16px;padding-bottom: 4px"><strong>{{$subHeader}}</strong></div>
    <div style="text-align: center;font-size: 13px;padding-bottom: 10px"><strong>{{$addr}}</strong></div>
</div>

<div>
    <hr class="s1">
</div>

<div style="text-align: center;">
    <span style="font-family: Arial, sans-serif; font-style: bold; font-size: large;">Sales Report by Customer</span>
    <br>
    <span style="font-family: Arial, sans-serif; font-style: bold">From {{date('d M Y', strtotime($dateRange[0]))}} to
        {{date('d M Y', strtotime($dateRange[1]))}}</span>
</div>

<hr>

<div style="padding-top: 1em">
    <table class="tg">
        <thead style="font-family: Arial, sans-serif; font-style: bold;">
            <tr>
                <th class="tg-0lax">Item Code</th>
                <th class="tg-0lax">Item Name</th>
                <th class="tg-0lax">Satuan</th>
                <th class="tg-0lax">No Nota</th>
                <th class="tg-0lax">Jumlah</th>
                <th class="tg-0lax">Harga Satuan</th>
                <th class="tg-0lax">Pajak</th>
                <th class="tg-0lax">Total Harga</th>
                <th class="tg-0lax">Mekanik</th>
                <th class="tg-0lax">Customer</th>
                <th class="tg-0lax">Unit</th>
                <th class="tg-0lax">Lokasi</th>
                <th class="tg-0lax">Cost</th>
            </tr>
        </thead>
        <tbody style="page-break-inside: avoid;">
            @php
                $total = $totalTax = $totalQty = 0;
            @endphp
            @foreach($data as $key => $rows)
                <tr style="page-break-inside: avoid;">
                    <td class="tg-0lax" style="text-align: center;" colspan="13">
                        <h3>{{ $key }}</h3>
                    </td>
                </tr>

                @php
                    $subtotal = 0;
                    $subtotalQty = 0;
                    $subtotalTax = 0;
                @endphp

                @foreach($rows as $valueDet)
                    @php
                        $subtotal += $valueDet->TSLODETA_ITMQT;
                        $subtotalQty += $valueDet->QTY;
                        $subtotalTax += $valueDet->totalTax;
                        $subtotal += ($valueDet->TSLODETA_ITMQT * $valueDet->PRC);
                        $total += ($valueDet->TSLODETA_ITMQT * $valueDet->PRC);
                        $totalQty += $valueDet->QTY;
                        $totalTax += $valueDet->totalTax;
                    @endphp

                    <tr>
                        <td class="tg-0lax" style="text-align: left;">{{ $valueDet->MITM_ITMCD }}</td>
                        <td class="tg-0lax" style="text-align: left;">{{ $valueDet->MITM_ITMNM }}</td>
                        <td class="tg-0lax" style="text-align: left;">{{ $valueDet->MITM_STKUOM }}</td>
                        <td class="tg-0lax" style="text-align: left;">{{ $valueDet->TDLVORDDETA_DLVCD }}</td>
                        <td class="tg-0lax" style="text-align: right;">{{ number_format($valueDet->QTY) }}</td>
                        <td class="tg-0lax" style="text-align: right;">Rp {{ number_format($valueDet->PRC) }}</td>
                        <td class="tg-0lax" style="text-align: right;">Rp {{ number_format($valueDet->totalTax) }}</td>
                        <td class="tg-0lax" style="text-align: right;">Rp
                            {{ number_format(($valueDet->TSLODETA_ITMQT * $valueDet->PRC) + $valueDet->totalTax) }}</td>
                        <td class="tg-0lax" style="text-align: left;">{{ $valueDet->CSPK_PIC_NAME }} (
                            {{ $valueDet->CSPK_PIC_AS ?? '-' }} )</td>
                        <td class="tg-0lax" style="text-align: left;">{{ $valueDet->MCUS_CUSNM }}</td>
                        <td class="tg-0lax" style="text-align: left;">{{ $valueDet->SERVICED_UNIT }} (
                            {{ $valueDet->SERVICED_UNIT_DESC ?? '-' }} )</td>
                        <td class="tg-0lax" style="text-align: left;">{{ strip_tags($valueDet->TQUO_PROJECT_LOCATION) }}</td>
                        <td class="tg-0lax" style="text-align: left;">Rp {{ number_format($valueDet->BPRICE) }}</td>
                    </tr>
                @endforeach

                <tr>
                    <td class="tg-0laxa" style="text-align: left;" colspan="4">
                        Subtotal
                    </td>
                    <td class="tg-0laxa" style="text-align: right; font-size:7px">{{ number_format($subtotalQty) }}</td>
                    <td class="tg-0laxa" style="text-align: right; font-size:7px"></td>
                    <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{ number_format($subtotalTax) }}</td>
                    <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp
                        {{ number_format($subtotal + $subtotalTax) }}</td>
                    <td class="tg-0laxa" style="text-align: center;" colspan="5"></td>
                </tr>
            @endforeach
            <tr>
                <td class="tg-0laxa" style="text-align: left;" colspan="4">
                    Grand Total
                </td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">{{number_format($totalQty)}}</td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px"></td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($totalTax)}}</td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($total + $totalTax)}}
                </td>
                <td class="tg-0laxa" style="text-align: center;" colspan="5">
                </td>
            </tr>
        </tbody>
    </table>
</div>

<table class="tg2" style="margin-top: 5em;width:100%;text-align:center;border:0;page-break-inside: avoid;">
    <tr>
        @foreach ($approvalList as $approval)
            <td colspan="3">{{$approval['remarks']}}</td>
        @endforeach
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
        @foreach ($approvalList as $approval)
            <td colspan="3">{{$approval['name']}}</td>
        @endforeach
    </tr>
</table>