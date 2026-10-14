<?php
/**
 * End-to-end test of discount attachment and resolution, against staging data.
 *
 * Exercises the real controller actions, then checks the resolved line calculation
 * against figures worked out by hand.
 *
 * Run: php database/views/test_discount_scoping.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Http\Controllers\DiscountController;
use App\Models\M_DISC;
use App\Support\DiscountCalculator as DC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

$CONN = 'connect_jos_jatpt';
$_COOKIE['CGID'] = Crypt::encryptString($CONN);

$user = App\Models\User::whereNotNull('nick_name')->first();
Auth::login($user);

$fail = 0;
$check = function (string $label, $actual, $expected, float $tol = 0.005) use (&$fail) {
    $ok = is_numeric($actual) && is_numeric($expected)
        ? abs((float) $actual - (float) $expected) <= $tol
        : $actual === $expected;
    if (! $ok) { $fail++; }
    printf("  [%s] %-58s got %-16s %s\n", $ok ? 'PASS' : 'FAIL', $label,
        var_export($actual, true), $ok ? '' : 'expected ' . var_export($expected, true));
};

$controller = new DiscountController();
$req = fn (array $p) => Request::create('/discount', 'POST', $p);

// test subjects
$CUS = DB::connection($CONN)->table('M_CUS')->where('MCUS_CUSCD', '041001')->first();
$CUSCD = $CUS->MCUS_CUSCD;
// find an item with a category, and a second item in the SAME category
$item = DB::connection($CONN)->table('M_ITM')
    ->whereNotNull('MITM_ITMCAT')->where('MITM_ITMCAT', '<>', '')
    ->orderBy('MITM_ITMCD')->first();
$CAT = $item->MITM_ITMCAT;
$ITMCD = $item->MITM_ITMCD;

echo "subjects: customer=$CUSCD, item=$ITMCD, category=$CAT\n";
echo "masters in M_DISC: " . M_DISC::count() . "\n";

echo "\n=== 1. attach a discount to the CATEGORY ===\n";
$r = $controller->itemCategorySave($req([
    'conn' => $CONN,
    'MDIC_ITMCAT' => $CAT,
    'rows' => [['MDISC_CODE' => 'D10', 'MDIC_MODE' => 'STACK']],
]));
$check('category discount saved', $r['msg'] ?? '?', 'Category discounts saved');
$links = DB::connection($CONN)->table('M_DISC_ITEMCAT')->where('MDIC_ITMCAT', $CAT)->get();
$check('one link stored', $links->count(), 1);
$check('sequence is 1', (int) $links[0]->MDIC_SEQ, 1);

echo "\n=== 2. attach TWO discounts to the CUSTOMER, in a chosen order ===\n";
$r = $controller->customerSave($req([
    'conn' => $CONN,
    'MCUSD_CUSCD' => $CUSCD,
    'rows' => [
        ['MDISC_CODE' => 'A50K', 'MCUSD_MODE' => 'STACK'],
        ['MDISC_CODE' => 'D5', 'MCUSD_MODE' => 'STACK'],
    ],
    'settings' => ['MCUS_ROUNDMODE' => 'NEAREST', 'MCUS_ROUNDDP' => 0, 'MCUS_DISCMODE' => 'STACK'],
]));
$check('customer discounts saved', $r['msg'] ?? '?', 'Customer discounts saved');
$links = DB::connection($CONN)->table('M_CUS_DISC')->where('MCUSD_CUSCD', $CUSCD)->orderBy('MCUSD_SEQ')->get();
$check('two links stored', $links->count(), 2);
$check('order preserved: A50K first', $links[0]->MDISC_CODE, 'A50K');
$check('order preserved: D5 second', $links[1]->MDISC_CODE, 'D5');
$cus = DB::connection($CONN)->table('M_CUS')->where('MCUS_CUSCD', $CUSCD)->first();
$check('rounding mode persisted', $cus->MCUS_ROUNDMODE, 'NEAREST');
$check('decimals persisted', (int) $cus->MCUS_ROUNDDP, 0);

echo "\n=== 3. resolve: what applies to this line, and in what order ===\n";
$resolved = $controller->discResolveForLine($CONN, $CUSCD, $ITMCD, null);
$order = array_map(fn ($d) => $d['code'] . '/' . $d['src'] . '/seq' . $d['seq'], $resolved);
echo "   resolved: " . implode(', ', $order) . "\n";
$check('three discounts apply', count($resolved), 3);
$check('category D10 comes first', $resolved[0]['code'], 'D10');
$check('then customer A50K', $resolved[1]['code'], 'A50K');
$check('then customer D5', $resolved[2]['code'], 'D5');
$check('D10 resolved as PERCENT 10', $resolved[0]['type'] . '/' . $resolved[0]['value'], 'PERCENT/10');
$check('A50K resolved as AMOUNT 50000', $resolved[1]['type'] . '/' . $resolved[1]['value'], 'AMOUNT/50000');

echo "\n=== 4. the money, checked by hand ===\n";
// gross 1,000,000 with: 10% (CAT) -> 100,000; 50,000 (CUST) ; 5% of 850,000 = 42,500
// total = 192,500 ; net = 807,500
$gross = 1_000_000;
[$mode, $dp] = DC::resolveRounding($cus->MCUS_ROUNDMODE, $cus->MCUS_ROUNDDP);
$res = DC::forLine($gross, $resolved, $mode, $dp);
echo "   parts: ";
foreach ($res['parts'] as $p) {
    printf("%s %s %.2f%%->%s on base %.2f = %.2f | ", $p['code'], $p['type'], $p['value'], $p['src'], $p['base'], $p['amount']);
}
echo "\n";
$check('10% of 1,000,000 = 100,000', $res['parts'][0]['amount'], 100_000);
$check('then 50,000 flat', $res['parts'][1]['amount'], 50_000);
$check('then 5% of 850,000 = 42,500', $res['parts'][2]['amount'], 42_500);
$check('total discount = 192,500', $res['total'], 192_500);
$check('net = 807,500', $res['net'], 807_500);

echo "\n=== 5. preview-line endpoint agrees with the calculator ===\n";
$r = $controller->previewLine($req(['conn' => $CONN, 'gross' => $gross, 'MCUS_CUSCD' => $CUSCD, 'MITM_ITMCD' => $ITMCD]));
$check('preview discount = 192,500', $r['discount'], 192_500);
$check('preview net = 807,500', $r['net'], 807_500);
$check('preview reports rounding NEAREST/0', implode('/', $r['rounding']), 'NEAREST/0');

echo "\n=== 6. changing the CUSTOMER's rounding changes the result ===\n";
$controller->customerSave($req([
    'conn' => $CONN, 'MCUSD_CUSCD' => $CUSCD,
    'rows' => [['MDISC_CODE' => 'D5']],
    'settings' => ['MCUS_ROUNDMODE' => 'UP', 'MCUS_ROUNDDP' => 0, 'MCUS_DISCMODE' => 'STACK'],
]));
$r = $controller->previewLine($req(['conn' => $CONN, 'gross' => 1_000_001, 'MCUS_CUSCD' => $CUSCD, 'MITM_ITMCD' => $ITMCD]));
// 5% (CAT D10 removed? no: category still has D10) -> recompute: 10% + round-up of 5%
printf("   with category D10 + customer D5, rounding UP on 1,000,001\n");
$check('rounding mode is UP now', implode('/', $r['rounding']), 'UP/0');
$check('discount is a whole rupiah (no cents)', $r['discount'] === floor($r['discount']), true, 0);

echo "\n=== 7. REPLACE mode: category discount is overridden ===\n";
$controller->customerSave($req([
    'conn' => $CONN, 'MCUSD_CUSCD' => $CUSCD,
    'rows' => [['MDISC_CODE' => 'D5', 'MCUSD_MODE' => 'REPLACE']],
    'settings' => ['MCUS_ROUNDMODE' => 'NEAREST', 'MCUS_ROUNDDP' => 0, 'MCUS_DISCMODE' => 'STACK'],
]));
$resolved = $controller->discResolveForLine($CONN, $CUSCD, $ITMCD, null);
$res = DC::forLine(100_000, $resolved, 'NEAREST', 0);
// category 10% then customer 5% REPLACE -> only 5% of 100,000 = 5,000
$check('REPLACE wins: only the customer part counts', count($res['parts']), 1);
$check('and it is 5,000', $res['total'], 5_000);

echo "\n=== 8. guardrails ===\n";
$r = $controller->customerSave($req(['conn' => $CONN, 'MCUSD_CUSCD' => 'NOPE', 'rows' => [], 'settings' => []]));
$check('unknown customer rejected', $r->getStatusCode(), 422);
$r = null;
try { $r = $controller->customerSave($req(['conn' => $CONN, 'MCUSD_CUSCD' => $CUSCD, 'rows' => [['MDISC_CODE' => 'GHOST']], 'settings' => []])); }
catch (\Illuminate\Validation\ValidationException $e) { $r = 'validation'; }
$check('unknown discount code rejected', $r, 'validation');
$r = $controller->customerSave($req(['conn' => $CONN, 'MCUSD_CUSCD' => $CUSCD, 'rows' => [], 'settings' => ['MCUS_ROUNDMODE' => 'SIDEWAYS']]));
$check('bad rounding mode rejected', $r->getStatusCode(), 422);
$r = $controller->itemCategorySave($req(['conn' => $CONN, 'MDIC_ITMCAT' => 'NO SUCH CATEGORY', 'rows' => []]));
$check('unknown category rejected (typo guard)', $r->getStatusCode(), 422);

echo "\n=== 9. cleanup ===\n";
DB::connection($CONN)->table('M_CUS_DISC')->where('MCUSD_CUSCD', $CUSCD)->delete();
DB::connection($CONN)->table('M_DISC_ITEMCAT')->where('MDIC_ITMCAT', $CAT)->delete();
DB::connection($CONN)->table('M_CUS')->where('MCUS_CUSCD', $CUSCD)
    ->update(['MCUS_ROUNDMODE' => null, 'MCUS_ROUNDDP' => null, 'MCUS_DISCMODE' => null]);
$check('customer links removed', DB::connection($CONN)->table('M_CUS_DISC')->count(), 0);
$check('category links removed', DB::connection($CONN)->table('M_DISC_ITEMCAT')->count(), 0);
$check('customer settings cleared',
    DB::connection($CONN)->table('M_CUS')->where('MCUS_CUSCD', $CUSCD)->value('MCUS_ROUNDMODE'), null);

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
