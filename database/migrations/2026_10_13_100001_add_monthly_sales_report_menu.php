<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Adds the menu entry for the monthly / branch sales report, plus the role grants
 * that make it visible.
 *
 * The sidebar is built from menu_roles JOIN menus filtered by the user's role, so a
 * menus row on its own is invisible to everyone. Access is therefore mirrored from
 * the existing "Sales Report by Category" (CJ): whoever can already open that report
 * can open this one.
 *
 * Note the parent (C, the Reports node) is required too - the sidebar renders
 * children under a granted parent, so CJ2 must be granted to roles that also hold C.
 * Roles holding CJ without C (cashier, general_manager) are skipped, because the
 * existing report does not render for them either.
 *
 * The Reports menu lives in the MAIN database, so this runs on the default
 * connection - unlike the CG-scoped migrations in this folder.
 */
return new class extends Migration
{
    private const CODE = 'CJ2';

    private const URL = 'receive-order/monthlySalesReportForm';

    /** Existing report whose visibility this one mirrors. */
    private const MIRROR_CODE = 'CJ';

    private const PARENT_CODE = 'C';

    public function up(): void
    {
        if (! Schema::hasTable('menus')) {
            return;
        }

        $this->insertMenuRow();
        $this->grantRoles();
    }

    private function insertMenuRow(): void
    {
        $columns = Schema::getColumnListing('menus');

        // The table has no primary key and no timestamps in this deployment.
        $payload = ['code' => self::CODE, 'name' => 'Sales Report (Bulanan)', 'url' => self::URL];

        foreach (['description', 'parent_code', 'icon'] as $column) {
            if (in_array($column, $columns, true)) {
                $payload[$column] = match ($column) {
                    'description' => 'Laporan per bulan, bisa difilter per cabang',
                    'parent_code' => self::PARENT_CODE,
                    default => null,
                };
            }
        }

        // Idempotent: skip if the code or the url is already taken.
        $exists = DB::table('menus')
            ->where('code', self::CODE)
            ->orWhere('url', self::URL)
            ->exists();

        if ($exists) {
            return;
        }

        DB::table('menus')->insert($payload);
    }

    /**
     * Grant the new report to every role that can render the existing one.
     */
    private function grantRoles(): void
    {
        if (! Schema::hasTable('menu_roles')) {
            return;
        }

        $roles = DB::table('menu_roles')
            ->where('menu_code', self::MIRROR_CODE)
            ->whereIn('role_name', function ($query) {
                // ...and that also hold the Reports parent, or it will not render.
                $query->select('role_name')
                    ->from('menu_roles')
                    ->where('menu_code', self::PARENT_CODE);
            })
            ->pluck('role_name');

        foreach ($roles as $role) {
            $already = DB::table('menu_roles')
                ->where('role_name', $role)
                ->whereIn('menu_code', [self::CODE, self::PARENT_CODE])
                ->pluck('menu_code')
                ->all();

            foreach ([self::CODE, self::PARENT_CODE] as $code) {
                if (in_array($code, $already, true)) {
                    continue;
                }

                DB::table('menu_roles')->insert([
                    'role_name' => $role,
                    'menu_code' => $code,
                    'created_by' => 'system',
                    'created_at' => now(),
                ]);
            }
        }
    }

    public function down(): void
    {
        if (! Schema::hasTable('menus')) {
            return;
        }

        if (Schema::hasTable('menu_roles')) {
            DB::table('menu_roles')->where('menu_code', self::CODE)->delete();
        }

        DB::table('menus')->where('url', self::URL)->delete();
    }
};
