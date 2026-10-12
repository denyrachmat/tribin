<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Track where a barcode registration came from, and which source CG's ledger
 * row it mirrors.
 *
 * Context: a barcode string is only unique WITHIN a company database - each CG
 * generates its own BC<date><seq> series, so the same string legitimately
 * exists in several CGs (279 such values on prod data) and even for different
 * items inside one CG. The barcode registry (T_RCV_BC_DETAIL) therefore has to
 * carry its origin explicitly.
 *
 * - TRCVBC_ORIGIN : AUTO (created by a receive/barcode flow) | TRANSFER
 *                   (mirrored from a C_ITRN row when stock moved between CGs)
 * - TRCVBC_REF    : the source ledger row id this registration was mirrored
 *                   from (C_ITRN.id); NULL for receive-created rows.
 */
return new class extends Migration
{
    public function up(): void
    {
        // The company DBs were never fully migrated by Laravel (their creates
        // predate the current migration set), so each ALTER is guarded by its
        // own column check and is safe to re-run.
        $connections = array_filter([
            'mysql',
            config('database.connections.connect_jos_jatpt') ? 'connect_jos_jatpt' : null,
            config('database.connections.connect_jos_jatcv') ? 'connect_jos_jatcv' : null,
            config('database.connections.connect_jos_retail') ? 'connect_jos_retail' : null,
            config('database.connections.connect_jos_service') ? 'connect_jos_service' : null,
        ]);

        foreach ($connections as $connection) {
            if (!Schema::connection($connection)->hasTable('T_RCV_BC_DETAIL')) {
                continue;
            }
            if (!Schema::connection($connection)->hasColumn('T_RCV_BC_DETAIL', 'TRCVBC_ORIGIN')) {
                Schema::connection($connection)->table('T_RCV_BC_DETAIL', function (Blueprint $table) {
                    $table->string('TRCVBC_ORIGIN', 16)->nullable()->after('TRCVBC_DETID');
                });
            }
            if (!Schema::connection($connection)->hasColumn('T_RCV_BC_DETAIL', 'TRCVBC_REF')) {
                Schema::connection($connection)->table('T_RCV_BC_DETAIL', function (Blueprint $table) {
                    $table->unsignedBigInteger('TRCVBC_REF')->nullable()->after('TRCVBC_ORIGIN');
                });
            }
        }
    }

    public function down(): void
    {
        foreach (['mysql', 'connect_jos_jatpt', 'connect_jos_jatcv', 'connect_jos_retail', 'connect_jos_service'] as $connection) {
            if (!Schema::connection($connection)->hasTable('T_RCV_BC_DETAIL')) {
                continue;
            }
            Schema::connection($connection)->table('T_RCV_BC_DETAIL', function (Blueprint $table) {
                $table->dropColumn(['TRCVBC_ORIGIN', 'TRCVBC_REF']);
            });
        }
    }
};
