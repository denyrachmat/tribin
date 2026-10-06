<?php

namespace App\Traits;

use App\Models\ApprovalHistory;
use Illuminate\Support\Facades\Auth;

/**
 * Single, append-only approval event log shared by every module.
 *
 * Design contract:
 * - One row per transition, never update, never delete.
 *   Latest (MAX id) per (form, code, branch) is the current status.
 * - `action` is the unambiguous vocabulary:
 *   SUBMITTED | APPROVED | REJECTED | REVISED | REVOKED | POSTED
 *   (`type` is left untouched - legacy forms already disagree on its
 *   meaning, and historical rows must stay readable.)
 * - `note` carries the human reason (rejection reason, revision note ...).
 * - `meta` carries an optional machine snapshot (qty, amount, previous
 *   status, ...).
 *
 * Requires the host controller to expose $this->dedicatedConnection.
 */
trait ApprovalLogTraits
{
    public const APRV_SUBMITTED = 'SUBMITTED';
    public const APRV_APPROVED = 'APPROVED';
    public const APRV_REJECTED = 'REJECTED';
    public const APRV_REVISED = 'REVISED';
    public const APRV_REVOKED = 'REVOKED';
    public const APRV_POSTED = 'POSTED';

    /**
     * Append one event. Returns the created row.
     */
    public function approvalLog($form, $code, $action, $note = null, array $meta = [], $cg = null, $branch = null, $type = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);
        $branch = $branch ?: (Auth::check() ? Auth::user()->branch : null);

        return ApprovalHistory::on($cg)->create([
            'created_by' => Auth::check() ? Auth::user()->nick_name : null,
            'form' => $form,
            'code' => (string) $code,
            'type' => $type,
            'action' => $action,
            'remark' => $note,
            'note' => $note,
            'meta' => empty($meta) ? null : json_encode($meta),
            'branch' => $branch,
        ]);
    }

    /**
     * Ordered timeline for one document (oldest first).
     */
    public function approvalTimeline($form, $code, $cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);

        $q = ApprovalHistory::on($cg)
            ->where('form', $form)
            ->where('code', (string) $code);

        if ($branch !== null) {
            $q->where('branch', $branch);
        }

        return $q->orderBy('id', 'asc')->get();
    }

    /**
     * Current status = action of the latest event. Returns null when no
     * events exist for the document.
     */
    public function approvalStatus($form, $code, $cg = null, $branch = null)
    {
        $cg = $cg ?: ($this->dedicatedConnection ?? null);

        $q = ApprovalHistory::on($cg)
            ->where('form', $form)
            ->where('code', (string) $code);

        if ($branch !== null) {
            $q->where('branch', $branch);
        }

        $latest = $q->orderBy('id', 'desc')->first();

        return $latest->action ?? null;
    }

    /**
     * Guard used by APPROVE/REJECT handlers: only allow transitions from an
     * expected prior status (prevents double-approve / approve-after-reject).
     * Returns [ok(bool), message].
     */
    public function approvalTransitionGuard($form, $code, array $allowedPrior, $cg = null, $branch = null)
    {
        $status = $this->approvalStatus($form, $code, $cg, $branch);

        if (!in_array($status, $allowedPrior, true)) {
            return [
                false,
                "Document {$code} is currently " . ($status ?? 'UNKNOWN') .
                " and cannot be processed (expected: " . implode('/', $allowedPrior) . ").",
            ];
        }

        return [true, null];
    }
}
