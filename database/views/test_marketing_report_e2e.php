<?php
/**
 * Acceptance test for the monthly/branch Sales Report, at controller level.
 *
 * The PDF bytes intentionally differ between a month run and a range run, because
 * the header now says "Periode: ... (bulan penuh)" and "Cabang: ...". So this test
 * compares the report BODY (the table content), extracted from the PDFs, and
 * asserts the only difference is the header line.
 *
 * It also proves the branch path really reads V_SALES_REPORT_TMP: the view is
 * dropped, the request must still succeed via fallback + a logged warning, then
 * the view is restored from its saved definition.
 *
 * Run: php database/views/test_marketing_report_e2e.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Http\Controllers\ReceiveOrderController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

$app = require __DIR__ . '/../../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$connection = 'connect_jos_jatpt';
$_COOKIE['CGID'] = Crypt::encryptString($connection);

$user = User::whereNotNull('nick_name')->first();
Auth::login($user);
$user->role = 'root';

$controller = new ReceiveOrderController();

$render = function (array $payload) use ($controller) {
    $req = Request::create('/receive-order/marketingReport', 'POST', $payload);
    $req->setUserResolver(fn () => Auth::user());
    try {
        return ['status' => 200, 'payload' => $controller->marketingReport($req)];
    } catch (\Throwable $e) {
        return ['status' => 500, 'error' => get_class($e) . ': ' . $e->getMessage()];
    }
};

/**
 * Pull the visible text out of a DomPDF file by inflating its content streams.
 */
$pdfText = function (string $binary): string {
    $out = '';
    if (preg_match_all('/stream\r?\n(.*?)\r?\nendstream/s', $binary, $m)) {
        foreach ($m[1] as $chunk) {
            $raw = @gzuncompress($chunk);
            if ($raw === false) {
                $raw = @gzinflate($chunk);
            }
            if ($raw !== false) {
                $out .= $raw;
            }
        }
    }

    // keep only text drawn on the page
    preg_match_all('/\((.*?)\)\s*Tj/s', $out, $t);
    $text = implode("\n", $t[1] ?? []);

    return $text;
};

echo "connection: $connection | user: {$user->nick_name}\n\n";

echo "=== 1. legacy range call still works (regression) ===\n";
$range = $render(['fdate' => '2026-09-01', 'ldate' => '2026-09-30', 'itmCat' => []]);
$rangeOk = $range['status'] === 200 && is_string($range['payload'] ?? null);
printf("  [%s] range rendered, %d bytes\n", $rangeOk ? 'PASS' : 'FAIL', $rangeOk ? strlen($range['payload']) : 0);
if (! $rangeOk) {
    echo '  ', $range['error'] ?? 'unknown', "\n";
}

echo "\n=== 2. mode=month for the same month ===\n";
$month = $render(['mode' => 'month', 'month' => '2026-09', 'itmCat' => []]);
$monthOk = $month['status'] === 200 && is_string($month['payload'] ?? null);
printf("  [%s] month rendered, %d bytes\n", $monthOk ? 'PASS' : 'FAIL', $monthOk ? strlen($month['payload']) : 0);
if (! $monthOk) {
    echo '  ', $month['error'] ?? 'unknown', "\n";
}

echo "\n=== 3. acceptance: report BODY identical between range and month ===\n";
if ($rangeOk && $monthOk) {
    $tr = $pdfText($range['payload']);
    $tm = $pdfText($month['payload']);

    // Drop the header line(s), which are supposed to differ.
    $strip = function (string $t): string {
        $lines = preg_split('/\r?\n/', $t);
        $keep = array_filter($lines, function ($l) {
            $l = trim($l);

            return ! preg_match('/^(From \d|Periode:|Cabang:)/', $l);
        });

        return implode("\n", $keep);
    };

    $br = $strip($tr);
    $bm = $strip($tm);

    $same = $br === $bm;
    printf("  [%s] body text identical (%d vs %d chars)\n", $same ? 'PASS' : 'FAIL', strlen($br), strlen($bm));

    if (! $same) {
        $lr = explode("\n", $br);
        $lm = explode("\n", $bm);
        foreach (array_slice($lr, 0, 12) as $i => $l) {
            if (($lm[$i] ?? null) !== $l) {
                printf("      first body diff at line %d:\n        range: %s\n        month: %s\n", $i, trim($l), trim($lm[$i] ?? '(missing)'));
                break;
            }
        }
    }

    printf("  [%s] month header carries 'Periode:' and 'Cabang:'\n",
        (str_contains($tm, 'Periode:') && str_contains($tm, 'Cabang:')) ? 'PASS' : 'FAIL');
    printf("  [%s] range header keeps the old 'From ... to ...'\n",
        str_contains($tr, 'From ') ? 'PASS' : 'FAIL');
}

echo "\n=== 4. branch filter (reads V_SALES_REPORT_TMP) ===\n";
$b101 = $render(['mode' => 'month', 'month' => '2026-09', 'itmCat' => [], 'branch' => '101']);
printf("  [%s] branch=101 rendered, %d bytes\n",
    ($b101['status'] === 200) ? 'PASS' : 'FAIL', $b101['status'] === 200 ? strlen($b101['payload']) : 0);

$bBad = $render(['mode' => 'month', 'month' => '2026-09', 'itmCat' => [], 'branch' => 'ZZZ']);
printf("  [%s] branch=ZZZ falls back to the user's own branch instead of failing\n",
    ($bBad['status'] === 200) ? 'PASS' : 'FAIL');

echo "\n=== 5. proof the branch path really uses _TMP (drop it, expect fallback + warning) ===\n";
$sql = DB::connection($connection);
$viewFile = __DIR__ . '/V_SALES_REPORT_TMP.' . $connection . '.sql';

try {
    $sql->statement('DROP VIEW IF EXISTS `V_SALES_REPORT_TMP`');
    $existsNow = $sql->table('information_schema.VIEWS')->where('TABLE_SCHEMA', $connection)->where('TABLE_NAME', 'V_SALES_REPORT_TMP')->exists();
    printf("  [%s] _TMP dropped (%s)\n", $existsNow ? 'FAIL' : 'PASS', $existsNow ? 'still there' : 'gone');

    $logBefore = filesize(storage_path('logs/laravel.log')) ?: 0;
    $fallback = $render(['mode' => 'month', 'month' => '2026-09', 'itmCat' => [], 'branch' => '101']);
    printf("  [%s] request still succeeded with _TMP absent (%d bytes)\n",
        $fallback['status'] === 200 ? 'PASS' : 'FAIL', $fallback['status'] === 200 ? strlen($fallback['payload']) : 0);

    clearstatcache();
    $logAfter = filesize(storage_path('logs/laravel.log')) ?: 0;
    $grew = $logAfter > $logBefore;
    printf("  [%s] fallback was logged\n", $grew ? 'PASS' : 'WARN');
} finally {
    $ddl = file_get_contents($viewFile);
    $sql->unprepared($ddl);
    $restored = $sql->table('information_schema.VIEWS')->where('TABLE_SCHEMA', $connection)->where('TABLE_NAME', 'V_SALES_REPORT_TMP')->exists();
    printf("  [%s] _TMP restored from %s\n", $restored ? 'PASS' : 'FAIL', basename($viewFile));
}

echo "\n=== 6. invalid input rejected, never a whole-table report ===\n";
foreach ([
    'month=2026-13' => ['mode' => 'month', 'month' => '2026-13', 'itmCat' => []],
    'month=garbage' => ['mode' => 'month', 'month' => 'garbage', 'itmCat' => []],
    'no dates at all' => ['itmCat' => []],
    'range missing end' => ['mode' => 'range', 'fdate' => '2026-09-01', 'itmCat' => []],
] as $label => $payload) {
    $r = $render($payload);
    $isRejection = $r['payload'] instanceof \Illuminate\Http\JsonResponse && $r['payload']->getStatusCode() === 406;
    printf("  [%s] %-18s -> %s\n", $isRejection ? 'PASS' : 'FAIL', $label,
        $isRejection ? '406 rejected' : 'rendered ' . (is_string($r['payload'] ?? null) ? strlen($r['payload']) . ' bytes' : get_class($r['payload'] ?? new stdClass())));
}
