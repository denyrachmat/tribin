<?php
/**
 * Verifies that the new Sales Report page actually made it into the built SPA.
 *
 * Run after `npx quasar build` (inside tribinapp/):
 *   php database/views/test_frontend_build.php
 */
$root = __DIR__ . '/../../tribinapp/dist/spa';

$fail = 0;
$check = function (string $label, bool $ok, string $detail = '') use (&$fail) {
    if (! $ok) {
        $fail++;
    }
    printf("  [%s] %-56s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
};

echo "=== build output: $root ===\n";

$chunks = glob($root . '/assets/monthlySalesReportView-*.js') ?: [];
$check('page chunk emitted', count($chunks) > 0, $chunks ? basename($chunks[0]) : 'missing');

$bundle = '';
$allChunks = '';
foreach (glob($root . '/assets/*.js') ?: [] as $f) {
    $content = file_get_contents($f);
    $allChunks .= $content;
    if (str_contains(basename($f), 'index-')) {
        $bundle .= $content;
    }
}

$check('route lazy-loads the page', str_contains($bundle, 'monthlySalesReportView'));
$check('route path registered', str_contains($bundle, 'monthlySalesReport'));
$check('calls the branch-options endpoint', str_contains($allChunks, 'salesReportBranchOptions'));
$check('posts to marketingReport', str_contains($allChunks, 'receive-order/marketingReport'));

$html = file_get_contents($root . '/index.html');
$check('index.html is a Quasar SPA shell', str_contains($html, 'JAT Tribin App'));

// Staging builds must never carry production API hosts.
$prodHost = 'jos.jatpowerindo.co.id';
$stageHost = 'jos.idprofitsol.com';
$wholeBundle = $bundle;
foreach (glob($root . '/assets/*.js') ?: [] as $f) {
    $wholeBundle .= file_get_contents($f);
}
$hasProd = str_contains($wholeBundle, $prodHost);
$hasStage = str_contains($wholeBundle, $stageHost);
$check('no production API host baked in', ! $hasProd, $hasProd ? "found $prodHost" : '');
$check('staging API host present', $hasStage, $hasStage ? $stageHost : "missing $stageHost");

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
