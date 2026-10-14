<?php
/**
 * Renders the report blade for one company group and reads the VISIBLE TEXT back
 * via DomPDF's SVG output, avoiding guesses about PDF content-stream encoding.
 *
 * Purpose: prove the service "Jumlah" column is an amount (qty * price) through the
 * real render path, and that no placeholder year reaches the printed page.
 *
 * Run: php database/views/check_report_text.php [connection] [YYYY-MM]
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Models\CompanyGroup;
use App\Support\Formatter;
use Illuminate\Support\Facades\DB;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$connection = $argv[1] ?? 'connect_jos_service';
$month = $argv[2] ?? '2026-09';
$view = $argv[3] ?? 'V_SALES_REPORT_TMP';

/** Mirrors the controller's row build. */
function buildRows(string $connection, string $view, string $month): array
{
    $from = $month . '-01';
    $to = date('Y-m-t', strtotime($from));

    $rows = DB::connection($connection)->table($view)
        ->whereBetween('SLODET_DATE', ["$from 00:00:00", "$to 23:59:59"])
        ->select([
            DB::raw("COALESCE(MITM_ITMCAT, '-') as MITM_ITMCAT"), 'MUSAGE_ALIAS', 'TSLO_SLOCD',
            'MITM_ITMCD', 'MITM_ITMNM', 'TDLVORDDETA_DLVCD', 'TQUO_PROJECT_LOCATION',
            'CSPK_PIC_AS', 'CSPK_PIC_NAME', 'MCUS_CUSNM', 'TSLODETA_ITMQT', 'totalTax',
            'name', 'TSLODETA_PERIOD_FR', 'TSLODETA_PERIOD_TO',
        ])
        ->orderBy('MITM_ITMCAT')->orderBy('MUSAGE_ALIAS')
        ->get();

    $rupiah = fn (float $n): string => 'Rp ' . number_format($n, 0, ',', '.');
    $hasil = ['BARU' => [], 'PERPANJANGAN' => []];
    $zero = ['qty' => 0, 'tax' => 0, 'total' => 0, 'qty_fmt' => 'Rp 0', 'tax_fmt' => 'Rp 0', 'total_fmt' => 'Rp 0'];
    $meta = ['BARU' => ['grand' => $zero], 'PERPANJANGAN' => ['grand' => $zero], 'sub' => ['BARU' => [], 'PERPANJANGAN' => []]];

    foreach ($rows as $rowObj) {
        $row = (array) $rowObj;
        $cat = $row['MITM_ITMCAT'] ?? 'UNKNOWN';
        $usage = $row['MUSAGE_ALIAS'] ?? 'UNKNOWN';
        $section = str_contains((string) ($row['TSLO_SLOCD'] ?? ''), '-') ? 'PERPANJANGAN' : 'BARU';
        $qty = (float) ($row['TSLODETA_ITMQT'] ?? 0);
        $tax = (float) ($row['totalTax'] ?? 0);

        $meta[$section]['grand']['qty'] += $qty;
        $meta[$section]['grand']['tax'] += $tax;

        $row['qty_fmt'] = $rupiah($qty);
        $row['tax_fmt'] = $rupiah($tax);
        $row['total_fmt'] = $rupiah($qty + $tax);
        $row['period_fr_fmt'] = Formatter::date($row['TSLODETA_PERIOD_FR'] ?? null);
        $row['period_to_fmt'] = Formatter::date($row['TSLODETA_PERIOD_TO'] ?? null);
        $row['driver_name'] = (($row['CSPK_PIC_AS'] ?? '') === 'DRIVER') ? ($row['CSPK_PIC_NAME'] ?? '') : '';
        $row['operator_name'] = (($row['CSPK_PIC_AS'] ?? '') === 'OPERATOR') ? ($row['CSPK_PIC_NAME'] ?? '') : '';

        $hasil[$section][$cat][$usage][] = $row;
    }

    foreach (['BARU', 'PERPANJANGAN'] as $sec) {
        $meta[$sec]['grand']['total'] = $meta[$sec]['grand']['qty'] + $meta[$sec]['grand']['tax'];
        $meta[$sec]['grand']['qty_fmt'] = $rupiah($meta[$sec]['grand']['qty']);
        $meta[$sec]['grand']['tax_fmt'] = $rupiah($meta[$sec]['grand']['tax']);
        $meta[$sec]['grand']['total_fmt'] = $rupiah($meta[$sec]['grand']['total']);

        foreach (($meta['sub'][$sec] ?? []) as $cat => $usages) {
            foreach ($usages as $usage => $st) {
                $total = ($st['qty'] ?? 0) + ($st['tax'] ?? 0);
                $meta['sub'][$sec][$cat][$usage] = array_merge($st, [
                    'total' => $total,
                    'qty_fmt' => $rupiah((float) ($st['qty'] ?? 0)),
                    'tax_fmt' => $rupiah((float) ($st['tax'] ?? 0)),
                    'total_fmt' => $rupiah((float) $total),
                ]);
            }
        }
    }

    return [$hasil, $meta, $from, $to];
}

[$hasil, $meta, $from, $to] = buildRows($connection, $view, $month);
$company = CompanyGroup::where('connection', $connection)->first();

$html = view('pdf.salesReport', [
    'data' => $hasil,
    'meta' => $meta,
    'dateRange' => [$from, $to],
    'periodLabel' => '01 - ' . date('t', strtotime($from)) . ' ' . date('F Y', strtotime($from)) . ' (bulan penuh)',
    'branchLabel' => 'Semua Cabang',
    'header' => $company->name ?? $connection,
    'subHeader' => 'SALES & RENTAL',
    'addr' => $company->address ?? '',
    'approvalList' => [],
    'repeatTableHeader' => false,
])->render();

preg_match_all('/>([^<>]+)</', $html, $m);
$cells = array_values(array_filter(array_map('trim', $m[1]), fn ($v) => $v !== ''));

// only inspect table-ish cells, skip the boilerplate header text
$data = array_values(array_filter($cells, fn ($c) => strlen($c) < 60));

$fail = 0;
$check = function (string $label, bool $ok, string $detail = '') use (&$fail) {
    if (! $ok) { $fail++; }
    printf("  [%s] %-56s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
};

printf("=== %s / %s / %s ===\n", $connection, $view, $month);
printf("  html %d bytes, %d text cells\n\n", strlen($html), count($cells));

$tiny = array_values(array_filter($data, fn ($c) => preg_match('/^Rp ?[1-9]$/', $c)));
$check('no rupiah-formatted bare quantities (Rp 1..9)', empty($tiny), implode(', ', array_slice($tiny, 0, 5)));

$money = array_values(array_filter($data, fn ($c) => preg_match('/^Rp ?[0-9]{1,3}(\.[0-9]{3})+$/', $c)));
$check('real amount cells present', count($money) > 0, count($money) . ' cells');

// A leak is a cell RENDERED AS A PLACEHOLDER DATE, not any string containing those
// digits: document numbers like POS/JAT/2026/03/01/0001 legitimately contain "-0001".
$leak = array_values(array_filter($data, function ($c) {
    $c = trim($c);

    if ($c === '0000-00-00' || $c === '0000-00-00 00:00:00') { return true; }
    if (preg_match('/^1970$/', $c)) { return true; }                  // a bare "1970" cell
    if (preg_match('/^\d{1,2} \w{3} 1970$/', $c)) { return true; }    // "01 Jan 1970"
    if (preg_match('/\d{1,2} \w{3} -\d{4}$/', $c)) { return true; }   // "30 Nov -0001"

    return false;
}));
$check('no 1970 / year-zero DATE on the page', empty($leak), implode(', ', array_slice($leak, 0, 3)));

// and the period columns must print '-' exactly when the data has no period.
// Note: a company group can legitimately have zero missing periods, so compare
// against how many rows actually carry no usable period rather than assuming one.
$missingPeriods = 0;
foreach ($data as $c) {
    if ($c === '-') { $missingPeriods++; }
}
$rowsWithoutPeriod = DB::connection($connection)->table($view)
    ->whereBetween('SLODET_DATE', ["$from 00:00:00", "$to 23:59:59"])
    ->where(function ($q) {
        $q->whereNull('TSLODETA_PERIOD_FR')
          ->orWhere('TSLODETA_PERIOD_FR', '')
          ->orWhere('TSLODETA_PERIOD_FR', '-')
          ->orWhere('TSLODETA_PERIOD_FR', 'like', '0000%');
    })
    ->count();

if ($rowsWithoutPeriod > 0) {
    $check('missing periods render as "-"', $missingPeriods > 0, "$rowsWithoutPeriod rows lack a period, $missingPeriods dash cells");
} else {
    $check('no missing periods in this month (nothing to dash)', true, "$missingPeriods dash cells");
}

echo "\n  sample amounts: ", implode(' | ', array_slice(array_unique($money), 0, 8)), "\n";

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
