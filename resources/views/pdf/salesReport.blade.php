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
    page-break-before: avoid;
  }

  /* NEW */
  .keep-with-approval {
    page-break-inside: avoid;
  }

  .approval-block {
    margin-top: 3em;
    page-break-inside: avoid;
  }

  .keep-together {
    page-break-inside: avoid;
  }

  .section-header {
      font-size: 18px;        /* samakan dengan header laporan */
      font-weight: bold;
      text-align: center;
      margin: 12px 0 6px 0;
  }

  .section-divider {
      border-top: 2px solid #000;
      margin: 6px 0 10px 0;
  }
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

@php
  $TAIL_ROWS = 4; // ubah 2-6 sesuai kebutuhan

  // Flatten BARU
  $flatBaru = [];
  if (!empty($data['BARU'])) {
    foreach ($data['BARU'] as $cat => $usages) {
      foreach ($usages as $usage => $rows) {
        foreach ($rows as $r) {
          $flatBaru[] = ['cat' => $cat, 'usage' => $usage, 'r' => $r];
        }
      }
    }
  }

  $totalBaru = count($flatBaru);
  $tailCountBaru = min($TAIL_ROWS, $totalBaru);
  $baruHead = $tailCountBaru > 0 ? array_slice($flatBaru, 0, $totalBaru - $tailCountBaru) : $flatBaru;
  $baruTail = $tailCountBaru > 0 ? array_slice($flatBaru, $totalBaru - $tailCountBaru) : [];
@endphp

{{-- ===================== BARU ===================== --}}
@if(isset($baruHead) && count($baruHead) > 0)
  <div class="section-header">BARU</div>  
  <div class="section-divider"></div>

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
      @php $prevCat = null;
      $prevUsage = null; @endphp

      @foreach($baruHead as $item)
        @php $cat = $item['cat'];
          $usage = $item['usage'];
        $r = $item['r']; @endphp

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

        @php $prevCat = $cat;
        $prevUsage = $usage; @endphp
      @endforeach

      {{-- Grand Total tetap tampil di tabel utama BARU --}}
      <tr>
        <td class="cell-bold text-left" colspan="7">Grand Total</td>
        <td class="cell-bold nowrap text-right">{{ $meta['BARU']['grand']['qty_fmt'] }}</td>
        <td class="cell-bold nowrap text-right">{{ $meta['BARU']['grand']['tax_fmt'] }}</td>
        <td class="cell-bold nowrap text-right">{{ $meta['BARU']['grand']['total_fmt'] }}</td>
        <td colspan="4"></td>
      </tr>
    </tbody>
  </table>
@endif

{{-- ===================== PERPANJANGAN ===================== --}}
@php
  $TAIL_ROWS = 6;

  // Ambil sumber terakhir yang ada: PERPANJANGAN kalau ada, kalau tidak BARU
  $tailSource = null; // 'PERPANJANGAN' | 'BARU' | null

  $flat = [];
  if (!empty($data['PERPANJANGAN']) && count($data['PERPANJANGAN']) > 0) {
    $tailSource = 'PERPANJANGAN';
    foreach ($data['PERPANJANGAN'] as $cat => $usages) {
      foreach ($usages as $usage => $rows) {
        foreach ($rows as $r) {
          $flat[] = ['cat' => $cat, 'usage' => $usage, 'r' => $r];
        }
      }
    }
  } elseif (!empty($data['BARU']) && count($data['BARU']) > 0) {
    $tailSource = 'BARU';
    foreach ($data['BARU'] as $cat => $usages) {
      foreach ($usages as $usage => $rows) {
        foreach ($rows as $r) {
          $flat[] = ['cat' => $cat, 'usage' => $usage, 'r' => $r];
        }
      }
    }
  }

  $total = count($flat);
  $tailCount = min($TAIL_ROWS, $total);
  $tailRows = $tailCount > 0 ? array_slice($flat, $total - $tailCount) : [];

  // Ambil grand total sesuai sumber
  $grand = null;
  if ($tailSource === 'PERPANJANGAN' && !empty($meta['PERPANJANGAN']['grand'])) {
    $grand = $meta['PERPANJANGAN']['grand'];
  } elseif ($tailSource === 'BARU' && !empty($meta['BARU']['grand'])) {
    $grand = $meta['BARU']['grand'];
  }
@endphp

{{-- ===== Tail rows + Approval selalu ada (keep together) ===== --}}
<div class="keep-together" style="margin-top: 10px;">

@php
  $tailSource = null;
  $tailRows = [];
  $grand = null;

  if (!empty($data['PERPANJANGAN']) && count($data['PERPANJANGAN']) > 0) {
      $tailSource = 'PERPANJANGAN';
      // kalau kamu sudah split perpanjangan: $tailRows = $perpanjanganTail;
      // kalau belum split perpanjangan: boleh flatten di sini, tapi nanti bisa dobel
      $grand = $meta['PERPANJANGAN']['grand'] ?? null;

  } elseif (!empty($data['BARU']) && count($data['BARU']) > 0) {
      $tailSource = 'BARU';
      $tailRows = $baruTail; // ini sudah disiapin dari split BARU
      $grand = $meta['BARU']['grand'] ?? null;
  }
@endphp

  {{-- Tampilkan tail table hanya kalau ada data BARU/PERPANJANGAN --}}
  @if($tailSource && count($tailRows) > 0)
    <div class="section-header">
      {{ $tailSource === 'PERPANJANGAN' ? 'PERPANJANGAN' : 'BARU' }}
    </div>
    <div class="section-divider"></div>

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
        @php $prevCat = null;
        $prevUsage = null; @endphp

        @foreach($tailRows as $item)
          @php $cat = $item['cat'];
            $usage = $item['usage'];
          $r = $item['r']; @endphp

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

          @php $prevCat = $cat;
          $prevUsage = $usage; @endphp
        @endforeach

        @if($grand)
          <tr>
            <td class="cell-bold text-left" colspan="7">Grand Total</td>
            <td class="cell-bold nowrap text-right">{{ $grand['qty_fmt'] }}</td>
            <td class="cell-bold nowrap text-right">{{ $grand['tax_fmt'] }}</td>
            <td class="cell-bold nowrap text-right">{{ $grand['total_fmt'] }}</td>
            <td colspan="4"></td>
          </tr>
        @endif
      </tbody>
    </table>

    <div style="height:10px;"></div>
  @endif

  {{-- ===================== APPROVAL (SELALU TAMPIL) ===================== --}}
  <div style="margin-top: 1.5em;">
    <table class="group-title" style="width:100%;text-align:center;border:0;">
      <tr>
        @foreach ($approvalList as $approval)
          <td style="height: 60px">{{ $approval['remarks'] ?? '' }}</td>
        @endforeach
      </tr>
      <tr>
        <td colspan="{{ max(count($approvalList), 1) }}">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="{{ max(count($approvalList), 1) }}">&nbsp;</td>
      </tr>
      <tr>
        <td colspan="{{ max(count($approvalList), 1) }}">&nbsp;</td>
      </tr>
      <tr>
        @foreach ($approvalList as $approval)
          <td>{{ $approval['name'] ?? '' }}</td>
        @endforeach
      </tr>
    </table>
  </div>

</div>