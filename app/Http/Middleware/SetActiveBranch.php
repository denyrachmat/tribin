<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

/**
 * Applies the branch the user picked in the header selector.
 *
 * Branch is read straight off the user record (`Auth::user()->branch`) in ~370
 * call sites spread across every controller. Rather than touch all of them, we
 * override the value on the in-memory user for the duration of the request, so
 * existing code keeps working and simply sees the selected branch.
 *
 * The picked branch is stored on the user (not only in a cookie) so the choice
 * survives across sessions and devices. It is re-validated against the user's
 * allowed branches on every request; anything not allowed falls back to the
 * user's own default `branch`, so a tampered cookie can never widen access.
 */
class SetActiveBranch
{
    /** Request field carrying the picked branch code. */
    public const FIELD = 'ID_BRANCH';

    /** Cookie naming the branch in use, purely so the shell can render a label. */
    public const COOKIE = 'BRID';

    /** Session key holding the active branch code. */
    public const SESSION = 'active_branch';

    public function handle(Request $request, Closure $next): Response
    {
        if (! Auth::check()) {
            return $next($request);
        }

        $user = Auth::user();

        // Explicit selection (header selector / API call) wins, then the session,
        // then whatever is already on the record.
        $requested = $request->input(self::FIELD)
            ?: $request->header('X-Branch')
            ?: $request->session()->get(self::SESSION)
            ?: $user->branch;

        $selected = $user->canAccessBranch($requested) ? (string) $requested : (string) $user->branch;

        if ($selected !== '' && $selected !== $user->branch) {
            // Override in memory only. The value is deliberately marked as
            // already-synced so an incidental $user->save() elsewhere can never
            // persist the switched branch onto the account record.
            $user->branch = $selected;
            $user->syncOriginalAttribute('branch');
        }

        $request->session()->put(self::SESSION, $selected);

        return $next($request);
    }
}
