<style>
  body { font-family: Helvetica, Arial, sans-serif; font-size: 10px; }

  table.tg {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;         /* bantu Dompdf hitung kolom lebih cepat */
  }

  .tg th, .tg td {
    border: 1px solid #000;
    padding: 4px;
    vertical-align: top;
    word-wrap: break-word;
  }

  .text-left  { text-align: left; }
  .text-right { text-align: right; }
  .text-center{ text-align: center; }

  .group-title {
    font-size: 12px;
    font-weight: bold;
    padding: 6px 0;
  }

  .tg .tg-0lax { text-align: left; font-size: 7px; vertical-align: top } 
  .tg .tg-0laxa { text-align: left; vertical-align: top; font-size: 10px; font-style: bold; }

  .page-break { page-break-after: always; }
  thead { display: table-header-group; } /* header tabel ulang tiap page */
</style>

<div style="text-align: center">
    <div style="text-align: center; font-size: 32px;padding-bottom: 15px"><span style="text-decoration: underline;"><strong>{{$header}}</strong></span></div>
    <div style="text-align: center; font-size: 16px;padding-bottom: 4px"><strong>{{$subHeader}}</strong></div>
    <div style="text-align: center;font-size: 13px;padding-bottom: 10px"><strong>{{$addr}}</strong></div>
</div>

<div>
    <hr class="s1">
</div>

<div style="text-align: center;">
    <span style="font-family: Arial, sans-serif; font-style: bold; font-size: large;">Sales Report by Category</span>
    <br>
    <span style="font-family: Arial, sans-serif; font-style: bold">From {{date('d M Y', strtotime($dateRange[0]))}} to
        {{date('d M Y', strtotime($dateRange[1]))}}</span>
</div>

<hr>

@if(count($data['BARU']) > 0)
<div style="text-align: center;padding-bottom: 1em;padding-top: 1em">
    <span style="font-family: Arial, sans-serif; font-style: bold; font-size: large;">Baru</span>
</div>

<div style="padding-top: 1em">
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
                <th class="tg-0lax">Pajak</th>
                <th class="tg-0lax">Total</th>
                <th class="tg-0lax">Status Bayar</th>
                <th class="tg-0lax">Marketing</th>
                <th class="tg-0lax">Tgl Awal</th>
                <th class="tg-0lax">Tgl Akhir</th>
            </tr>
        </thead>
        <tbody>
            @php
                $total = $totalTax = 0;
            @endphp
            @foreach($data['BARU'] as $key => $value)
                        <tr>
                            <td class="text-center group-title" colspan="14">
                                {{$key}}
                            </td>
                        </tr>
                        @php
                            $subtotal = 0;
                            $subtotalTax = 0;
                        @endphp
                        @foreach($value as $keyUsage => $valueUsage)
                            <tr>
                                <td class="text-left group-title" colspan="14">
                                    {{$keyUsage}}
                                </td>
                            </tr>

                            @foreach($valueUsage as $keyDet => $valueDet)
                                @php
                                    $subtotal += $valueDet['TSLODETA_ITMQT'];
                                    $subtotalTax += $valueDet['totalTax'];
                                    $total += $valueDet['TSLODETA_ITMQT'];
                                    $totalTax += $valueDet['totalTax'];
                                @endphp
                                <tr>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['MITM_ITMCD']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['MITM_ITMNM']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['TDLVORDDETA_DLVCD']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['TQUO_PROJECT_LOCATION']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">
                                        {{$valueDet['CSPK_PIC_AS'] == 'DRIVER' ? $valueDet['CSPK_PIC_NAME'] : ''}}</td>
                                    <td class="tg-0lax" style="text-align: left;">
                                        {{$valueDet['CSPK_PIC_AS'] == 'OPERATOR' ? $valueDet['CSPK_PIC_NAME'] : ''}}</td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['MCUS_CUSNM']}}</td>
                                    <td class="tg-0lax" style="text-align: right;">Rp {{number_format($valueDet['TSLODETA_ITMQT'])}}</td>
                                    <td class="tg-0lax" style="text-align: right;">Rp {{number_format($valueDet['totalTax'])}}</td>
                                    <td class="tg-0lax" style="text-align: right;">Rp {{number_format($valueDet['TSLODETA_ITMQT'] + $valueDet['totalTax'])}}</td>
                                    <td class="tg-0lax" style="text-align: left;"></td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['name']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">
                                        {{empty($valueDet['TSLODETA_PERIOD_FR']) ? '-' : date('d M Y', strtotime($valueDet['TSLODETA_PERIOD_FR']))}}</td>
                                    <td class="tg-0lax" style="text-align: left;">
                                        {{empty($valueDet['TSLODETA_PERIOD_TO']) ? '-' : date('d M Y', strtotime($valueDet['TSLODETA_PERIOD_TO']))}}</td>
                                </tr>
                            @endforeach
                        @endforeach
                        <tr>
                            <td class="tg-0laxa" style="text-align: left;" colspan="7">
                                Subtotal
                            </td>
                            <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($subtotal)}}</td>
                            <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($subtotalTax)}}</td>
                            <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($subtotal + $subtotalTax)}}</td>
                            <td class="tg-0laxa" style="text-align: center;" colspan="4">
                            </td>
                        </tr>
            @endforeach
            <tr>
                <td class="tg-0laxa" style="text-align: left;" colspan="7">
                    Grand Total
                </td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($total)}}</td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($totalTax)}}</td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($total + $totalTax)}}</td>
                <td class="tg-0laxa" style="text-align: center;" colspan="4">
                </td>
            </tr>
        </tbody>
    </table>
</div>
@endif

<div style="page-break-before: always;"></div>

@if(count($data['PERPANJANGAN']) > 0)
<div style="text-align: center;padding-bottom: 1em;padding-top: 1em">
    <span style="font-family: Arial, sans-serif; font-style: bold; font-size: large;">Perpanjangan</span>
</div>

<div style="padding-top: 1em">
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
                <th class="tg-0lax">Pajak</th>
                <th class="tg-0lax">Total</th>
                <th class="tg-0lax">Status Bayar</th>
                <th class="tg-0lax">Marketing</th>
                <th class="tg-0lax">Tgl Awal</th>
                <th class="tg-0lax">Tgl Akhir</th>
            </tr>
        </thead>
        <tbody>
            @php
                $total = 0;
                $totalTax = 0;
            @endphp
            @foreach($data['PERPANJANGAN'] as $key => $value)
                        <tr>
                            <td class="tg-0lax" style="text-align: center;" colspan="14">
                                <h3>{{$key}}</h3>
                            </td>
                        </tr>
                        @php
                            $subtotal = 0;
                            $subtotalTax = 0;
                        @endphp
                        @foreach($value as $keyUsage => $valueUsage)
                            <tr>
                                <td class="tg-0lax" style="text-align: left;" colspan="14">
                                    <h3>{{$keyUsage}}</h3>
                                </td>
                            </tr>
                            @foreach($valueUsage as $keyDet => $valueDet)
                                @php
                                    $subtotal += $valueDet['TSLODETA_ITMQT'];
                                    $subtotalTax += $valueDet['totalTax'];
                                    $total += $valueDet['TSLODETA_ITMQT'];
                                    $totalTax += $valueDet['totalTax'];
                                @endphp
                                <tr>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['MITM_ITMCD']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['MITM_ITMNM']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['TDLVORDDETA_DLVCD']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['TQUO_PROJECT_LOCATION']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">
                                        {{$valueDet['CSPK_PIC_AS'] == 'DRIVER' ? $valueDet['CSPK_PIC_NAME'] : ''}}</td>
                                    <td class="tg-0lax" style="text-align: left;">
                                        {{$valueDet['CSPK_PIC_AS'] == 'OPERATOR' ? $valueDet['CSPK_PIC_NAME'] : ''}}</td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['MCUS_CUSNM']}}</td>
                                    <td class="tg-0lax" style="text-align: right;">Rp {{number_format($valueDet['TSLODETA_ITMQT'])}}</td>
                                    <td class="tg-0lax" style="text-align: right;">Rp {{number_format($valueDet['totalTax'])}}</td>
                                    <td class="tg-0lax" style="text-align: right;">Rp {{number_format($valueDet['TSLODETA_ITMQT'] + $valueDet['totalTax'])}}</td>
                                    <td class="tg-0lax" style="text-align: right;"></td>
                                    <td class="tg-0lax" style="text-align: left;">{{$valueDet['name']}}</td>
                                    <td class="tg-0lax" style="text-align: left;">
                                        {{date('d M Y', strtotime($valueDet['TSLODETA_PERIOD_FR']))}}</td>
                                    <td class="tg-0lax" style="text-align: left;">
                                        {{date('d M Y', strtotime($valueDet['TSLODETA_PERIOD_TO']))}}</td>
                                </tr>
                            @endforeach
                        @endforeach
                        <tr>
                            <td class="tg-0laxa" style="text-align: left;" colspan="7">
                                Subtotal
                            </td>
                            <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($subtotal)}}</td>
                            <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($subtotalTax)}}</td>
                            <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($subtotal + $subtotalTax)}}</td>
                            <td class="tg-0laxa" style="text-align: center;" colspan="4">
                            </td>
                        </tr>
            @endforeach
            <tr>
                <td class="tg-0laxa" style="text-align: left;" colspan="7">
                    Grand Total
                </td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($total)}}</td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($totalTax)}}</td>
                <td class="tg-0laxa" style="text-align: right; font-size:7px">Rp {{number_format($total + $totalTax)}}</td>
                <td class="tg-0laxa" style="text-align: center;" colspan="4">
                </td>
            </tr>
        </tbody>
    </table>
</div>

@endif

<table class="tg2 group-title" style="margin-top: 3em;width:100%;text-align:center;border:0;">
    <tr>
        @foreach ($approvalList as $approval)
            <td colspan="3" style="height: 60px">{{$approval['remarks']}}</td>
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
