<?php
/**
 * Replicates the marketingReport row build EXACTLY (same query, same column list,
 * same formatting) so the printed cell values can be inspected as text instead of
 * guessed from the PDF binary.
 *
 * Run: php database/views/dump_report_cells.php [YYYY-MM] [connection]
 */
require __DIR__ . '/../../vendor/autoload.php';

use Illuminate\Support\Facades\DB;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$month = $argv[1] ?? '2026-09';
$connection = $argv[2] ?? 'connect_jos_jatpt';
$from = $month . '-01';
$to = date('Y-m-t', strtotime($from));

$rupiah = fn (float $n): string => 'Rp ' . number_format($n, 0, ',', '.');

$rows = DB::connection($connection)
    ->table('V_SALES_REPORT')
    ->whereBetween('SLODET_DATE', ["$from 00:00:00", "$to 23:59:59"])
    ->select([
        DB::raw("COALESCE(MITM_ITMCAT, '-') as MITM_ITMCAT"),
        'MUSAGE_ALIAS', 'TSLO_SLOCD', 'MITM_ITMCD', 'MITM_ITMNM', 'TDLVORDDETA_DLVCD',
        'TQUO_PROJECT_LOCATION', 'CSPK_PIC_AS', 'CSPK_PIC_NAME', 'MCUS_CUSNM',
        'TSLODETA_ITMQT', 'totalTax', 'name', 'TSLODETA_PERIOD_FR', 'TSLODETA_PERIOD_TO',
    ])
    ->orderBy('MITM_ITMCAT')->orderBy('MUSAGE_ALIAS')
    ->limit(12)
    ->get();

echo "=== $connection, $from .. $to ===\n";
printf("%-22s %-18s %14s %14s %14s  %-12s %-12s\n",
    'ItemCode', 'NoNota', 'Jumlah(np)', 'Pajak', 'Total', 'TglAwal', 'TglAkhir');
echo str_repeat('-', 120), "\n";

foreach ($rows as $r) {
    $qty = (float) ($r->TSLODETA_ITMQT ?? 0);
    $tax = (float) ($r->totalTax ?? 0);

    // this is the exact expression the controller uses
    $fr = ! empty($r->TSLODETA_PERIOD_FR) ? date('d M Y', strtotime($r->TSLODETA_PERIOD_FR)) : '-';
    $to = ! empty($r->TSLODETA_PERIOD_TO) ? date('d M Y', strtotime($r->TSLODETA_PERIOD_TO)) : '-';

    printf("%-22s %-18s %14s %14s %14s  %-12s %-12s\n",
        mb_substr((string) $r->MITM_ITMCD, 0, 22),
        mb_substr((string) $r->TDLVORDDETA_DLVCD, 0, 18),
        str_replace('Rp ', 'Rp', $rupiah($qty)),
        str_replace('Rp ', 'Rp', $rupiah($tax)),
        str_replace('Rp ', 'Rp', $rupiah($qty + $tax)),
        $fr, $to);
}

echo "\n=== interpretation of the \"Jumlah\" source column ===\n";
echo "view column TSLODETA_ITMQT is defined as: SUM(T_DLVORDDETA.TDLVORDDETA_ITMQT * T_DLVORDDETA.TDLVORDDETA_PRC)\n";
echo "i.e. an AMOUNT (qty x price), not a quantity.\n";

// compare against the underlying detail
$first = $rows->first();
if ($first) {
    $detail = DB::connection($connection)->table('T_SLODETA as d')
        ->leftJoin('T_DLVORDDETA as v', function ($j) {
            $j->on('v.TDLVORDDETA_SLOCD', '=', 'd.TSLODETA_SLOCD')
              ->on('v.TDLVORDDETA_ITMCD', '=', 'd.TSLODETA_ITMCD');
        })
        ->where('d.TSLODETA_SLOCD', $first->TSLO_SLOCD)
        ->where('d.TSLODETA_ITMCD', $first->MITM_ITMCD)
        ->select(
            DB::raw('d.TSLODETA_ITMQT as so_qty'),
            DB::raw('d.TSLODETA_PRC as so_price'),
            DB::raw('SUM(v.TDLVORDDETA_ITMQT) as delivered_qty'),
            DB::raw('SUM(v.TDLVORDDETA_ITMQT * v.TDLVORDDETA_PRC) as delivered_amount')
        )
        ->first();

    echo "\nfirst row drilled down:\n";
    printf("  SO qty=%s x price=%s\n", $detail->so_qty, $detail->so_price);
    printf("  delivered qty=%s, delivered amount=%s\n", $detail->delivered_qty, $detail->delivered_amount);
    printf("  'Jumlah' column shows delivered amount=%s  (qty x price, a rupiah figure)\n",
        $rupiah((float) $detail->delivered_amount));
}
