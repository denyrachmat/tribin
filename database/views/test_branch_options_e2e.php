<?php
/**
 * End-to-end check for GET receive-order/salesReportBranchOptions.
 *
 * Dispatches the REAL route through the HTTP kernel with an authenticated,
 * full-branch-access user and the CGID cookie set, then asserts the response is
 * 200 with a populated {data:[{code,name},...]} payload.
 *
 * This is the acceptance check for the recursion bug: before the fix the same
 * request returns 500 (memory exhausted); after it, real branches come back.
 *
 * Run: php database/views/test_branch_options_e2e.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$failures = 0;
$checks = 0;

function check(string $label, bool $ok, string $detail = ''): void
{
    global $failures, $checks;
    $checks++;
    if (! $ok) {
        $failures++;
    }
    printf("  [%s] %-52s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
}

echo "=== GET receive-order/salesReportBranchOptions ===\n";

// Pick a user who can see every branch, so the list should be non-empty.
$user = User::whereNotNull('nick_name')->get()
    ->first(fn ($u) => method_exists($u, 'hasFullBranchAccess') && $u->hasFullBranchAccess());

if (! $user) {
    echo "  could not find a user with full branch access - cannot run this check\n";
    exit(2);
}

// The controller reads the CGID cookie in its constructor and decrypts it to pick
// the company-group connection, so the request must carry a valid one.
$target = null;
foreach (['connect_jos_retail', 'connect_jos_jatpt', 'connect_jos_jatcv', 'connect_jos_service'] as $conn) {
    try {
        if (\DB::connection($conn)->getDatabaseName()) {
            $target = $conn;
            break;
        }
    } catch (\Throwable $e) {
        continue;
    }
}

if (! $target) {
    echo "  no company-group connection is reachable - cannot run this check\n";
    exit(2);
}

Auth::login($user);

$cookie = Crypt::encryptString($target);

// A small memory limit turns any recursion into a clean fatal we can report
// instead of a hung process.
// The controller reads the $_COOKIE superglobal in its constructor (not the
// Request object), so set both.
$_COOKIE['CGID'] = $cookie;

$request = Request::create('/receive-order/salesReportBranchOptions', 'GET');
$request->cookies->set('CGID', $cookie);

try {
    $response = $app->handle($request);
    $status = $response->getStatusCode();
    $body = $response->getContent();

    check('status is 200', $status === 200, "status=$status");

    $json = json_decode($body, true);
    $hasData = is_array($json) && array_key_exists('data', $json);
    check('body is JSON with a data key', $hasData);

    $rows = $hasData ? $json['data'] : [];
    check('data is a non-empty list', is_array($rows) && count($rows) > 0, 'rows=' . (is_array($rows) ? count($rows) : 'n/a'));

    if (! empty($rows)) {
        $first = $rows[0];
        check('each row carries a code and a name', isset($first['MBRANCH_CD'], $first['MBRANCH_NM'])
            || isset($first['code'], $first['name']), json_encode($first));
    }

    $snippet = substr(preg_replace('/\s+/', ' ', (string) $body), 0, 160);
    printf("  connection used: %s | first 160 bytes: %s\n", $target, $snippet);
} catch (\Throwable $e) {
    check('request did not throw', false, get_class($e) . ': ' . $e->getMessage());
}

printf("\n%s (%d failures)\n", $failures === 0 ? 'ALL CHECKS PASSED' : 'FAILURES', $failures);
exit($failures === 0 ? 0 : 1);
