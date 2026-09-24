<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // T_SRV_DET lives in each company DB, not in the central DB.
        // Run this migration per company connection, e.g.:
        //   php artisan migrate --database=connect_jos_jatpt
        //   php artisan migrate --database=connect_jos_jatcv
        //   php artisan migrate --database=connect_jos_retail
        //   php artisan migrate --database=connect_jos_service
        if (!Schema::hasTable('T_SRV_DET')) {
            return;
        }

        Schema::table('T_SRV_DET', function (Blueprint $table) {
            if (!Schema::hasColumn('T_SRV_DET', 'TSRVD_DONE_SUBMITTED')) {
                $table->dateTime('TSRVD_DONE_SUBMITTED')->nullable()->after('TSRVD_LOC');
            }
            if (!Schema::hasColumn('T_SRV_DET', 'TSRVD_DONE_APPRVDT')) {
                $table->date('TSRVD_DONE_APPRVDT')->nullable()->after('TSRVD_DONE_SUBMITTED');
            }
            if (!Schema::hasColumn('T_SRV_DET', 'TSRVD_DONE_APPRVBY')) {
                $table->string('TSRVD_DONE_APPRVBY', 100)->nullable()->after('TSRVD_DONE_APPRVDT');
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (!Schema::hasTable('T_SRV_DET')) {
            return;
        }

        Schema::table('T_SRV_DET', function (Blueprint $table) {
            if (Schema::hasColumn('T_SRV_DET', 'TSRVD_DONE_APPRVBY')) {
                $table->dropColumn('TSRVD_DONE_APPRVBY');
            }
            if (Schema::hasColumn('T_SRV_DET', 'TSRVD_DONE_APPRVDT')) {
                $table->dropColumn('TSRVD_DONE_APPRVDT');
            }
            if (Schema::hasColumn('T_SRV_DET', 'TSRVD_DONE_SUBMITTED')) {
                $table->dropColumn('TSRVD_DONE_SUBMITTED');
            }
        });
    }
};
