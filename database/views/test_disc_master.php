<?php
/**
 * CRUD + validation test for the Discount master, driving the real controller.
 *
 * Run: php database/views/test_disc_master.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Http\Controllers\DiscController;
use App\Models\M_DISC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$fail = 0;
$check = function (string $label, bool $ok, string $detail = '') use (&$fail) {
    if (! $ok) { $fail++; }
    printf("  [%s] %-56s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
};

$controller = new DiscController();
$CODES = ['TESTDISC10', 'TESTDISC20', 'TESTDISCAMT', 'TESTDISCBAD', 'TESTDISCX'];

// clean any leftovers from a previous run
M_DISC::whereIn('MDISC_CODE', $CODES)->delete();

// Baseline for the "left as found" check at the end.
$rowsAtStart = M_DISC::count();

$post = function (array $payload) use ($controller) {
    return $controller->store(Request::create('/disc', 'POST', $payload));
};
$put = function (string $code, array $payload) use ($controller) {
    return $controller->update(Request::create("/disc/$code", 'PUT', $payload), $code);
};

$describe = fn ($r) => is_object($r) ? get_class($r) : gettype($r);

echo "=== 1. create a percent discount ===\n";
$r = $post(['MDISC_CODE' => 'TESTDISC10', 'MDISC_DESC' => 'Diskon 10 persen', 'MDISC_PERCENT' => '10', 'MDISC_AMT' => '']);
$check('stored (200, not 422)', !($r instanceof \Illuminate\Http\JsonResponse), $describe($r));
$row = M_DISC::where('MDISC_CODE', 'TESTDISC10')->first();
$check('percent saved', (float) $row->MDISC_PERCENT === 10.0, (string) $row->MDISC_PERCENT);
$check('amount stored as NULL, not ""', $row->MDISC_AMT === null, var_export($row->MDISC_AMT, true));

echo "\n=== 2. create a fixed-amount discount ===\n";
$r = $post(['MDISC_CODE' => 'TESTDISCAMT', 'MDISC_DESC' => 'Potongan 50rb', 'MDISC_PERCENT' => '', 'MDISC_AMT' => '50000']);
$row = M_DISC::where('MDISC_CODE', 'TESTDISCAMT')->first();
$check('amount saved', $row && (float) $row->MDISC_AMT === 50000.0, $row ? (string) $row->MDISC_AMT : 'missing');
$check('percent stored as NULL', $row && $row->MDISC_PERCENT === null, $row ? var_export($row->MDISC_PERCENT, true) : '');

echo "\n=== 3. update an existing discount (in place, no duplicate) ===\n";
$put('TESTDISC10', ['MDISC_DESC' => 'Diskon 10 persen (rev)', 'MDISC_PERCENT' => '10']);
$n = M_DISC::where('MDISC_CODE', 'TESTDISC10')->count();
$row = M_DISC::where('MDISC_CODE', 'TESTDISC10')->first();
$check('still exactly one row', $n === 1, "count=$n");
$check('description updated', $row->MDISC_DESC === 'Diskon 10 persen (rev)', (string) $row->MDISC_DESC);

echo "\n=== 4. rejections (must be 422, nothing stored) ===\n";
$bad = [
    'no code' => ['MDISC_CODE' => '', 'MDISC_PERCENT' => '5'],
    'neither percent nor amount' => ['MDISC_CODE' => 'TESTDISCBAD', 'MDISC_DESC' => 'x'],
    'both percent and amount' => ['MDISC_CODE' => 'TESTDISCBAD', 'MDISC_PERCENT' => '5', 'MDISC_AMT' => '1000'],
    'percent over 100' => ['MDISC_CODE' => 'TESTDISCBAD', 'MDISC_PERCENT' => '150'],
    'negative percent' => ['MDISC_CODE' => 'TESTDISCBAD', 'MDISC_PERCENT' => '-5'],
    'negative amount' => ['MDISC_CODE' => 'TESTDISCBAD', 'MDISC_AMT' => '-1000'],
    'non-numeric percent' => ['MDISC_CODE' => 'TESTDISCBAD', 'MDISC_PERCENT' => 'abc'],
];
foreach ($bad as $label => $payload) {
    $r = $post($payload);
    $is422 = $r instanceof \Illuminate\Http\JsonResponse && $r->getStatusCode() === 422;
    $check("rejected: $label", $is422, $is422 ? '422' : 'ACCEPTED (should not be)');
}
$check('no junk row was written', M_DISC::where('MDISC_CODE', 'TESTDISCBAD')->count() === 0);

echo "\n=== 5. boundary values ===\n";
$r = $post(['MDISC_CODE' => 'TESTDISCX', 'MDISC_PERCENT' => '0']);
$check('percent 0 accepted', !($r instanceof \Illuminate\Http\JsonResponse), 'boundary min');
$r = $put('TESTDISCX', ['MDISC_PERCENT' => '100']);
$check('percent 100 accepted', !($r instanceof \Illuminate\Http\JsonResponse), 'boundary max');
$r = $put('TESTDISCX', ['MDISC_AMT' => '0']);
$check('amount 0 accepted (free line)', !($r instanceof \Illuminate\Http\JsonResponse), 'boundary min');

echo "\n=== 6. listing + search ===\n";
$res = $controller->searchAPI(Request::create('/disc/searchAPI', 'POST', []));
$check('searchAPI returns a data array', isset($res['data']) && is_iterable($res['data']), count($res['data']) . ' rows');
$res = $controller->searchAPI(Request::create('/disc/searchAPI', 'POST', ['searchBy' => 'MDISC_CODE', 'searchValue' => 'TESTDISC']));
$codes = collect($res['data'])->pluck('MDISC_CODE')->all();
$check('search filters by code', count($codes) > 0 && count(array_filter($codes, fn ($c) => str_contains($c, 'TESTDISC'))) === count($codes), implode(',', $codes));
// a hostile column name must not become SQL
$res = $controller->searchAPI(Request::create('/disc/searchAPI', 'POST', ['searchBy' => 'MDISC_CODE) OR 1=1 --', 'searchValue' => 'x']));
$check('unknown/bogus search column ignored safely', isset($res['data']), 'no error');

echo "\n=== 7. delete ===\n";
foreach ($CODES as $c) {
    $controller->destroy($c);
}
$left = M_DISC::whereIn('MDISC_CODE', $CODES)->count();
$check('all test rows removed', $left === 0, "left=$left");
// The table may legitimately hold real rates, so assert it was left as FOUND
// rather than assuming it starts empty.
$check('table left as found', M_DISC::count() === $rowsAtStart, M_DISC::count() . ' rows, started with ' . $rowsAtStart);

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
