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

  thead { display: table-header-group; }

  /* Approval jangan pecah */
  .approval-wrap {
    page-break-inside: avoid;
    margin-top: 2em;
  }

  /* Section title biar konsisten */
  .section-header {
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    margin: 12px 0 6px 0;
  }

  .section-divider {
    border-top: 2px solid #000;
    margin: 6px 0 10px 0;
  }

  .section-title-th{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding: 8px 0;
    border: 0 !important;
  }

  .section-title-line{
    border-top: 2px solid #000 !important;
    padding: 0 !important;
    height: 0;
  }
</style>

@php
  // Berapa baris terakhir yang dipindah untuk ikut approval
  $TAIL_ROWS = 4;

  // ---------- Flatten helper ----------
  $flatten = function ($sectionData) {
    $flat = [];
    if (!empty($sectionData)) {
      foreach ($sectionData as $cat => $usages) {
        foreach ($usages as $usage => $rows) {
          foreach ($rows as $r) {
            $flat[] = ['cat' => $cat, 'usage' => $usage, 'r' => $r];
          }
        }
      }
    }
    return $flat;
  };

  // ---------- Split helper ----------
  $splitFlat = function ($flat, $tailN) {
    $total = count($flat);
    $take = min($tailN, $total);
    $head = $take > 0 ? array_slice($flat, 0, $total - $take) : $flat;
    $tail = $take > 0 ? array_slice($flat, $total - $take) : [];
    return [$head, $tail];
  };

  // Flatten BARU & PERPANJANGAN
  $flatBaru = $flatten($data['BARU'] ?? []);
  $flatPerpanjangan = $flatten($data['PERPANJANGAN'] ?? []);

  // Split keduanya
  [$baruHead, $baruTail] = $splitFlat($flatBaru, $TAIL_ROWS);
  [$perpanjanganHead, $perpanjanganTail] = $splitFlat($flatPerpanjangan, $TAIL_ROWS);

  // Helper render list rows (flat)
  $renderFlatRows = function ($rows) {
    $prevCat = null;
    $prevUsage = null;

    foreach ($rows as $item) {
      $cat = $item['cat'];
      $usage = $item['usage'];
      $r = $item['r'];

      if ($cat !== $prevCat) {
        echo '<tr><td class="text-center group-title" colspan="14">' . e($cat) . '</td></tr>';
        $prevUsage = null;
      }
      if ($usage !== $prevUsage) {
        echo '<tr><td class="text-left group-title" colspan="14">' . e($usage) . '</td></tr>';
      }

      echo '<tr>';
      echo '<td class="cell nowrap text-left">' . e($r['MITM_ITMCD'] ?? '') . '</td>';
      echo '<td class="cell text-left">' . e($r['MITM_ITMNM'] ?? '') . '</td>';
      echo '<td class="cell nowrap text-left">' . e($r['TDLVORDDETA_DLVCD'] ?? '') . '</td>';
      echo '<td class="cell text-left">' . e($r['TQUO_PROJECT_LOCATION'] ?? '') . '</td>';
      echo '<td class="cell text-left">' . e($r['driver_name'] ?? '') . '</td>';
      echo '<td class="cell text-left">' . e($r['operator_name'] ?? '') . '</td>';
      echo '<td class="cell text-left">' . e($r['MCUS_CUSNM'] ?? '') . '</td>';
      echo '<td class="cell nowrap text-right">' . e($r['qty_fmt'] ?? 'Rp 0') . '</td>';
      echo '<td class="cell nowrap text-right">' . e($r['tax_fmt'] ?? 'Rp 0') . '</td>';
      echo '<td class="cell nowrap text-right">' . e($r['total_fmt'] ?? 'Rp 0') . '</td>';
      echo '<td class="cell text-left">' . e($r['payment_status'] ?? '') . '</td>';
      echo '<td class="cell text-left">' . e($r['name'] ?? '') . '</td>';
      echo '<td class="cell nowrap text-left">' . e($r['period_fr_fmt'] ?? '-') . '</td>';
      echo '<td class="cell nowrap text-left">' . e($r['period_to_fmt'] ?? '-') . '</td>';
      echo '</tr>';

      $prevCat = $cat;
      $prevUsage = $usage;
    }
  };

  $renderTableHeader = function () {
    echo '<thead><tr>';
    echo '<th class="cell nowrap">Item Code</th>';
    echo '<th class="cell">Item Name</th>';
    echo '<th class="cell nowrap">No Nota</th>';
    echo '<th class="cell">Lokasi</th>';
    echo '<th class="cell">Sopir</th>';
    echo '<th class="cell">Operator</th>';
    echo '<th class="cell">Perusahaan</th>';
    echo '<th class="cell nowrap">Jumlah</th>';
    echo '<th class="cell nowrap">Pajak</th>';
    echo '<th class="cell nowrap">Total</th>';
    echo '<th class="cell nowrap">Status Bayar</th>';
    echo '<th class="cell nowrap">Marketing</th>';
    echo '<th class="cell nowrap">Tgl Awal</th>';
    echo '<th class="cell nowrap">Tgl Akhir</th>';
    echo '</tr></thead>';
  };
@endphp

{{-- ===== HEADER ===== --}}
<div style="text-align: center">
  <div style="font-size: 32px;padding-bottom: 15px">
    <span style="text-decoration: underline;"><strong>{{ $header }}</strong></span>
  </div>
  <div style="font-size: 16px;padding-bottom: 4px"><strong>{{ $subHeader }}</strong></div>
  <div style="font-size: 13px;padding-bottom: 10px"><strong>{{ $addr }}</strong></div>
</div>

<hr>

<div style="text-align: center;">
  <div style="font-weight: bold; font-size: 16px;">Sales Report by Category</div>
  <div style="font-weight: bold;">
    From {{ date('d M Y', strtotime($dateRange[0])) }} to {{ date('d M Y', strtotime($dateRange[1])) }}
  </div>
</div>

<hr>

{{-- ===================== BARU ===================== --}}
@if(count($flatBaru) > 0)
  <table class="tg">
    <thead>
      {{-- Judul section: ini akan repeat kalau tabel lanjut page berikutnya --}}
      <tr>
        <th colspan="14" class="section-title-th">BARU</th>
      </tr>
      <tr>
        <th colspan="14" class="section-title-line"></th>
      </tr>

      {{-- Header kolom --}}
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
      @php $renderFlatRows($flatBaru); @endphp

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


{{-- ===================== PERPANJANGAN (HEAD) ===================== --}}
{{-- ===================== PERPANJANGAN ===================== --}}
@if(count($flatPerpanjangan) > 0)
  <table class="tg">
    <thead>
      <tr>
        <th colspan="14" class="section-title-th">PERPANJANGAN</th>
      </tr>
      <tr>
        <th colspan="14" class="section-title-line"></th>
      </tr>

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
      @php $renderFlatRows($flatPerpanjangan); @endphp

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


{{-- ===================== APPROVAL (SELALU TAMPIL) ===================== --}}
<div class="approval-wrap">
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