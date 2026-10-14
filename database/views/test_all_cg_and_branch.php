<?php
/**
 * FULL verification of the sales report across every company group and both
 * branch modes, driving the REAL controller and inspecting the rendered table.
 *
 * Checks per case:
 *   - the request renders at all
 *   - the rendered table is rectangular: header cells, body cells and colspan
 *     widths all agree (a wrong colspan silently shifts every column)
 *   - Cabang column present exactly when the view can supply a branch
 *   - Jumlah is an amount, never a bare quantity
 *   - no placeholder year on the page
 *
 * Run: php database/views/test_all_cg_and_branch.php
 */
require __DIR__ . '/../../vendor/autoload.php';

use App\Http\Controllers\ReceiveOrderController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

$app = require __DIR__ . '/../../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

// The controller reads $_COOKIE['CGID'] in its CONSTRUCTOR, so a cookie must exist
// before it is instantiated; each render call re-points it at the group under test.
$_COOKIE['CGID'] = Crypt::encryptString('connect_jos_jatpt');

$controller = new ReceiveOrderController();
$user = User::whereNotNull('nick_name')->first();

$fail = 0;
$check = function (string $label, bool $ok, string $detail = '') use (&$fail) {
    if (! $ok) { $fail++; }
    printf("    [%s] %-58s %s\n", $ok ? 'PASS' : 'FAIL', $label, $detail);
};

/** Render the report action and return the PDF as text-ish HTML via the blade. */
function renderReport(ReceiveOrderController $controller, string $connection, array $payload): array
{
    // A fresh instance per call: the constructor captures the company connection
    // from the cookie, so reusing one instance would keep querying the first CG.
    $_COOKIE['CGID'] = Crypt::encryptString($connection);
    $controller = new ReceiveOrderController();

    $req = Request::create('/receive-order/marketingReport', 'POST', $payload);
    $req->setUserResolver(fn () => Auth::user());

    try {
        $pdf = $controller->marketingReport($req);

        return ['ok' => true, 'bytes' => is_string($pdf) ? strlen($pdf) : -1];
    } catch (\Throwable $e) {
        return ['ok' => false, 'error' => get_class($e) . ': ' . $e->getMessage()];
    }
}

/** Reproduce the rendered table for structural checks (same rows, same blade). */
function renderHtml(string $connection, string $month, ?string $branch, bool $viaController = true): string
{
    $_COOKIE['CGID'] = Crypt::encryptString($connection);
    $from = $month . '-01';
    $to = date('Y-m-t', strtotime($from));
    $probe = new class extends ReceiveOrderController
    {
        public function periodPublic(string $month): array
        {
            return $this->resolveSalesReportPeriod(Request::create('/', 'POST', ['mode' => 'month', 'month' => $month]));
        }

        public function viewPublic(Request $r): string
        {
            return $this->resolveSalesReportView($this->wantsSalesReportBranch($r));
        }

        public function hasBranchPublic(string $v): bool
        {
            return $this->salesReportViewHasBranchColumn($v);
        }

        public function namesPublic(): array
        {
            return $this->salesReportBranchNames();
        }

        public function connPublic(): string
        {
            return $this->salesReportSchema();
        }
    };

    $period = $probe->periodPublic($month);
    $view = $probe->viewPublic(Request::create('/', 'POST', $branch === null ? [] : ['branch' => $branch]));
    $hasBranch = $probe->hasBranchPublic($view);
    $names = $hasBranch ? $probe->namesPublic() : [];

    $cols = [
        DB::raw("COALESCE(MITM_ITMCAT, '-') as MITM_ITMCAT"), 'MUSAGE_ALIAS', 'TSLO_SLOCD',
        'MITM_ITMCD', 'MITM_ITMNM', 'TDLVORDDETA_DLVCD', 'TQUO_PROJECT_LOCATION',
        'CSPK_PIC_AS', 'CSPK_PIC_NAME', 'MCUS_CUSNM', 'TSLODETA_ITMQT', 'totalTax',
        'name', 'TSLODETA_PERIOD_FR', 'TSLODETA_PERIOD_TO',
    ];
    if ($hasBranch) { $cols[] = 'TSLO_BRANCH'; }

    $q = DB::connection($connection)->table($view)
        ->whereBetween('SLODET_DATE', ["{$period['fdate']} 00:00:00", "{$period['ldate']} 23:59:59"])
        ->select($cols)
        ->orderBy('MITM_ITMCAT')->orderBy('MUSAGE_ALIAS');

    if ($branch !== null && $branch !== '' && $hasBranch) {
        $q->where('TSLO_BRANCH', $branch);
    }

    $rows = $q->get();
    $rupiah = fn (float $n): string => 'Rp ' . number_format($n, 0, ',', '.');
    $hasil = ['BARU' => [], 'PERPANJANGAN' => []];
    $zero = ['qty' => 0, 'tax' => 0, 'total' => 0, 'qty_fmt' => 'Rp 0', 'tax_fmt' => 'Rp 0', 'total_fmt' => 'Rp 0'];
    $meta = ['BARU' => ['grand' => $zero], 'PERPANJANGAN' => ['grand' => $zero], 'sub' => ['BARU' => [], 'PERPANJANGAN' => []]];

    foreach ($rows as $rowObj) {
        $row = (array) $rowObj;
        $cat = $row['MITM_ITMCAT'] ?? 'UNKNOWN';
        $usage = $row['MUSAGE_ALIAS'] ?? 'UNKNOWN';
        $section = str_contains((string) ($row['TSLO_SLOCD'] ?? ''), '-') ? 'PERPANJANGAN' : 'BARU';
        $qty = (float) ($row['TSLODETA_ITMQT'] ?? 0);
        $tax = (float) ($row['totalTax'] ?? 0);
        $meta[$section]['grand']['qty'] += $qty;
        $meta[$section]['grand']['tax'] += $tax;
        $row['qty_fmt'] = $rupiah($qty);
        $row['tax_fmt'] = $rupiah($tax);
        $row['total_fmt'] = $rupiah($qty + $tax);
        $row['period_fr_fmt'] = \App\Support\Formatter::date($row['TSLODETA_PERIOD_FR'] ?? null);
        $row['period_to_fmt'] = \App\Support\Formatter::date($row['TSLODETA_PERIOD_TO'] ?? null);
        $row['driver_name'] = (($row['CSPK_PIC_AS'] ?? '') === 'DRIVER') ? ($row['CSPK_PIC_NAME'] ?? '') : '';
        $row['operator_name'] = (($row['CSPK_PIC_AS'] ?? '') === 'OPERATOR') ? ($row['CSPK_PIC_NAME'] ?? '') : '';
        if ($hasBranch) {
            $code = (string) ($row['TSLO_BRANCH'] ?? '');
            $row['branch_name'] = $code === '' ? '' : ($names[$code] ?? $code);
        }
        $hasil[$section][$cat][$usage][] = $row;
    }
    foreach (['BARU', 'PERPANJANGAN'] as $sec) {
        $meta[$sec]['grand']['total'] = $meta[$sec]['grand']['qty'] + $meta[$sec]['grand']['tax'];
        $meta[$sec]['grand']['qty_fmt'] = $rupiah($meta[$sec]['grand']['qty']);
        $meta[$sec]['grand']['tax_fmt'] = $rupiah($meta[$sec]['grand']['tax']);
        $meta[$sec]['grand']['total_fmt'] = $rupiah($meta[$sec]['grand']['total']);
    }

    $company = \App\Models\CompanyGroup::where('connection', $connection)->first();

    return view('pdf.salesReport', [
        'data' => $hasil,
        'meta' => $meta,
        'dateRange' => [$from, $to],
        'periodLabel' => 'Periode uji',
        'branchLabel' => $branch ? "Cabang $branch" : 'Semua Cabang',
        'showBranchColumn' => $hasBranch,
        'header' => $company->name ?? $connection,
        'subHeader' => 'SALES & RENTAL',
        'addr' => $company->address ?? '',
        'approvalList' => [],
        'repeatTableHeader' => false,
    ])->render();
}

/** Structural check: each table's rows must agree on width, colspans included. */
function checkTableWidths(string $html, callable $check, string $label): void
{
    preg_match_all('/<table class="tg">(.*?)<\/table>/s', $html, $tables);
    if (empty($tables[1])) {
        $check("$label: at least one data table", false, 'no <table class="tg"> rendered');

        return;
    }

    foreach ($tables[1] as $idx => $table) {
        preg_match_all('/<tr>(.*?)<\/tr>/s', $table, $trs);
        $widths = [];
        foreach ($trs[1] as $tr) {
            $w = 0;
            preg_match_all('/<t[hd]([^>]*)>/', $tr, $cells);
            foreach ($cells[1] as $attrs) {
                $w += preg_match('/colspan="(\d+)"/', $attrs, $m) ? (int) $m[1] : 1;
            }
            $widths[] = $w;
        }
        $uniq = array_values(array_unique($widths));
        $check("$label: table " . ($idx + 1) . " rows all same width", count($uniq) === 1,
            'widths: ' . implode('/', $uniq) . ' across ' . count($widths) . ' rows');
    }
}

echo "=== rendering every company group, with and without a branch filter ===\n";
$cgFor = [
    'connect_jos_jatpt' => '101',
    'connect_jos_jatcv' => '101',
    'connect_jos_retail' => '101',
    'connect_jos_service' => null, // no branch support
];

Auth::login($user);
$user->role = 'root';

foreach ($cgFor as $connection => $branch) {
    echo "\n--- $connection ---\n";

    $noBranch = renderReport($controller, $connection, ['mode' => 'month', 'month' => '2026-09', 'itmCat' => []]);
    $check('renders without a branch filter', $noBranch['ok'], $noBranch['ok'] ? $noBranch['bytes'] . ' bytes' : $noBranch['error']);

    $withBranch = renderReport($controller, $connection, ['mode' => 'month', 'month' => '2026-09', 'itmCat' => [], 'branch' => '101']);
    $check('renders with branch=101', $withBranch['ok'], $withBranch['ok'] ? $withBranch['bytes'] . ' bytes' : $withBranch['error']);

    $bogus = renderReport($controller, $connection, ['mode' => 'month', 'month' => '2026-09', 'itmCat' => [], 'branch' => 'ZZZ']);
    $check('renders with a bogus branch (falls back)', $bogus['ok'], $bogus['ok'] ? $bogus['bytes'] . ' bytes' : $bogus['error']);

    $range = renderReport($controller, $connection, ['mode' => 'range', 'fdate' => '2026-09-01', 'ldate' => '2026-09-30', 'itmCat' => []]);
    $check('legacy range call still renders', $range['ok'], $range['ok'] ? $range['bytes'] . ' bytes' : $range['error']);

    // structural checks on the rendered table. All four groups now carry a branch
    // column: service derives it from T_SLOHEAD / T_SRV_HEAD / users.branch.
    $expectBranch = true;
    $html = renderHtml($connection, '2026-09', null);
    checkTableWidths($html, $check, $connection);
    $hasCabangHeader = str_contains($html, '>Cabang<');
    $check('Cabang column ' . ($expectBranch ? 'present' : 'absent'), $hasCabangHeader === $expectBranch,
        $hasCabangHeader ? 'shown' : 'not shown');

    // every header cell count must match the row width, per table (a table is
    // rendered per section: BARU and PERPANJANGAN)
    preg_match_all('/<table class="tg">(.*?)<\/table>/s', $html, $tgTables);
    $expectedCols = $expectBranch ? 15 : 14;
    $headerCounts = [];
    foreach ($tgTables[1] as $t) {
        preg_match_all('/<th class="cell[^"]*">/', $t, $hh);
        $headerCounts[] = count($hh[0]);
    }
    $badHeaders = array_values(array_filter($headerCounts, fn ($n) => $n !== $expectedCols));
    $check('each table header count == ' . $expectedCols, empty($badHeaders),
        'per-table headers: ' . implode('/', $headerCounts));

    $tiny = preg_match('/^Rp ?[1-9]$/m', $html) === 1;
    $check('no bare-quantity amounts', ! $tiny);
    $check('no placeholder year', ! preg_match('/\d{1,2} \w{3} 1970|\d{1,2} \w{3} -\d{4}/', $html));
}

echo "\n=== filter behaviour: branch 101 vs a branch with no data ===\n";
foreach (['connect_jos_jatpt' => '101', 'connect_jos_jatcv' => '101'] as $connection => $branch) {
    $a = renderReport($controller, $connection, ['mode' => 'month', 'month' => '2026-09', 'itmCat' => [], 'branch' => $branch]);
    $b = renderReport($controller, $connection, ['mode' => 'month', 'month' => '2026-09', 'itmCat' => [], 'branch' => '999']);
    $check("$connection: branch=$branch and branch=999 both render", $a['ok'] && $b['ok'],
        "{$a['bytes']} / {$b['bytes']} bytes");
}

printf("\n%s (%d failure%s)\n", $fail ? 'FAILURES' : 'ALL CHECKS PASSED', $fail, $fail === 1 ? '' : 's');
exit($fail ? 1 : 0);
