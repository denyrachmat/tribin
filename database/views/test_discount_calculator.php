<?php
/**
 * Discount arithmetic, checked against hand-computed figures.
 *
 * Run: php database/views/test_discount_calculator.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Support\DiscountCalculator as DC;

$fail = 0;
$check = function (string $label, $actual, $expected, float $tol = 0.005) use (&$fail) {
    $ok = is_numeric($actual) && is_numeric($expected)
        ? abs((float) $actual - (float) $expected) <= $tol
        : $actual === $expected;
    if (! $ok) { $fail++; }
    printf("  [%s] %-58s got %-14s %s\n", $ok ? 'PASS' : 'FAIL', $label,
        var_export($actual, true), $ok ? '' : 'expected ' . var_export($expected, true));
};

// helpers to build discount arrays
$pct = fn ($code, $value, $src = 'CUST', $seq = 0, $mode = 'STACK') =>
    ['code' => $code, 'type' => 'PERCENT', 'value' => $value, 'src' => $src, 'seq' => $seq, 'mode' => $mode];
$amt = fn ($code, $value, $src = 'CUST', $seq = 0, $mode = 'STACK') =>
    ['code' => $code, 'type' => 'AMOUNT', 'value' => $value, 'src' => $src, 'seq' => $seq, 'mode' => $mode];

echo "=== 1. the four basic cases ===\n";
$r = DC::forLine(0, [], 'NEAREST', 0);
$check('zero gross -> zero discount', $r['total'], 0);

$r = DC::forLine(1_000_000, [$pct('D10', 10)], 'NEAREST', 0);
$check('10% of 1,000,000', $r['total'], 100_000);
$check('net = gross - disc', $r['net'], 900_000);

$r = DC::forLine(1_000_000, [$amt('A50', 50_000)], 'NEAREST', 0);
$check('fixed 50,000', $r['total'], 50_000);
$check('net', $r['net'], 950_000);

$r = DC::forLine(1_000_000, [], 'NEAREST', 0);
$check('no discounts -> zero', $r['total'], 0);
$check('no discounts -> net = gross', $r['net'], 1_000_000);

echo "\n=== 2. ORDER MATTERS, and the user controls it ===\n";
// 10% then 50rb on 1,000,000: 10% -> 100,000, base 900,000, then 50,000 => 150,000
$r = DC::forLine(1_000_000, [$pct('D10', 10, 'CUST', 1), $amt('A50', 50_000, 'CAT', 2)], 'NEAREST', 0);
$check('10% then 50rb = 150,000', $r['total'], 150_000);
// reverse order: 50rb first -> 50,000, base 950,000, then 10% -> 95,000 => 145,000
$r = DC::forLine(1_000_000, [$pct('D10', 10, 'CUST', 2), $amt('A50', 50_000, 'CAT', 1)], 'NEAREST', 0);
$check('50rb then 10% = 145,000 (different, by design)', $r['total'], 145_000);

echo "\n=== 3. rounding is applied ONCE, to the total ===\n";
// 10% of 3,333,333 = 333,333.3
$r = DC::forLine(3_333_333, [$pct('D10', 10)], 'NEAREST', 0);
$check('nearest', $r['total'], 333_333);
$r = DC::forLine(3_333_333, [$pct('D10', 10)], 'DOWN', 0);
$check('round down', $r['total'], 333_333);
$r = DC::forLine(3_333_333, [$pct('D10', 10)], 'UP', 0);
$check('round up', $r['total'], 333_334);

// a value that actually splits: 15% of 1,000,001 = 150,000.15
$r = DC::forLine(1_000_001, [$pct('D15', 15)], 'NEAREST', 0);
$check('nearest 150,000.15 -> 150,000', $r['total'], 150_000);
$r = DC::forLine(1_000_001, [$pct('D15', 15)], 'DOWN', 0);
$check('down 150,000.15 -> 150,000', $r['total'], 150_000);
$r = DC::forLine(1_000_001, [$pct('D15', 15)], 'UP', 0);
$check('up 150,000.15 -> 150,001', $r['total'], 150_001);

echo "\n=== 4. decimals: keep rupiah cents when the customer wants them ===\n";
$r = DC::forLine(1_000_001, [$pct('D15', 15)], 'NEAREST', 2);
$check('2 dp keeps 150,000.15', $r['total'], 150_000.15);

echo "\n=== 5. REPLACE clears what came before (level overrides level) ===\n";
// item 5% then a customer REPLACE 10% -> only the 10% counts = 100,000
$r = DC::forLine(1_000_000, [$pct('CAT5', 5, 'CAT', 1), $pct('CUST10', 10, 'CUST', 2, 'REPLACE')], 'NEAREST', 0);
$check('REPLACE discards the earlier part', $r['total'], 100_000);
$check('only the replacing part remains', count($r['parts']), 1, 0);
$check('and it is the customer one', $r['parts'][0]['code'], 'CUST10');

// STACK adds up as expected
$r = DC::forLine(1_000_000, [$pct('CAT5', 5, 'CAT', 1), $pct('CUST10', 10, 'CUST', 2)], 'NEAREST', 0);
$check('STACK compounds: 5% then 10% of 950,000', $r['total'], 145_000);

echo "\n=== 6. clamping: a discount never makes a line negative ===\n";
$r = DC::forLine(100_000, [$amt('BIG', 500_000)], 'NEAREST', 0);
$check('fixed amount larger than gross clamped', $r['total'], 100_000);
$check('net floors at 0', $r['net'], 0);

// after clamping to zero, further discounts do nothing
$r = DC::forLine(100_000, [$amt('BIG', 100_000, 'CAT', 1), $pct('AFTER', 10, 'CUST', 2)], 'NEAREST', 0);
$check('nothing left to discount', $r['total'], 100_000);

echo "\n=== 7. determinism with equal sequence numbers ===\n";
$a = DC::forLine(1_000_000, [$pct('ZZ', 10, 'CUST', 0), $pct('AA', 10, 'CAT', 0)], 'NEAREST', 0);
$b = DC::forLine(1_000_000, [$pct('AA', 10, 'CAT', 0), $pct('ZZ', 10, 'CUST', 0)], 'NEAREST', 0);
$check('input order does not change the result', $a['total'], $b['total']);
$check('order is CAT before CUST on a tie', implode(',', $a['order']), 'AA/CAT,ZZ/CUST');

echo "\n=== 8. nothing is rounded above the epsilon ===\n";
$r = DC::forLine(0.03, [$pct('D10', 10)], 'NEAREST', 0);
$check('tiny gross does not blow up', $r['total'] >= 0 && $r['net'] >= 0, true, 0);

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
