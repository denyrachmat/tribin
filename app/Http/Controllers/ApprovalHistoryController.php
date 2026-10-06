<?php

namespace App\Http\Controllers;

use App\Models\ApprovalHistory;
use App\Traits\ApprovalLogTraits;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;

/**
 * Generic approval-history reader for the shared History panel.
 *
 * GET approval/history?form=SPK&code=2026-00041   -> full timeline (oldest first)
 * GET approval/history/recent?form=STK&limit=25    -> latest status per document
 */
class ApprovalHistoryController extends Controller
{
    use ApprovalLogTraits;

    protected $dedicatedConnection;

    public function __construct()
    {
        date_default_timezone_set('Asia/Jakarta');
        if (isset($_COOKIE['CGID'])) {
            $this->dedicatedConnection = Crypt::decryptString($_COOKIE['CGID']);
        }
    }

    public function historyPage()
    {
        return view('approval.history');
    }

    public function timeline(Request $request)
    {
        $request->validate([
            'form' => 'required|string|max:15',
            'code' => 'required|string|max:50',
        ]);

        $rows = $this->approvalTimeline(
            strtoupper($request->form),
            $request->code,
            $this->dedicatedConnection,
            $request->filled('branch') ? $request->branch : null
        );

        return ['data' => $rows->map(fn($r) => $this->shape($r))];
    }

    /** Latest action per document, most recent first. */
    public function recent(Request $request)
    {
        $limit = min((int) ($request->input('limit', 25)), 100);
        $branch = $request->filled('branch') ? $request->branch : (Auth::check() ? Auth::user()->branch : null);

        $q = ApprovalHistory::on($this->dedicatedConnection);

        if ($request->filled('form')) {
            $q->where('form', strtoupper($request->form));
        }
        if ($branch !== null) {
            $q->where('branch', $branch);
        }

        // Latest row per (form, code, branch)
        $latestIds = (clone $q)
            ->select(DB::raw('MAX(id) as id'))
            ->groupBy('form', 'code', 'branch');

        $rows = ApprovalHistory::on($this->dedicatedConnection)
            ->whereIn('id', $latestIds)
            ->orderBy('id', 'desc')
            ->limit($limit)
            ->get();

        return ['data' => $rows->map(fn($r) => $this->shape($r) + ['form' => $r->form, 'code' => $r->code])];
    }

    private function shape($r)
    {
        return [
            'id' => $r->id,
            'form' => $r->form,
            'code' => $r->code,
            'action' => $r->action ?: $this->legacyAction($r->form, $r->type),
            'type' => $r->type,
            'note' => $r->note ?: (($r->remark === '-' || $r->remark === '') ? null : $r->remark),
            'meta' => $r->meta ? json_decode($r->meta, true) : null,
            'by' => $r->created_by,
            'branch' => $r->branch,
            'at' => optional($r->created_at)->format('Y-m-d H:i:s'),
        ];
    }

    /**
     * Label for rows written before the `action` column existed. The legacy
     * `type` value is per-form, so it must be interpreted per form:
     *   QUOTATION: 3 = APPROVED, 2 = REJECTED
     *   SPK      : 1 = SUBMITTED, 2 = REVISED
     */
    private function legacyAction($form, $type)
    {
        $map = [
            'QUOTATION' => ['3' => 'APPROVED', '2' => 'REJECTED'],
            'SPK' => ['1' => 'SUBMITTED', '2' => 'REVISED'],
        ];

        $f = strtoupper((string) $form);

        if (isset($map[$f][(string) $type])) {
            return $map[$f][(string) $type];
        }

        return 'RECORDED' . ($type ? ' (t=' . $type . ')' : '');
    }
}
