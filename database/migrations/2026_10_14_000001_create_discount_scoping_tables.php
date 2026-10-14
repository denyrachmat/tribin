<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Discount scoping: customer, item category, and the quotation snapshot.
 *
 * Design notes (the reasoning matters more than the columns):
 *
 * 1. A discount master (M_DISC, main DB) is just a code with a percent OR an amount.
 *    WHERE it applies is expressed by the two link tables added here, per company
 *    database:
 *        M_CUS_DISC      - which discounts a customer gets
 *        M_DISC_ITEMCAT  - which discounts an item category carries
 *    Splitting them this way means one discount definition can be attached to many
 *    customers and many categories without duplicating the rate.
 *
 * 2. Neither link table has a foreign key to M_DISC. M_DISC lives in the main
 *    database while these live per company, and MySQL cannot enforce a foreign key
 *    across schemas - so referential integrity is checked in the controller instead.
 *
 * 3. T_QUODETA gains a SNAPSHOT, never just a reference. A quotation is a document
 *    that gets printed and sent; if a master rate is edited afterwards, already-sent
 *    quotations must not change their numbers. So the applied discount is copied
 *    onto the line at save time:
 *        TQUODETA_DISCAMT     - total discount applied to this line (a reduction)
 *        TQUODETA_DISCDETAIL  - JSON list of what was applied, for auditing
 *    Net is derived: (TQUODETA_PRC * TQUODETA_ITMQT) - TQUODETA_DISCAMT.
 *
 * 4. Rounding is per customer, defaulting to nearest with 0 decimals. Null means
 *    "use the default", so the default can be changed in one place later.
 *
 * These tables live in each company database. Run per connection:
 *   php artisan migrate --database=connect_jos_jatpt
 *   php artisan migrate --database=connect_jos_jatcv
 *   php artisan migrate --database=connect_jos_retail
 *   php artisan migrate --database=connect_jos_service
 */
return new class extends Migration
{
    public function up(): void
    {
        // ---- which discounts a customer gets -------------------------------
        if (!Schema::hasTable('M_CUS_DISC')) {
            Schema::create('M_CUS_DISC', function (Blueprint $table) {
                $table->id();
                $table->string('MCUSD_CUSCD', 10);
                $table->string('MDISC_CODE', 255);
                // STACK  = this discount applies on top of whatever else applies
                // REPLACE= this discount replaces discounts from other levels
                $table->string('MCUSD_MODE', 10)->default('STACK');
                // Free ordering: the sequence the user arranges, applied in this order.
                $table->integer('MCUSD_SEQ')->default(0);
                // null / empty = applies to every branch of this company
                $table->string('MCUSD_BRANCH', 3)->nullable();
                $table->string('created_by', 16)->nullable();
                $table->timestamps();

                $table->unique(['MCUSD_CUSCD', 'MDISC_CODE', 'MCUSD_BRANCH'], 'm_cus_disc_unique');
                $table->index('MCUSD_CUSCD');
            });
        }

        // ---- which discounts an item category carries ----------------------
        if (!Schema::hasTable('M_DISC_ITEMCAT')) {
            Schema::create('M_DISC_ITEMCAT', function (Blueprint $table) {
                $table->id();
                // Matches M_ITM.MITM_ITMCAT, which is a free string, not a code from
                // a master table - so the controller validates it against M_ITM.
                $table->string('MDIC_ITMCAT', 15);
                $table->string('MDISC_CODE', 255);
                $table->string('MDIC_MODE', 10)->default('STACK');
                $table->integer('MDIC_SEQ')->default(0);
                $table->string('MDIC_BRANCH', 3)->nullable();
                $table->string('created_by', 16)->nullable();
                $table->timestamps();

                $table->unique(['MDIC_ITMCAT', 'MDISC_CODE', 'MDIC_BRANCH'], 'm_disc_itemcat_unique');
                $table->index('MDIC_ITMCAT');
            });
        }

        // ---- customer-level rounding + stacking preference ------------------
        if (Schema::hasTable('M_CUS')) {
            Schema::table('M_CUS', function (Blueprint $table) {
                if (!Schema::hasColumn('M_CUS', 'MCUS_ROUNDMODE')) {
                    // NEAREST | DOWN | UP. Null = use the default (NEAREST).
                    $table->string('MCUS_ROUNDMODE', 10)->nullable();
                }
                if (!Schema::hasColumn('M_CUS', 'MCUS_ROUNDDP')) {
                    // Decimal places to keep. Null = 0.
                    $table->tinyInteger('MCUS_ROUNDDP')->nullable();
                }
                if (!Schema::hasColumn('M_CUS', 'MCUS_DISCMODE')) {
                    // How this customer's discounts combine with item-level ones:
                    // STACK (default) or REPLACE.
                    $table->string('MCUS_DISCMODE', 10)->nullable();
                }
            });
        }

        // ---- quotation line snapshot ---------------------------------------
        if (Schema::hasTable('T_QUODETA')) {
            Schema::table('T_QUODETA', function (Blueprint $table) {
                if (!Schema::hasColumn('T_QUODETA', 'TQUODETA_DISCAMT')) {
                    // Total discount applied to the line, already rounded. A reduction,
                    // so net = (TQUODETA_PRC * TQUODETA_ITMQT) - TQUODETA_DISCAMT.
                    $table->double('TQUODETA_DISCAMT', 18, 2)->nullable();
                }
                if (!Schema::hasColumn('T_QUODETA', 'TQUODETA_DISCDETAIL')) {
                    // JSON snapshot of what was applied, e.g.
                    // [{"code":"D10","src":"CUST","pct":10,"amt":50000}]
                    // Kept so a printed quotation can be explained later even if the
                    // masters have since been edited or deleted.
                    $table->text('TQUODETA_DISCDETAIL')->nullable();
                }
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('T_QUODETA')) {
            Schema::table('T_QUODETA', function (Blueprint $table) {
                foreach (['TQUODETA_DISCAMT', 'TQUODETA_DISCDETAIL'] as $column) {
                    if (Schema::hasColumn('T_QUODETA', $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }

        if (Schema::hasTable('M_CUS')) {
            Schema::table('M_CUS', function (Blueprint $table) {
                foreach (['MCUS_ROUNDMODE', 'MCUS_ROUNDDP', 'MCUS_DISCMODE'] as $column) {
                    if (Schema::hasColumn('M_CUS', $column)) {
                        $table->dropColumn($column);
                    }
                }
            });
        }

        Schema::dropIfExists('M_DISC_ITEMCAT');
        Schema::dropIfExists('M_CUS_DISC');
    }
};
