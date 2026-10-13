<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * T_RCV_HEAD holds the Stock Take batch header (docno STK-YYYYMMDD per day).
     * Approval state is tracked on the header; the per-row ledger adjustments
     * (ADJ-INC / ADJ-OUT) are only written when the batch is approved.
     *
     * T_RCV_HEAD lives in each company DB. Run per connection, e.g.:
     *   php artisan migrate --database=connect_jos_retail
     */
    public function up(): void
    {
        if (!Schema::hasTable('T_RCV_HEAD')) {
            return;
        }

        Schema::table('T_RCV_HEAD', function (Blueprint $table) {
            if (!Schema::hasColumn('T_RCV_HEAD', 'TRCV_STK_STATUS')) {
                // NULL = legacy/pre-gate batch (already posted)
                // DRAFT = rows being imported
                // PENDING_APPROVAL = imported, awaiting approver
                // REJECTED = refused, nothing posted
                // POSTED = adjustments applied to the ledger
                $table->string('TRCV_STK_STATUS', 20)->nullable()->after('TRCV_REFFNO');
            }
            if (!Schema::hasColumn('T_RCV_HEAD', 'TRCV_STK_APPROVAL_NOTE')) {
                $table->string('TRCV_STK_APPROVAL_NOTE', 255)->nullable()->after('TRCV_STK_STATUS');
            }
            if (!Schema::hasColumn('T_RCV_HEAD', 'TRCV_STK_POSTED_AT')) {
                $table->datetime('TRCV_STK_POSTED_AT')->nullable()->after('TRCV_STK_APPROVAL_NOTE');
            }
        });
    }

    public function down(): void
    {
        if (!Schema::hasTable('T_RCV_HEAD')) {
            return;
        }

        Schema::table('T_RCV_HEAD', function (Blueprint $table) {
            foreach (['TRCV_STK_POSTED_AT', 'TRCV_STK_APPROVAL_NOTE', 'TRCV_STK_STATUS'] as $col) {
                if (Schema::hasColumn('T_RCV_HEAD', $col)) {
                    $table->dropColumn($col);
                }
            }
        });
    }
};
