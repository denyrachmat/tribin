<style>
  body {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 10px;
  }

  table.tg {
    width: 100%;
    border-collapse: collapse;
    table-layout: auto;
  }

  .tg th,
  .tg td {
    border: 1px solid #000;
    padding: 4px;
    vertical-align: top;
    word-break: break-word;
  }

  .text-left {
    text-align: left;
  }

  .text-right {
    text-align: right;
  }

  .text-center {
    text-align: center;
  }

  .nowrap {
    white-space: nowrap;
  }

  .group-title {
    font-size: 12px;
    font-weight: bold;
    padding: 6px 0;
  }

  .tg .cell {
    font-size: 7px;
    vertical-align: top;
  }

  .tg .cell-bold {
    font-size: 7px;
    font-weight: bold;
  }

  @if(!empty($repeatTableHeader))
    thead {
      display: table-header-group;
    }

  @endif .page-break {
    page-break-before: always;
  }

  /* NEW */
  .keep-with-approval {
    page-break-inside: avoid;
  }

  .approval-block {
    margin-top: 3em;
    page-break-inside: avoid;
  }
  
  .keep-together { page-break-inside: avoid; }
</style>

@php
  // berapa baris terakhir yang akan diduplikasi sebelum approval
  $TAIL_COUNT = 4;

  // buffer tail per section
  $tailBaru = [];
  $tailPerpanjangan = [];

  // helper: push rolling tail (last N rows)
  $pushTail = function (&$buf, $row, $cat, $usage, $max) {
    $buf[] = [
      'cat' => $cat,
      'usage' => $usage,
      'r' => $row,
    ];
    if (count($buf) > $max)
      array_shift($buf);
  };
@endphp

<div style="text-align: center">
  <div style="font-size: 32px;padding-bottom: 15px">
    <span style="text-decoration: underline;"><strong>{{ $header }}</strong></span>
  </div>
  <div style="font-size: 16px;padding-bottom: 4px"><strong>{{ $subHeader }}</strong></div>
  <div style="font-size: 13px;padding-bottom: 10px"><strong>{{ $addr }}</strong></div>
</div>

<hr>

<div style="text-align: center;">
  <div style="font-style: bold; font-size: large;">Sales Report by Category</div>
  <div style="font-style: bold;">
    From {{ date('d M Y', strtotime($dateRange[0])) }} to {{ date('d M Y', strtotime($dateRange[1])) }}
  </div>
</div>

<hr>

{{-- ===================== BARU ===================== --}}
@if(!empty($data['BARU']) && count($data['BARU']) > 0)
  <div style="text-align: center;padding-bottom: 1em;padding-top: 1em">
    <span style="font-style: bold; font-size: large;">Baru</span>
  </div>

  <table class="tg">
    <thead>
      <tr>
        <th class="cell nowrap">Item Code</th>
        <th class="cell">Item Name</th>
        <th class="cell nowrap">No Nota</th>
        <th class="cell">Lokasi</th>
        <th class="cell">Sopir</th>
        <th class="cell">Operator</th>
        <th class="cell">Perusahaan</th>
        <th class="cell nowrap">Jumlah</th>
        <th class="cell nowrap">Pajak</th>
        <th class="cell nowrap">Total</th>
        <th class="cell nowrap">Status Bayar</th>
        <th class="cell nowrap">Marketing</th>
        <th class="cell nowrap">Tgl Awal</th>
        <th class="cell nowrap">Tgl Akhir</th>
      </tr>
    </thead>
    <tbody>
      @foreach($data['BARU'] as $cat => $usages)
        <tr>
          <td class="text-center group-title" colspan="14">{{ $cat }}</td>
        </tr>

        @foreach($usages as $usage => $rows)
          <tr>
            <td class="text-left group-title" colspan="14">{{ $usage }}</td>
          </tr>

          @foreach($rows as $r)
            @php $pushTail($tailBaru, $r, $cat, $usage, $TAIL_COUNT); @endphp
            <tr>
              <td class="cell nowrap text-left">{{ $r['MITM_ITMCD'] ?? '' }}</td>
              <td class="cell text-left">{{ $r['MITM_ITMNM'] ?? '' }}</td>
              <td class="cell nowrap text-left">{{ $r['TDLVORDDETA_DLVCD'] ?? '' }}</td>
              <td class="cell text-left">{{ $r['TQUO_PROJECT_LOCATION'] ?? '' }}</td>
              <td class="cell text-left">{{ $r['driver_name'] ?? '' }}</td>
              <td class="cell text-left">{{ $r['operator_name'] ?? '' }}</td>
              <td class="cell text-left">{{ $r['MCUS_CUSNM'] ?? '' }}</td>
              <td class="cell nowrap text-right">{{ $r['qty_fmt'] ?? 'Rp 0' }}</td>
              <td class="cell nowrap text-right">{{ $r['tax_fmt'] ?? 'Rp 0' }}</td>
              <td class="cell nowrap text-right">{{ $r['total_fmt'] ?? 'Rp 0' }}</td>
              <td class="cell text-left">{{ $r['payment_status'] ?? '' }}</td>
              <td class="cell text-left">{{ $r['name'] ?? '' }}</td>
              <td class="cell nowrap text-left">{{ $r['period_fr_fmt'] ?? '-' }}</td>
              <td class="cell nowrap text-left">{{ $r['period_to_fmt'] ?? '-' }}</td>
            </tr>
          @endforeach

          @php $st = $meta['sub']['BARU'][$cat][$usage] ?? null; @endphp
          @if($st)
            <tr>
              <td class="cell-bold text-left" colspan="7">Subtotal</td>
              <td class="cell-bold nowrap text-right">{{ $st['qty_fmt'] }}</td>
              <td class="cell-bold nowrap text-right">{{ $st['tax_fmt'] }}</td>
              <td class="cell-bold nowrap text-right">{{ $st['total_fmt'] }}</td>
              <td colspan="4"></td>
            </tr>
          @endif

        @endforeach
      @endforeach

      <tr>
        <td class="cell-bold text-left" colspan="7">Grand Total</td>
        <td class="cell-bold nowrap text-right">{{ $meta['BARU']['grand']['qty_fmt'] ?? '' }}</td>
        <td class="cell-bold nowrap text-right">{{ $meta['BARU']['grand']['tax_fmt'] ?? '' }}</td>
        <td class="cell-bold nowrap text-right">{{ $meta['BARU']['grand']['total_fmt'] ?? '' }}</td>
        <td colspan="4"></td>
      </tr>
    </tbody>
  </table>
@endif

<div class="page-break"></div>

{{-- ===================== PERPANJANGAN ===================== --}}
@php
    // Berapa baris detail yang mau "ikut" bareng approval kalau pindah halaman
    $TAIL_ROWS = 4;

    // Flatten semua baris detail perpanjangan (tanpa header cat/usage)
    $flatRows = [];
    if (!empty($data['PERPANJANGAN'])) {
        foreach ($data['PERPANJANGAN'] as $cat => $usages) {
            foreach ($usages as $usage => $rows) {
                foreach ($rows as $r) {
                    $flatRows[] = [
                        'cat' => $cat,
                        'usage' => $usage,
                        'r' => $r,
                    ];
                }
            }
        }
    }

    $totalDetail = count($flatRows);
    $tailCount = min($TAIL_ROWS, $totalDetail);

    // Head = semua kecuali tail, Tail = N baris terakhir
    $headRows = $tailCount > 0 ? array_slice($flatRows, 0, $totalDetail - $tailCount) : $flatRows;
    $tailRows = $tailCount > 0 ? array_slice($flatRows, $totalDetail - $tailCount) : [];
@endphp

@if(!empty($data['PERPANJANGAN']) && count($data['PERPANJANGAN']) > 0)
<div style="text-align: center;padding-bottom: 1em;padding-top: 1em">
    <span style="font-style: bold; font-size: large;">Perpanjangan</span>
</div>

{{-- ===== Bagian A: Head rows (tanpa N baris terakhir) ===== --}}
@if(count($headRows) > 0)
<table class="tg">
    <thead>
        <tr>
            <th class="cell nowrap">Item Code</th>
            <th class="cell">Item Name</th>
            <th class="cell nowrap">No Nota</th>
            <th class="cell">Lokasi</th>
            <th class="cell">Sopir</th>
            <th class="cell">Operator</th>
            <th class="cell">Perusahaan</th>
            <th class="cell nowrap">Jumlah</th>
            <th class="cell nowrap">Pajak</th>
            <th class="cell nowrap">Total</th>
            <th class="cell nowrap">Status Bayar</th>
            <th class="cell nowrap">Marketing</th>
            <th class="cell nowrap">Tgl Awal</th>
            <th class="cell nowrap">Tgl Akhir</th>
        </tr>
    </thead>
    <tbody>
        @php
            $prevCat = null;
            $prevUsage = null;
        @endphp

        @foreach($headRows as $item)
            @php
                $cat = $item['cat'];
                $usage = $item['usage'];
                $r = $item['r'];
            @endphp

            @if($cat !== $prevCat)
                <tr>
                    <td class="text-center group-title" colspan="14">{{ $cat }}</td>
                </tr>
                @php $prevUsage = null; @endphp
            @endif

            @if($usage !== $prevUsage)
                <tr>
                    <td class="text-left group-title" colspan="14">{{ $usage }}</td>
                </tr>
            @endif

            <tr>
                <td class="cell nowrap text-left">{{ $r['MITM_ITMCD'] ?? '' }}</td>
                <td class="cell text-left">{{ $r['MITM_ITMNM'] ?? '' }}</td>
                <td class="cell nowrap text-left">{{ $r['TDLVORDDETA_DLVCD'] ?? '' }}</td>
                <td class="cell text-left">{{ $r['TQUO_PROJECT_LOCATION'] ?? '' }}</td>
                <td class="cell text-left">{{ $r['driver_name'] ?? '' }}</td>
                <td class="cell text-left">{{ $r['operator_name'] ?? '' }}</td>
                <td class="cell text-left">{{ $r['MCUS_CUSNM'] ?? '' }}</td>
                <td class="cell nowrap text-right">{{ $r['qty_fmt'] ?? 'Rp 0' }}</td>
                <td class="cell nowrap text-right">{{ $r['tax_fmt'] ?? 'Rp 0' }}</td>
                <td class="cell nowrap text-right">{{ $r['total_fmt'] ?? 'Rp 0' }}</td>
                <td class="cell text-left">{{ $r['payment_status'] ?? '' }}</td>
                <td class="cell text-left">{{ $r['name'] ?? '' }}</td>
                <td class="cell nowrap text-left">{{ $r['period_fr_fmt'] ?? '-' }}</td>
                <td class="cell nowrap text-left">{{ $r['period_to_fmt'] ?? '-' }}</td>
            </tr>

            @php
                $prevCat = $cat;
                $prevUsage = $usage;
            @endphp
        @endforeach
    </tbody>
</table>
@endif

{{-- ===== Bagian B: Tail rows + total + approval (KEEP TOGETHER) ===== --}}
<div class="keep-together" style="margin-top:8px;">
    @if(count($tailRows) > 0)
    <table class="tg">
        <thead>
            <tr>
                <th class="cell nowrap">Item Code</th>
                <th class="cell">Item Name</th>
                <th class="cell nowrap">No Nota</th>
                <th class="cell">Lokasi</th>
                <th class="cell">Sopir</th>
                <th class="cell">Operator</th>
                <th class="cell">Perusahaan</th>
                <th class="cell nowrap">Jumlah</th>
                <th class="cell nowrap">Pajak</th>
                <th class="cell nowrap">Total</th>
                <th class="cell nowrap">Status Bayar</th>
                <th class="cell nowrap">Marketing</th>
                <th class="cell nowrap">Tgl Awal</th>
                <th class="cell nowrap">Tgl Akhir</th>
            </tr>
        </thead>
        <tbody>
            @php
                $prevCat2 = null;
                $prevUsage2 = null;
            @endphp

            @foreach($tailRows as $item)
                @php
                    $cat = $item['cat'];
                    $usage = $item['usage'];
                    $r = $item['r'];
                @endphp

                @if($cat !== $prevCat2)
                    <tr>
                        <td class="text-center group-title" colspan="14">{{ $cat }}</td>
                    </tr>
                    @php $prevUsage2 = null; @endphp
                @endif

                @if($usage !== $prevUsage2)
                    <tr>
                        <td class="text-left group-title" colspan="14">{{ $usage }}</td>
                    </tr>
                @endif

                <tr>
                    <td class="cell nowrap text-left">{{ $r['MITM_ITMCD'] ?? '' }}</td>
                    <td class="cell text-left">{{ $r['MITM_ITMNM'] ?? '' }}</td>
                    <td class="cell nowrap text-left">{{ $r['TDLVORDDETA_DLVCD'] ?? '' }}</td>
                    <td class="cell text-left">{{ $r['TQUO_PROJECT_LOCATION'] ?? '' }}</td>
                    <td class="cell text-left">{{ $r['driver_name'] ?? '' }}</td>
                    <td class="cell text-left">{{ $r['operator_name'] ?? '' }}</td>
                    <td class="cell text-left">{{ $r['MCUS_CUSNM'] ?? '' }}</td>
                    <td class="cell nowrap text-right">{{ $r['qty_fmt'] ?? 'Rp 0' }}</td>
                    <td class="cell nowrap text-right">{{ $r['tax_fmt'] ?? 'Rp 0' }}</td>
                    <td class="cell nowrap text-right">{{ $r['total_fmt'] ?? 'Rp 0' }}</td>
                    <td class="cell text-left">{{ $r['payment_status'] ?? '' }}</td>
                    <td class="cell text-left">{{ $r['name'] ?? '' }}</td>
                    <td class="cell nowrap text-left">{{ $r['period_fr_fmt'] ?? '-' }}</td>
                    <td class="cell nowrap text-left">{{ $r['period_to_fmt'] ?? '-' }}</td>
                </tr>

                @php
                    $prevCat2 = $cat;
                    $prevUsage2 = $usage;
                @endphp
            @endforeach

            {{-- Grand total tetap di bagian B biar ikut approval kalau pindah halaman --}}
            <tr>
                <td class="cell-bold text-left" colspan="7">Grand Total</td>
                <td class="cell-bold nowrap text-right">{{ $meta['PERPANJANGAN']['grand']['qty_fmt'] }}</td>
                <td class="cell-bold nowrap text-right">{{ $meta['PERPANJANGAN']['grand']['tax_fmt'] }}</td>
                <td class="cell-bold nowrap text-right">{{ $meta['PERPANJANGAN']['grand']['total_fmt'] }}</td>
                <td colspan="4"></td>
            </tr>
        </tbody>
    </table>
    @else
        {{-- Kalau tidak ada tail (data kosong), tetap tampilkan grand total --}}
        <table class="tg">
            <tbody>
                <tr>
                    <td class="cell-bold text-left" colspan="7">Grand Total</td>
                    <td class="cell-bold nowrap text-right">{{ $meta['PERPANJANGAN']['grand']['qty_fmt'] }}</td>
                    <td class="cell-bold nowrap text-right">{{ $meta['PERPANJANGAN']['grand']['tax_fmt'] }}</td>
                    <td class="cell-bold nowrap text-right">{{ $meta['PERPANJANGAN']['grand']['total_fmt'] }}</td>
                    <td colspan="4"></td>
                </tr>
            </tbody>
        </table>
    @endif

    {{-- ===================== APPROVAL ===================== --}}
    <div style="margin-top: 2em;">
        <table class="group-title" style="width:100%;text-align:center;border:0;">
            <tr>
                @foreach ($approvalList as $approval)
                    <td style="height: 60px">{{ $approval['remarks'] ?? '' }}</td>
                @endforeach
            </tr>
            <tr><td colspan="{{ max(count($approvalList),1) }}">&nbsp;</td></tr>
            <tr><td colspan="{{ max(count($approvalList),1) }}">&nbsp;</td></tr>
            <tr><td colspan="{{ max(count($approvalList),1) }}">&nbsp;</td></tr>
            <tr>
                @foreach ($approvalList as $approval)
                    <td>{{ $approval['name'] ?? '' }}</td>
                @endforeach
            </tr>
        </table>
    </div>
</div>
@endif