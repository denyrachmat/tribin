<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

/**
 * Menu entries for the two discount attachment screens.
 *
 *   AO1  Customer Discount        -> discount/customer/form
 *   AO2  Item Category Discount   -> discount/item-category/form
 *
 * Both sit under the Master node (parent A) next to "Disc". Codes are prefixed AO
 * rather than continuing at AR so the three discount screens read as one group.
 *
 * Role grants mirror whatever already has the Reports/Master parent, the same way
 * the earlier CJ2 grant worked: a menu row with no menu_roles entry is invisible.
 * They are granted to every role holding the parent A, because managing a discount
 * is master-data work and the roles that reach Master are already the ones allowed
 * to configure the system.
 *
 * Runs on the default connection (the menus table lives in the main database).
 */
return new class extends Migration
{
    private const ENTRIES = [
        'AO1' => ['name' => 'Customer Discount', 'url' => 'discount/customer/form', 'desc' => 'Diskon default per customer'],
        'AO2' => ['name' => 'Item Category Discount', 'url' => 'discount/item-category/form', 'desc' => 'Diskon per kategori item'],
    ];

    private const PARENT_CODE = 'A';

    public function up(): void
    {
        if (! Schema::hasTable('menus')) {
            return;
        }

        $columns = Schema::getColumnListing('menus');

        foreach (self::ENTRIES as $code => $entry) {
            $payload = ['code' => $code, 'name' => $entry['name'], 'url' => $entry['url']];

            foreach (['description', 'parent_code', 'icon'] as $column) {
                if (in_array($column, $columns, true)) {
                    $payload[$column] = match ($column) {
                        'description' => $entry['desc'],
                        'parent_code' => self::PARENT_CODE,
                        default => null,
                    };
                }
            }

            $exists = DB::table('menus')
                ->where('code', $code)
                ->orWhere('url', $entry['url'])
                ->exists();

            if (! $exists) {
                DB::table('menus')->insert($payload);
            }
        }

        $this->grantRoles();
    }

    /**
     * Grant each new screen to every role that can already see the Master parent.
     */
    private function grantRoles(): void
    {
        if (! Schema::hasTable('menu_roles')) {
            return;
        }

        $roles = DB::table('menu_roles')
            ->where('menu_code', self::PARENT_CODE)
            ->pluck('role_name')
            ->all();

        foreach ($roles as $role) {
            foreach (array_keys(self::ENTRIES) as $code) {
                $already = DB::table('menu_roles')
                    ->where('role_name', $role)
                    ->where('menu_code', $code)
                    ->exists();

                if ($already) {
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
            DB::table('menu_roles')->whereIn('menu_code', array_keys(self::ENTRIES))->delete();
        }

        DB::table('menus')->whereIn('code', array_keys(self::ENTRIES))->delete();
    }
};
