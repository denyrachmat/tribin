<?php
/**
 * End-to-end check: the two real service rows carrying '0000-00-00' must print '-',
 * and a normal row must still print its dates.
 *
 * Run: php database/views/test_period_render_real.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Support\Formatter;
use Illuminate\Support\Facades\DB;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$fail = 0;
$check = function (string $label, bool $ok, string $detail = '') use (&$fail) {
    if (! $ok) {
        $fail++;
    }
    printf("  [%s] %-56s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
};

echo "=== REAL bad rows: service records with year-zero period ===\n";
$rows = DB::connection('connect_jos_service')->table('V_SALES_REPORT')
    ->where(function ($q) {
        $q->where('TSLODETA_PERIOD_FR', 'like', '0000%')
          ->orWhere('TSLODETA_PERIOD_TO', 'like', '0000%');
    })
    ->select('TSLO_SLOCD', 'TSLODETA_PERIOD_FR', 'TSLODETA_PERIOD_TO')
    ->get();

printf("  found %d row(s) with year-zero dates\n", $rows->count());
foreach ($rows as $r) {
    $fr = Formatter::date($r->TSLODETA_PERIOD_FR);
    $to = Formatter::date($r->TSLODETA_PERIOD_TO);
    printf("    %-24s raw=%s -> printed='%s' / '%s'\n",
        $r->TSLO_SLOCD, $r->TSLODETA_PERIOD_FR, $fr, $to);
    $check('year-zero prints as -', $fr === '-' && $to === '-');
}

echo "\n=== REAL good rows: dates must survive untouched ===\n";
$good = DB::connection('connect_jos_jatpt')->table('V_SALES_REPORT')
    ->whereBetween('SLODET_DATE', ['2026-09-01 00:00:00', '2026-09-30 23:59:59'])
    ->whereNotNull('TSLODETA_PERIOD_FR')
    ->select('TSLO_SLOCD', 'TSLODETA_PERIOD_FR', 'TSLODETA_PERIOD_TO')
    ->limit(4)
    ->get();

foreach ($good as $r) {
    $before = date('d M Y', strtotime($r->TSLODETA_PERIOD_FR));
    $after = Formatter::date($r->TSLODETA_PERIOD_FR);
    printf("    %-24s %s -> '%s'\n", $r->TSLO_SLOCD, $r->TSLODETA_PERIOD_FR, $after);
    $check('valid date unchanged', $before === $after, "$before vs $after");
}

echo "\n=== the service POS leg emits a bare '-' for both period columns ===\n";
$dash = DB::connection('connect_jos_service')->table('V_SALES_REPORT')
    ->where('TSLODETA_PERIOD_FR', '-')->count();
printf("    %d rows carry '-'\n", $dash);
$check("'-' prints as '-'", Formatter::date('-') === '-');

echo "\n=== scan: does ANY row in any CG now print a placeholder year? ===\n";
foreach (['connect_jos_jatpt', 'connect_jos_jatcv', 'connect_jos_retail', 'connect_jos_service'] as $conn) {
    $bad = 0;
    $checked = 0;
    DB::connection($conn)->table('V_SALES_REPORT')
        ->select('TSLODETA_PERIOD_FR', 'TSLODETA_PERIOD_TO')
        ->orderBy('SLODET_DATE', 'desc')
        ->chunk(500, function ($rows) use (&$bad, &$checked) {
            foreach ($rows as $r) {
                foreach ([$r->TSLODETA_PERIOD_FR, $r->TSLODETA_PERIOD_TO] as $v) {
                    $checked++;
                    $out = Formatter::date($v);
                    if (str_contains($out, '1970') || str_contains($out, '-0001') || str_contains($out, '0000')) {
                        $bad++;
                        if ($bad <= 3) {
                            printf("\n      leak: raw=%s -> %s", var_export($v, true), $out);
                        }
                    }
                }
            }
        });
    $check("$conn: no placeholder year", $bad === 0, "$checked values checked, $bad bad");
}

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
