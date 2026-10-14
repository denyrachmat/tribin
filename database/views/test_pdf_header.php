<?php
/**
 * Renders the report blade directly to text (HTML), so the header content can be
 * asserted without depending on PDF internals.
 *
 * Run: php database/views/test_pdf_header.php
 */
require __DIR__ . '/../../vendor/autoload.php';

$app = require __DIR__ . '/../../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$render = function (array $extra) {
    return view('pdf.salesReport', array_merge([
        'data' => ['BARU' => [], 'PERPANJANGAN' => []],
        'meta' => ['BARU' => ['grand' => [], 'qty' => 0, 'tax' => 0, 'total' => 0],
                   'PERPANJANGAN' => ['grand' => [], 'qty' => 0, 'tax' => 0, 'total' => 0],
                   'sub' => ['BARU' => [], 'PERPANJANGAN' => []]],
        'dateRange' => ['2026-09-01', '2026-09-30'],
        'header' => 'PT JAT POWERINDO',
        'subHeader' => 'SALES & RENTAL',
        'addr' => 'Palembang',
        'approvalList' => [],
        'repeatTableHeader' => false,
    ], $extra))->render();
};

$fail = 0;
$check = function (string $label, bool $ok, string $detail = '') use (&$fail) {
    if (! $ok) {
        $fail++;
    }
    printf("  [%s] %-52s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
};

echo "=== monthly mode: new header ===\n";
$html = $render([
    'periodLabel' => '01 - 30 September 2026 (bulan penuh)',
    'branchLabel' => 'Palembang (101)',
]);
$check('shows "Periode:"', str_contains($html, 'Periode:'), '');
$check('shows the formatted period', str_contains($html, '01 - 30 September 2026 (bulan penuh)'));
$check('shows "Cabang:"', str_contains($html, 'Cabang:'));
$check('shows the branch', str_contains($html, 'Palembang (101)'));
$check('no leftover "From ... to ..."', ! str_contains($html, 'From '));

echo "\n=== legacy call: header unchanged (no periodLabel/branchLabel passed) ===\n";
$htmlOld = $render([]);
$check('keeps "From 01 Sep 2026 to 30 Sep 2026"', str_contains($htmlOld, 'From 01 Sep 2026 to 30 Sep 2026'));
$check('no "Periode:" line', ! str_contains($htmlOld, 'Periode:'));
$check('no "Cabang:" line', ! str_contains($htmlOld, 'Cabang:'));

echo "\n=== edge: only periodLabel (e.g. report all branches) ===\n";
$htmlP = $render(['periodLabel' => '01 - 30 September 2026 (bulan penuh)', 'branchLabel' => '']);
$check('period shown', str_contains($htmlP, 'Periode: 01 - 30 September 2026'));
$check('branch line omitted when empty', ! str_contains($htmlP, 'Cabang:'));

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
