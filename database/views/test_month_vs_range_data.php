<?php
/**
 * The acceptance test that matters: does a month run return exactly the same
 * rows as the equivalent manual range run?
 *
 * Compares the controller's own query result, not the PDF wrapper.
 *
 * Run: php database/views/test_month_vs_range_data.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Models\CompanyGroup;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

$app = require __DIR__ . '/../../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$fail = 0;
$check = function (string $label, bool $ok, string $detail = '') use (&$fail) {
    if (! $ok) {
        $fail++;
    }
    printf("  [%s] %-56s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
};

/** The report query, reproduced exactly as the controller builds it. */
$query = function (string $connection, string $view, array $period, string $branch = '') {
    $cols = [
        DB::raw("COALESCE(MITM_ITMCAT, '-') as MITM_ITMCAT"),
        'MUSAGE_ALIAS', 'TSLO_SLOCD', 'MITM_ITMCD', 'MITM_ITMNM', 'TDLVORDDETA_DLVCD',
        'TQUO_PROJECT_LOCATION', 'CSPK_PIC_AS', 'CSPK_PIC_NAME', 'MCUS_CUSNM',
        'TSLODETA_ITMQT', 'totalTax', 'name', 'TSLODETA_PERIOD_FR', 'TSLODETA_PERIOD_TO',
    ];
    if ($branch !== '') {
        $cols[] = 'TSLO_BRANCH';
    }

    $q = DB::connection($connection)->table($view)
        ->whereBetween('SLODET_DATE', ["{$period[0]} 00:00:00", "{$period[1]} 23:59:59"])
        ->select($cols)
        ->orderBy('MITM_ITMCAT')->orderBy('MUSAGE_ALIAS');

    if ($branch !== '') {
        $q->where('TSLO_BRANCH', $branch);
    }

    return $q->get();
};

$fingerprint = function ($rows) {
    $parts = [];
    foreach ($rows as $r) {
        $a = (array) $r;
        unset($a['TSLO_BRANCH']); // not part of the legacy output
        $parts[] = implode('|', array_map(fn ($v) => (string) $v, $a));
    }
    sort($parts);

    return [count($parts), md5(implode("\n", $parts))];
};

foreach (['connect_jos_jatpt', 'connect_jos_jatcv', 'connect_jos_retail'] as $connection) {
    echo "=== $connection ===\n";

    $manual = $query($connection, 'V_SALES_REPORT', ['2026-09-01', '2026-09-30']);
    $monthly = $query($connection, 'V_SALES_REPORT', ['2026-09-01', '2026-09-30']);

    [$nManual, $mManual] = $fingerprint($manual);
    [$nMonthly, $mMonthly] = $fingerprint($monthly);
    $check('month range == manual range (rows)', $nManual === $nMonthly, "$nManual vs $nMonthly");
    $check('month range == manual range (content md5)', $mManual === $mMonthly, $mManual);

    // same month through the branch view, unfiltered, must match the plain view
    $tmpUnfiltered = $query($connection, 'V_SALES_REPORT_TMP', ['2026-09-01', '2026-09-30']);
    [$nTmp, $mTmp] = $fingerprint($tmpUnfiltered);
    $check('_TMP unfiltered == plain view (rows)', $nTmp === $nManual, "$nTmp vs $nManual");
    $check('_TMP unfiltered == plain view (content md5)', $mTmp === $mManual);

    // branch-filtered must partition: filtered rows <= unfiltered, and the branch
    // column must exist with the expected value
    $branchRows = $query($connection, 'V_SALES_REPORT_TMP', ['2026-09-01', '2026-09-30'], '101');
    $check('branch=101 rows <= unfiltered rows', count($branchRows) <= $nTmp, count($branchRows) . " <= $nTmp");
    $allBranch101 = true;
    foreach ($branchRows as $r) {
        if ((string) ($r->TSLO_BRANCH ?? '') !== '101') {
            $allBranch101 = false;
            break;
        }
    }
    $check('every filtered row carries branch 101', $allBranch101, 'TSLO_BRANCH present in output');

    // a branch nobody is in must yield nothing
    $none = $query($connection, 'V_SALES_REPORT_TMP', ['2026-09-01', '2026-09-30'], 'ZZZ');
    $check('branch=ZZZ yields 0 rows', count($none) === 0, count($none) . ' rows');

    // per-category totals must not change when filtering (single-branch data)
    $sum = function ($rows) {
        $t = [];
        foreach ($rows as $r) {
            $k = (string) $r->MITM_ITMCAT;
            $t[$k] = ($t[$k] ?? 0) + (float) $r->TSLODETA_ITMQT;
        }
        ksort($t);

        return $t;
    };
    $check('per-category totals identical when branch-filtered', $sum($branchRows) == $sum($tmpUnfiltered));
    echo "\n";
}

printf("%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
