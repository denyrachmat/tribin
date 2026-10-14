<?php
/**
 * Regression test for the view-selection bug.
 *
 * The original bug: the view-exists check compared TABLE_SCHEMA against the
 * CONNECTION name ("connect_jos_service") instead of the real schema
 * ("jatpower_jos_service"). It never matched, so _TMP was never selected and the
 * branch filter silently fell back to the plain view - for every company group, on
 * every run. Direct SQL tests passed because they queried _TMP by name.
 *
 * This test drives the controller's own resolution helpers, so a wrong schema
 * comparison fails the build.
 *
 * Run: php database/views/test_view_selection.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Models\User;
use App\Support\ReflectionHelper;
use App\Traits\SalesReportFilterTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

Auth::login(User::whereNotNull('nick_name')->first());

/** Exposes the trait's protected helpers for assertion. */
class ViewSelectionProbe
{
    use SalesReportFilterTraits;

    public string $dedicatedConnection;

    public function __construct(string $connection)
    {
        $this->dedicatedConnection = $connection;
    }

    public function schema(): string
    {
        return $this->salesReportSchema();
    }

    public function exists(string $view): bool
    {
        return $this->salesReportViewExists($view);
    }

    public function resolveView(bool $filtering): string
    {
        return $this->resolveSalesReportView($filtering);
    }

    public function resolveBranch(Request $r): string
    {
        return $this->resolveSalesReportBranch($r);
    }

    public function wants(Request $r): bool
    {
        return $this->wantsSalesReportBranch($r);
    }

    public function tmpView(): string
    {
        return $this->salesReportBranchView;
    }

    public function hasBranchColumn(string $view): bool
    {
        return $this->salesReportViewHasBranchColumn($view);
    }
}

$fail = 0;
$check = function (string $label, $actual, $expected) use (&$fail) {
    $ok = $actual === $expected;
    if (! $ok) {
        $fail++;
    }
    printf("  [%s] %-54s got %-28s %s\n", $ok ? 'PASS' : 'FAIL', $label,
        var_export($actual, true), $ok ? '' : 'expected ' . var_export($expected, true));
};

// connection name => schema name, and whether _TMP exists on staging
$cases = [
    'connect_jos_jatpt' => ['jatpower_jos_jatpt', true],
    'connect_jos_jatcv' => ['jatpower_jos_jatcv', true],
    'connect_jos_retail' => ['jatpower_jos_retail', true],
    'connect_jos_service' => ['jatpower_jos_service', true],
];

echo "=== schema resolution: connection name must map to the real schema ===\n";
foreach ($cases as $connection => [$expectedSchema, $_]) {
    $probe = new ViewSelectionProbe($connection);
    $check("$connection -> schema", $probe->schema(), $expectedSchema);
    $check("$connection: _TMP exists", $probe->exists($probe->tmpView()), true);
}

echo "\n=== the bug itself: _TMP must be SELECTED, filter or not ===\n";
foreach ($cases as $connection => [$schema, $_]) {
    $probe = new ViewSelectionProbe($connection);
    $check("$connection: filtering selects _TMP", $probe->resolveView(true), 'V_SALES_REPORT_TMP');
    // _TMP is preferred even without a branch filter, because it also carries
    // independent fixes (the service money column) and is output-identical otherwise.
    $check("$connection: no filter still uses _TMP", $probe->resolveView(false), 'V_SALES_REPORT_TMP');
}

echo "\n=== branch capability is a COLUMN question, not a view-name question ===\n";
// All four groups now expose TSLO_BRANCH in _TMP: service derives it per UNION leg
// from T_SLOHEAD.TSLO_BRANCH, T_SRV_HEAD.SRVH_BRANCH and users.branch (POS).
$branchCapable = [
    'connect_jos_jatpt' => true,
    'connect_jos_jatcv' => true,
    'connect_jos_retail' => true,
    'connect_jos_service' => true,
];
foreach ($branchCapable as $connection => $expected) {
    $probe = new ViewSelectionProbe($connection);
    $check("$connection: branch column present in _TMP", $probe->hasBranchColumn('V_SALES_REPORT_TMP'), $expected);
}

echo "\n=== a missing _TMP must still fall back, not break ===\n";
foreach ($cases as $connection => [$schema, $_]) {
    $probe = new ViewSelectionProbe($connection);
    $check("$connection: absent view reports absent", $probe->exists('V_SALES_REPORT_DOES_NOT_EXIST'), false);
}

echo "\n=== service has no branch column: resolution must still be sane ===\n";
$probe = new ViewSelectionProbe('connect_jos_service');
$check('service _TMP exists (money fix lives there)', $probe->exists('V_SALES_REPORT_TMP'), true);

echo "\n=== branch filter request handling (whitelist) ===\n";
$probe = new ViewSelectionProbe('connect_jos_jatpt');
$check('absent branch = no filter', $probe->wants(Request::create('/', 'POST', [])), false);
$check('empty branch = no filter', $probe->wants(Request::create('/', 'POST', ['branch' => ''])), false);
$check('branch=101 = filter', $probe->wants(Request::create('/', 'POST', ['branch' => '101'])), true);

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
