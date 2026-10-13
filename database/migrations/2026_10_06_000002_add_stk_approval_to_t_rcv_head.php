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

        // The stock-take header table is not shaped identically on every
        // connection (the main DB's copy has no TRCV_REFFNO), so only anchor the
        // new columns to it when it is actually there. Anchoring unconditionally
        // made this migration fail with 'Unknown column TRCV_REFFNO' on any
        // connection whose T_RCV_HEAD differs, which silently left the columns
        // missing and broke every query that filters on them.
        $anchor = Schema::hasColumn('T_RCV_HEAD', 'TRCV_REFFNO') ? 'TRCV_REFFNO' : null;

        Schema::table('T_RCV_HEAD', function (Blueprint $table) use ($anchor) {
            if (!Schema::hasColumn('T_RCV_HEAD', 'TRCV_STK_STATUS')) {
                // NULL = legacy/pre-gate batch (already posted)
                // DRAFT = rows being imported
                // PENDING_APPROVAL = imported, awaiting approver
                // REJECTED = refused, nothing posted
                // POSTED = adjustments applied to the ledger
                $col = $table->string('TRCV_STK_STATUS', 20)->nullable();
                if ($anchor) {
                    $col->after($anchor);
                }
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
