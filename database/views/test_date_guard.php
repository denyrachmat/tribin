<?php
/**
 * The date guard must never print a placeholder year.
 *
 * Run: php database/views/test_date_guard.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Support\Formatter;

$fail = 0;
$check = function (string $label, $actual, $expected) use (&$fail) {
    $ok = $actual === $expected;
    if (! $ok) {
        $fail++;
    }
    printf("  [%s] %-52s got %-18s %s\n", $ok ? 'PASS' : 'FAIL', $label,
        var_export($actual, true), $ok ? '' : 'expected ' . var_export($expected, true));
};

echo "=== values that must render as '-' ===\n";
foreach ([
    '0000-00-00 00:00:00' => 'the year-zero datetime (2 real service rows)',
    '0000-00-00' => 'bare year zero',
    '0000-00-00 00:00:00.000000' => 'year zero with microseconds',
    '-' => 'the literal dash the service view emits',
    '' => 'empty string',
    null => 'null',
    '   ' => 'whitespace only',
    '1970-01-01' => 'the epoch placeholder',
    '1970-01-01 00:00:00' => 'the epoch placeholder with time',
    '1970-01-01 07:00:00' => 'epoch plus hours (still a placeholder)',
    'not-a-date' => 'garbage',
    '0000' => 'ambiguous short string',
] as $value => $why) {
    $check(substr($why, 0, 50), Formatter::date($value), '-');
}

echo "\n=== values that must render as a real date ===\n";
$check('2026-09-22', Formatter::date('2026-09-22 00:00:00'), '22 Sep 2026');
$check('1970-01-02 (just past the cutoff)', Formatter::date('1970-01-02'), '02 Jan 1970');
$check('2024-05-21', Formatter::date('2024-05-21 00:00:00'), '21 May 2024');
$check('custom format Y-m-d', Formatter::date('2026-09-01', 'Y-m-d'), '2026-09-01');
$check('custom format d-M-Y', Formatter::date('2026-09-01', 'd-M-Y'), '01-Sep-2026');
$check('DateTime object', Formatter::date(new DateTime('2026-09-22')), '22 Sep 2026');

echo "\n=== hasDate, for @if checks in templates ===\n";
$check('hasDate(year zero) is false', Formatter::hasDate('0000-00-00 00:00:00'), false);
$check('hasDate(1970-01-01) is false', Formatter::hasDate('1970-01-01'), false);
$check('hasDate("-") is false', Formatter::hasDate('-'), false);
$check('hasDate(valid) is true', Formatter::hasDate('2026-09-22'), true);

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
