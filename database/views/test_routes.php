<?php
/**
 * Confirms the new report routes are registered and point at the right actions.
 * Uses the router directly, because route:list trips over controllers that read
 * $_COOKIE['CGID'] in their constructors.
 *
 * Run: php database/views/test_routes.php
 */
require __DIR__ . '/../../vendor/autoload.php';

$app = require __DIR__ . '/../../bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

$wanted = [
    'receive-order/monthlySalesReportForm' => 'monthlySalesReportForm',
    'receive-order/salesReportBranchOptions' => 'salesReportBranchOptions',
    'receive-order/marketingReport' => 'marketingReport',
    'receive-order/salesReportForm' => 'salesReportForm',
];

$routes = app('router')->getRoutes();
$found = [];
foreach ($routes as $route) {
    $found[$route->uri()] = $route->getActionName();
}

$bad = 0;
foreach ($wanted as $uri => $method) {
    $ok = isset($found[$uri]) && str_contains($found[$uri], $method);
    if (! $ok) {
        $bad++;
    }
    printf("  [%s] %-42s -> %s\n", $ok ? 'PASS' : 'FAIL', $uri, $found[$uri] ?? '(not registered)');
}

foreach (['GET', 'POST'] as $verb) {
    $n = count(app('router')->getRoutes()->get($verb));
    printf("  %-6s routes registered: %d\n", $verb, $n);
}

printf("\n%s\n", $bad ? "FAILURES ($bad)" : 'ALL ROUTES RESOLVE');
exit($bad ? 1 : 0);
