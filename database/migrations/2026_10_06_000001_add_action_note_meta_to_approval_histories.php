<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * approval_histories lives in each company DB, not in the central DB.
     * Run per company connection, e.g.:
     *   php artisan migrate --database=connect_jos_jatpt
     *   php artisan migrate --database=connect_jos_jatcv
     *   php artisan migrate --database=connect_jos_retail
     *   php artisan migrate --database=connect_jos_service
     *
     * Adds an explicit, unambiguous action vocabulary on top of the legacy
     * `type` column. `type` is kept untouched because existing forms already
     * disagree on its meaning (Quotation: 3=approve, 2=reject;
     * SPK: 1=submit, 2=edited) and historical rows must stay readable.
     */
    public function up(): void
    {
        if (!Schema::hasTable('approval_histories')) {
            return;
        }

        Schema::table('approval_histories', function (Blueprint $table) {
            if (!Schema::hasColumn('approval_histories', 'action')) {
                // SUBMITTED | APPROVED | REJECTED | REVISED | REVOKED | POSTED
                $table->string('action', 20)->nullable()->after('type');
            }
            if (!Schema::hasColumn('approval_histories', 'note')) {
                $table->string('note', 255)->nullable()->after('remark');
            }
            if (!Schema::hasColumn('approval_histories', 'meta')) {
                // optional JSON snapshot (qty, amount, previous state, ...)
                $table->text('meta')->nullable()->after('note');
            }
        });
    }

    public function down(): void
    {
        if (!Schema::hasTable('approval_histories')) {
            return;
        }

        Schema::table('approval_histories', function (Blueprint $table) {
            foreach (['meta', 'note', 'action'] as $col) {
                if (Schema::hasColumn('approval_histories', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
