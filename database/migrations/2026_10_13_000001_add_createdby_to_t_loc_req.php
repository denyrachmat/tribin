<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Records WHO submitted a transfer request.
 *
 * T_LOC_REQ stored only TLOCREQ_SUBMITTED (a datetime) and TLOCREQ_APPRVBY (the
 * approver), so the person who actually submitted the request was never captured -
 * which left the Surat Jalan "Dibuat oleh" line naming the approver instead of the
 * operator who did the transfer req.
 *
 * Nullable and populated only from now on: existing rows keep NULL, and the print
 * path falls back to the service order's creator for them.
 *
 * T_LOC_REQ lives in each company DB. Run per connection, e.g.:
 *   php artisan migrate --database=connect_jos_service
 */
return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasTable('T_LOC_REQ')) {
            return;
        }

        if (!Schema::hasColumn('T_LOC_REQ', 'TLOCREQ_CREATEDBY')) {
            Schema::table('T_LOC_REQ', function (Blueprint $table) {
                $table->string('TLOCREQ_CREATEDBY', 16)->nullable()->after('TLOCREQ_ISREP');
            });
        }
    }

    public function down(): void
    {
        if (!Schema::hasTable('T_LOC_REQ')) {
            return;
        }

        if (Schema::hasColumn('T_LOC_REQ', 'TLOCREQ_CREATEDBY')) {
            Schema::table('T_LOC_REQ', function (Blueprint $table) {
                $table->dropColumn('TLOCREQ_CREATEDBY');
            });
        }
    }
};
