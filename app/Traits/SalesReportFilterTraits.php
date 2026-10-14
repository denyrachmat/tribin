<?php

namespace App\Traits;

use App\Models\M_BRANCH;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

/**
 * Monthly / branch filtering for the Sales Report by Category.
 *
 * The report itself already existed and only ever took a manual fdate/ldate range.
 * This adds two optional inputs on top, without changing the defaults:
 *
 *   mode=month  month=YYYY-MM   -> the range becomes that whole calendar month
 *   branch=                     -> '' (or absent) = every branch the user may see;
 *                                  a code = exactly that branch
 *
 * Two things worth knowing before touching this:
 *
 * 1. The month is NOT computed in JavaScript. Carbon decides the last day, so
 *    February and leap years are correct by construction.
 * 2. The branch filter reads V_SALES_REPORT_TMP, which carries TSLO_BRANCH.
 *    The plain view does not, and there is no way to filter it by branch without
 *    rewriting the view. When the _TMP view is missing for a company DB we fall
 *    back to the plain view and log it, rather than failing the request: a report
 *    with slightly too many rows beats a 500.
 */
trait SalesReportFilterTraits
{
    /** View carrying TSLO_BRANCH, used whenever a branch filter is in play. */
    protected string $salesReportBranchView = 'V_SALES_REPORT_TMP';

    /** Fallback view, kept byte-identical to the previous behaviour. */
    protected string $salesReportPlainView = 'V_SALES_REPORT';

    /**
     * Resolve the requested period into an inclusive [fdate, ldate] pair.
     *
     * Returns null when the request carries neither a usable month nor a usable
     * range, in which case the caller must reject the request (we never silently
     * fall through to "whole table").
     */
    protected function resolveSalesReportPeriod(Request $request): ?array
    {
        $month = trim((string) $request->input('month', ''));
        $mode = trim((string) $request->input('mode', 'range'));

        // The month must be a real YYYY-MM. Checking the 01-12 range explicitly
        // matters because PHP happily rolls "2026-13" over into January 2027,
        // which would print a report for a month nobody asked for.
        $validMonth = preg_match('/^(\d{4})-(0[1-9]|1[0-2])$/', $month) === 1;

        if (($mode === 'month' || $month !== '') && $validMonth) {
            $start = Carbon::createFromFormat('Y-m-d', $month . '-01')->startOfDay();

            return [
                'fdate' => $start->format('Y-m-d'),
                'ldate' => $start->copy()->endOfMonth()->format('Y-m-d'),
                'month' => $month,
            ];
        }

        // A month was asked for but it was malformed: reject rather than fall
        // back to whatever stale range happened to be in the request.
        if ($mode === 'month' || $month !== '') {
            return null;
        }

        $fdate = trim((string) $request->input('fdate', ''));
        $ldate = trim((string) $request->input('ldate', ''));

        if ($fdate === '' || $ldate === '') {
            return null;
        }

        $from = date_create($fdate);
        $to = date_create($ldate);

        if (! $from || ! $to) {
            return null;
        }

        // Tolerate a swapped range instead of returning an empty report.
        if ($from > $to) {
            [$fdate, $ldate] = [$ldate, $fdate];
        }

        return ['fdate' => $fdate, 'ldate' => $ldate, 'month' => null];
    }

    /**
     * Whether a branch filter was asked for.
     *
     * A branch code must be a non-empty string, so '0' is honoured as a real code.
     */
    protected function wantsSalesReportBranch(Request $request): bool
    {
        $branch = $request->input('branch');

        return $branch !== null && $request->filled('branch');
    }

    /**
     * Resolve the branch to filter on.
     *
     * An empty result means "do not filter". A user who names a branch they may
     * not open does not get an error - the filter degrades to their own branch,
     * mirroring how the header branch switcher behaves.
     */
    protected function resolveSalesReportBranch(Request $request): string
    {
        if (! $this->wantsSalesReportBranch($request)) {
            return '';
        }

        /** @var User|null $user */
        $user = Auth::user();
        $requested = (string) $request->input('branch');

        if (! $user) {
            return '';
        }

        if ($user->canAccessBranch($requested)) {
            return $requested;
        }

        $fallback = (string) $user->branch;

        Log::warning('sales-report: branch filter refused, falling back', [
            'requestedBranch' => $requested,
            'fallbackBranch' => $fallback,
            'user' => $user->nick_name,
        ]);

        return $fallback;
    }

    /**
     * Pick the view to query.
     *
     * _TMP is preferred whenever it exists: it is output-identical to the plain view
     * for the groups that only gained a branch column, and carries independent fixes
     * (the service money column) that should apply even when no branch is filtered.
     * Falling back to the plain view only when _TMP is genuinely absent.
     *
     * Whether the branch filter itself can be honoured is decided separately, by
     * checking for the column, because a _TMP view may exist without one (service).
     */
    protected function resolveSalesReportView(bool $filteringByBranch = false): string
    {
        if ($this->salesReportViewExists($this->salesReportBranchView)) {
            return $this->salesReportBranchView;
        }

        Log::warning('sales-report: bridge view missing, using the plain view', [
            'connection' => $this->dedicatedConnection,
            'wanted' => $this->salesReportBranchView,
            'filteringByBranch' => $filteringByBranch,
        ]);

        return $this->salesReportPlainView;
    }

    /**
     * Branch code => branch name for the active company, for the Cabang column.
     *
     * Deliberately NOT limited to the user's allowed branches: a report showing
     * every branch must be able to name every branch. Access control lives on the
     * filter, not on labelling.
     */
    protected function salesReportBranchNames(): array
    {
        try {
            return M_BRANCH::on($this->dedicatedConnection)
                ->pluck('MBRANCH_NM', 'MBRANCH_CD')
                ->map(fn ($name) => (string) $name)
                ->all();
        } catch (\Throwable $e) {
            Log::warning('sales-report: branch name map failed', ['error' => $e->getMessage()]);

            return [];
        }
    }

    /**
     * Whether the given view actually exposes TSLO_BRANCH.
     *
     * Not every _TMP view has a branch column: the service company group is built
     * from a UNION that includes POS legs, and those tables carry no branch at all,
     * so its _TMP exists (for other fixes) but cannot be filtered by branch. Ask the
     * view rather than assuming that "is _TMP" implies "is branch-capable".
     */
    protected function salesReportViewHasBranchColumn(string $view): bool
    {
        try {
            return DB::connection($this->dedicatedConnection)
                ->table('information_schema.COLUMNS')
                ->where('TABLE_SCHEMA', $this->salesReportSchema())
                ->where('TABLE_NAME', $view)
                ->where('COLUMN_NAME', 'TSLO_BRANCH')
                ->exists();
        } catch (\Throwable $e) {
            Log::warning('sales-report: branch column lookup failed', ['error' => $e->getMessage()]);

            return false;
        }
    }

    /**
     * Whether the given view exists on the active company connection.
     */
    protected function salesReportViewExists(string $view): bool
    {
        try {
            return $this->salesReportViews()
                ->where('TABLE_SCHEMA', $this->salesReportSchema())
                ->where('TABLE_NAME', $view)
                ->exists();
        } catch (\Throwable $e) {
            // information_schema can itself be unreadable; treat that as "absent".
            Log::warning('sales-report: view lookup failed', ['error' => $e->getMessage()]);

            return false;
        }
    }

    /**
     * The database the active company connection actually points at.
     *
     * $dedicatedConnection is a CONNECTION name such as "connect_jos_service",
     * while information_schema identifies objects by SCHEMA name
     * ("jatpower_jos_service"). Comparing the two directly never matches, which
     * silently disables anything guarded by an object lookup, so resolve the real
     * database through the connection instead of assuming the names are equal.
     */
    protected function salesReportSchema(): string
    {
        try {
            return (string) DB::connection($this->dedicatedConnection)->getDatabaseName();
        } catch (\Throwable $e) {
            Log::warning('sales-report: could not resolve schema, falling back to connection name', [
                'connection' => $this->dedicatedConnection,
                'error' => $e->getMessage(),
            ]);

            return (string) $this->dedicatedConnection;
        }
    }

    /** Query builder over information_schema.VIEWS on the active connection. */
    protected function salesReportViews()
    {
        return DB::connection($this->dedicatedConnection)
            ->table('information_schema.VIEWS');
    }

    /**
     * Human-readable period for the report header, e.g.
     * "01 - 30 September 2026 (bulan penuh)" for a whole month, or the plain range.
     *
     * Labelled explicitly so nobody has to guess whether the last day is included.
     */
    protected function salesReportPeriodLabel(array $period): string
    {
        $from = date_create($period['fdate']);
        $to = date_create($period['ldate']);

        if (! $from || ! $to) {
            return '';
        }

        if (! empty($period['month'])) {
            $isWholeMonth = $from->format('d') === '01'
                && $to->format('Y-m-d') === (clone $from)->modify('last day of this month')->format('Y-m-d');

            return $isWholeMonth
                ? $from->format('d') . ' - ' . $to->format('d F Y') . ' (bulan penuh)'
                : $from->format('d M Y') . ' - ' . $to->format('d M Y');
        }

        return $from->format('d M Y') . ' - ' . $to->format('d M Y');
    }

    /**
     * Branch line for the report header: the branch filtered on, or a note that
     * every branch the user may see is included.
     */
    protected function salesReportBranchLabel(bool $branchFilterApplied, string $branch): string
    {
        if (! $branchFilterApplied || $branch === '') {
            return 'Semua Cabang';
        }

        $name = null;

        try {
            $name = M_BRANCH::on($this->dedicatedConnection)
                ->where('MBRANCH_CD', $branch)
                ->value('MBRANCH_NM');
        } catch (\Throwable $e) {
            Log::warning('sales-report: branch name lookup failed', ['error' => $e->getMessage()]);
        }

        return trim(($name ?: $branch) . ' (' . $branch . ')');
    }

    /**
     * Branch options the signed-in user may pick, for the report's dropdown.
     *
     * Same rule as the header switcher (BranchController::options): full-access
     * roles see every branch, everyone else only their assigned list.
     */
    protected function salesReportBranchOptionList(): array
    {
        /** @var User|null $user */
        $user = Auth::user();

        if (! $user || empty($this->dedicatedConnection) || $this->dedicatedConnection === '-') {
            return [];
        }

        $query = M_BRANCH::on($this->dedicatedConnection)->select('MBRANCH_CD', 'MBRANCH_NM');

        if (! $user->hasFullBranchAccess()) {
            $codes = $user->allowedBranches();

            if (empty($codes)) {
                return [];
            }

            $query->whereIn('MBRANCH_CD', $codes);
        }

        return $query->orderBy('MBRANCH_CD')
            ->get()
            ->map(function ($branch) {
                return [
                    'code' => (string) $branch->MBRANCH_CD,
                    'name' => (string) $branch->MBRANCH_NM,
                ];
            })
            ->all();
    }
}
