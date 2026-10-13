<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * Roles that may work in every branch of the company, without needing an
     * explicit entry in `branches`. Keeps the branch selector usable for
     * administrators instead of locking them to a single code.
     */
    public const FULL_BRANCH_ROLES = ['root', 'director', 'general_manager'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'nick_name',
        'role',
        'branch',
        'branches',
        'phone',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * Every branch code this user is allowed to work in.
     *
     * `branches` holds a comma-separated list of codes (e.g. "101,102"). When it
     * is empty the user falls back to their single default `branch`, which keeps
     * every pre-existing user working exactly as before.
     *
     * @return array<int, string>
     */
    public function allowedBranches(): array
    {
        $codes = array_filter(array_map('trim', explode(',', (string) $this->branches)));

        if (empty($codes) && ! empty($this->branch)) {
            $codes = [(string) $this->branch];
        }

        return array_values(array_unique($codes));
    }

    /**
     * Branches an administrator/root account may reach: all of them.
     */
    public function hasFullBranchAccess(): bool
    {
        return in_array($this->role, self::FULL_BRANCH_ROLES, true);
    }

    /**
     * Whether this user may switch to the given branch code.
     *
     * Administrators reach every branch; everyone else is limited to their
     * configured list. The value is only trusted if it is a valid code for the
     * company the user is currently working in, which the caller resolves.
     */
    public function canAccessBranch(?string $code): bool
    {
        if (empty($code)) {
            return false;
        }

        if ($this->hasFullBranchAccess()) {
            return true;
        }

        return in_array((string) $code, $this->allowedBranches(), true);
    }
}
