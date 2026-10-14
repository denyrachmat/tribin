<?php
/**
 * Verifies the Sales Report month/branch logic without a web request.
 *
 * Run: php database/views/test_sales_report_filter.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Models\User;
use App\Traits\SalesReportFilterTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

/** Stub standing in for ReceiveOrderController. */
class SalesReportFilterStub
{
    use SalesReportFilterTraits;

    protected $dedicatedConnection = 'jatpower_jos_jatpt';

    // Re-expose the trait's protected helpers for testing.
    public function p(Request $r) { return $this->resolveSalesReportPeriod($r); }
    public function wants(Request $r) { return $this->wantsSalesReportBranch($r); }
    public function lbl(array $p) { return $this->salesReportPeriodLabel($p); }
    public function blbl(bool $a, string $b) { return $this->salesReportBranchLabel($a, $b); }
}

$s = new SalesReportFilterStub();
$failures = 0;

function check(string $label, $actual, $expected)
{
    global $failures;
    $ok = $actual === $expected;
    if (! $ok) {
        $failures++;
    }
    printf("  [%s] %-58s got %s\n", $ok ? 'PASS' : 'FAIL', $label,
        var_export($actual, true) . ($ok ? '' : ' | expected ' . var_export($expected, true)));
}

echo "=== month -> fdate/ldate ===\n";
$cases = [
    // month     expected from     expected to        why
    ['2026-09', '2026-09-01', '2026-09-30', '30-day month'],
    ['2026-10', '2026-10-01', '2026-10-31', '31-day month'],
    ['2026-12', '2026-12-01', '2026-12-31', 'year rollover'],
    ['2026-01', '2026-01-01', '2026-01-31', 'january'],
    ['2026-02', '2026-02-01', '2026-02-28', 'non-leap february'],
    ['2028-02', '2028-02-01', '2028-02-29', 'leap february'],
    ['2027-02', '2027-02-01', '2027-02-28', 'non-leap (2027)'],
    ['2100-02', '2100-02-01', '2100-02-28', 'century non-leap'],
    ['2000-02', '2000-02-01', '2000-02-29', 'century leap'],
    ['2026-04', '2026-04-01', '2026-04-30', 'april'],
];
foreach ($cases as [$month, $ef, $el, $why]) {
    $p = $s->p(Request::create('/', 'POST', ['mode' => 'month', 'month' => $month]));
    check("month $month ($why)", $p ? $p['fdate'] . '..' . $p['ldate'] : null, $ef . '..' . $el);
}

echo "\n=== range mode keeps the caller's dates ===\n";
$p = $s->p(Request::create('/', 'POST', ['mode' => 'range', 'fdate' => '2026-09-05', 'ldate' => '2026-09-20']));
check('explicit range preserved', $p['fdate'] . '..' . $p['ldate'], '2026-09-05..2026-09-20');
check('range has no month marker', $p['month'], null);

$p = $s->p(Request::create('/', 'POST', ['fdate' => '2026-09-05', 'ldate' => '2026-09-20']));
check('fdate/ldate alone (legacy callers) works', $p['fdate'] . '..' . $p['ldate'], '2026-09-05..2026-09-20');

$p = $s->p(Request::create('/', 'POST', ['fdate' => '2026-09-20', 'ldate' => '2026-09-05']));
check('swapped range is normalised', $p['fdate'] . '..' . $p['ldate'], '2026-09-05..2026-09-20');

echo "\n=== invalid input is rejected, never silently whole-table ===\n";
foreach ([
    ['mode' => 'month'],
    ['mode' => 'month', 'month' => ''],
    ['mode' => 'month', 'month' => '2026'],
    ['mode' => 'month', 'month' => '2026-13'],
    ['mode' => 'month', 'month' => 'sometime'],
    ['mode' => 'range'],
    ['mode' => 'range', 'fdate' => '2026-09-01'],
    ['mode' => 'range', 'fdate' => 'not-a-date', 'ldate' => '2026-09-30'],
] as $i => $payload) {
    $p = $s->p(Request::create('/', 'POST', $payload));
    check('invalid #' . $i . ' -> null', $p, null);
}

echo "\n=== branch ask detection ===\n";
foreach ([
    [[], false, 'absent'],
    [['branch' => ''], false, 'empty string = all branches'],
    [['branch' => null], false, 'null'],
    [['branch' => '101'], true, 'a code'],
    [['branch' => '0'], true, 'zero is a real code, not "empty"'],
] as [$payload, $expected, $why]) {
    check("wantsBranch ($why)", $s->wants(Request::create('/', 'POST', $payload)), $expected);
}

echo "\n=== period label ===\n";
$p = $s->p(Request::create('/', 'POST', ['mode' => 'month', 'month' => '2026-09']));
check('whole month label', $s->lbl($p), '01 - 30 September 2026 (bulan penuh)');
$p = $s->p(Request::create('/', 'POST', ['mode' => 'month', 'month' => '2028-02']));
check('leap february label', $s->lbl($p), '01 - 29 February 2028 (bulan penuh)');
$p = $s->p(Request::create('/', 'POST', ['fdate' => '2026-09-05', 'ldate' => '2026-09-20']));
check('range label', $s->lbl($p), '05 Sep 2026 - 20 Sep 2026');

echo "\n=== branch label defaults ===\n";
check('no filter -> Semua Cabang', $s->blbl(false, ''), 'Semua Cabang');
check('filter requested but not applied -> Semua Cabang', $s->blbl(false, '101'), 'Semua Cabang');

echo "\n=== month boundary: the day after a month is excluded ===\n";
$p = $s->p(Request::create('/', 'POST', ['mode' => 'month', 'month' => '2026-09']));
check('Sep end is 2026-09-30 (not 10-01)', $p['ldate'], '2026-09-30');
$p = $s->p(Request::create('/', 'POST', ['mode' => 'month', 'month' => '2028-02']));
check('leap Feb end is 2028-02-29', $p['ldate'], '2028-02-29');

printf("\n%s (%d failure%s)\n", $failures ? 'FAILURES' : 'ALL CHECKS PASSED', $failures, $failures === 1 ? '' : 's');
exit($failures ? 1 : 0);
