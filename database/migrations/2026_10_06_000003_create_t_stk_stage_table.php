<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Staging area for Stock Take batches.
     *
     * An uploaded count sheet is parsed into this table (one row per item +
     * location, holding the COUNTED qty). Nothing is written to the stock
     * ledger (C_ITRN / V_STOCK_CHECK) until a batch is approved, at which
     * point the ADJ-INC / ADJ-OUT rows are generated and this table is marked
     * as posted. Re-uploading the same batch simply overwrites the staged
     * target for each item+location, so counts never stack.
     *
     * Lives in each company DB - run per connection, e.g.:
     *   php artisan migrate --database=connect_jos_retail
     */
    public function up(): void
    {
        if (Schema::hasTable('T_STK_STAGE')) {
            return;
        }

        Schema::create('T_STK_STAGE', function (Blueprint $table) {
            // Match the existing app tables (utf8mb4_unicode_ci). The DB default
            // on these servers is utf8mb4_general_ci, which makes any join
            // against C_ITRN / T_RCV_HEAD fail with a collation error.
            $table->charset = 'utf8mb4';
            $table->collation = 'utf8mb4_unicode_ci';

            $table->bigIncrements('id');
            $table->string('STK_DOCNO', 100);      // T_RCV_HEAD.TRCV_DOCNO (STK-YYYYMMDD)
            $table->bigInteger('STK_HEADID');      // T_RCV_HEAD.id
            $table->string('STK_ITMCD', 25);
            $table->string('STK_ITMNM', 100)->nullable();
            $table->string('STK_LOC', 100);
            $table->decimal('STK_TARGET', 18, 4)->default(0);   // counted qty
            $table->decimal('STK_PRC_BUY', 18, 4)->default(0);
            $table->decimal('STK_PRC_SELL', 18, 4)->default(0);
            $table->string('STK_UOM', 15)->nullable();
            $table->string('STK_BRANCH', 3)->nullable();
            // 0 = staged, 1 = posted, 2 = rejected
            $table->tinyInteger('STK_STATE')->default(0);
            $table->string('created_by', 16)->nullable();
            $table->timestamps();

            $table->unique(['STK_DOCNO', 'STK_ITMCD', 'STK_LOC'], 'uq_stk_stage_doc_item_loc');
            $table->index(['STK_DOCNO', 'STK_STATE'], 'ix_stk_stage_doc_state');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('T_STK_STAGE');
    }
};
