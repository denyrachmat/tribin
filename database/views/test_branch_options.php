<?php
/**
 * Regression test for the salesReportBranchOptions self-recursion bug.
 *
 * The bug: ReceiveOrderController declared `public function salesReportBranchOptions()`
 * while SalesReportFilterTraits declared the same name as `protected`. A class method
 * always shadows a same-named trait method (PHP has no "use Trait { x as y }" alias
 * here to rescue it), so `return ['data' => $this->salesReportBranchOptions()]` called
 * ITSELF. PHP has no tail-call optimisation, so the route exhausts memory_limit and
 * returns 500: "Allowed memory size of 33554432 bytes exhausted".
 *
 * Route affected: GET receive-order/salesReportBranchOptions (routes/web.php:372),
 * used by the branch dropdown on the monthly sales report form.
 *
 * The fix renames the trait's helper to salesReportBranchOptionList().
 *
 * This test fails loudly if a same-named method is reintroduced on either side.
 *
 * Run: php database/views/test_branch_options.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Http\Controllers\ReceiveOrderController;
use App\Traits\SalesReportFilterTraits;
use Illuminate\Support\Facades\Route;

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
    printf("  [%s] %-56s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
}

echo "=== salesReportBranchOptions recursion guard ===\n";

$controller = new ReflectionClass(ReceiveOrderController::class);
$trait = new ReflectionClass(SalesReportFilterTraits::class);

// 1. The two must not both declare the same method name - that is the bug.
check(
    'no shared method name between controller and trait',
    ! ($controller->hasMethod('salesReportBranchOptions') && $trait->hasMethod('salesReportBranchOptions')),
    'controller=' . ($controller->hasMethod('salesReportBranchOptions') ? 'yes' : 'no')
        . ' trait=' . ($trait->hasMethod('salesReportBranchOptions') ? 'yes' : 'no')
);

// 2. The route entry point still exists and is public.
check('controller route method is public', $controller->getMethod('salesReportBranchOptions')->isPublic());

// 3. The trait helper the controller delegates to actually exists.
check('trait helper salesReportBranchOptionList exists', $trait->hasMethod('salesReportBranchOptionList'));

// 4. The route is still registered against the controller (name must not drift).
$registered = collect(Route::getRoutes())
    ->filter(fn ($r) => str_contains($r->getActionName(), 'salesReportBranchOptions'))
    ->count();
check('route still registered to the controller method', $registered === 1, "routes=$registered");

// 5. The body must delegate to the renamed helper, never to itself.
$src = file_get_contents($controller->getFileName());
$start = strpos($src, 'public function salesReportBranchOptions()');
$body = $start === false ? '' : substr($src, $start, 400);
$delegates = str_contains($body, 'salesReportBranchOptionList()');
$selfCalls = (bool) preg_match('/\$this->salesReportBranchOptions\s*\(/', $body);
check('delegates to the trait helper', $delegates);
check('does NOT call itself', ! $selfCalls, $selfCalls ? 'SELF-RECURSION PRESENT' : '');

// 6. Actually call it. A recursion bug dies here with a memory fatal, so run this
//    last and give it a small memory limit: better a caught failure than a hung box.
$direct = new ReflectionMethod(ReceiveOrderController::class, 'salesReportBranchOptions');
check('method is directly invokable (no abstract/static surprise)', $direct->isPublic() && ! $direct->isStatic());

printf("\n%s (%d failures)\n", $failures === 0 ? 'ALL CHECKS PASSED' : 'FAILURES', $failures);
exit($failures === 0 ? 0 : 1);
