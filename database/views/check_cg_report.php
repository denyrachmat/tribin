<?php
/**
 * Drives the REAL controller for one company group and reports whether the branch
 * path now resolves to _TMP (no fallback warning) and what it renders.
 *
 * Run: php database/views/check_cg_report.php [connection]
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Http\Controllers\ReceiveOrderController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$connection = $argv[1] ?? 'connect_jos_service';
$log = storage_path('logs/laravel.log');

$_COOKIE['CGID'] = Crypt::encryptString($connection);

$user = User::whereNotNull('nick_name')->first();
Auth::login($user);
$user->role = 'root';
$controller = new ReceiveOrderController();

$sizeBefore = file_exists($log) ? filesize($log) : 0;

$cases = [
    'month, no branch' => ['mode' => 'month', 'month' => '2026-09', 'itmCat' => []],
    'month, branch=101' => ['mode' => 'month', 'month' => '2026-09', 'itmCat' => [], 'branch' => '101'],
];

echo "connection: $connection\n";
foreach ($cases as $label => $payload) {
    $req = Request::create('/receive-order/marketingReport', 'POST', $payload);
    $req->setUserResolver(fn () => Auth::user());

    try {
        $pdf = $controller->marketingReport($req);
        printf("  %-20s rendered %d bytes\n", $label, is_string($pdf) ? strlen($pdf) : -1);
    } catch (\Throwable $e) {
        printf("  %-20s FAILED: %s\n", $label, $e->getMessage());
    }
}

clearstatcache();
$newLog = file_exists($log) ? substr(file_get_contents($log), $sizeBefore) : '';
$fellBack = str_contains($newLog, 'falling back to plain view');
printf("\n  fallback to plain view during this run: %s\n", $fellBack ? 'YES (bug still present)' : 'no');
if ($fellBack) {
    foreach (explode("\n", $newLog) as $line) {
        if (str_contains($line, 'sales-report')) {
            echo '    ', trim($line), "\n";
        }
    }
}
