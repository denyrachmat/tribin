<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Global role-to-item mapping per company/branch (lives in the
     * application's global DB - jatpower_tribin - same home as M_GENCODE).
     * Roles catalog: M_GENCODE code GEN_MAP_ROLE (see seeder comment below).
     */
    public function up(): void
    {
        Schema::create('ITEM_MAPPINGS', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('created_by', 16)->nullable();
            $table->string('updated_by', 16)->nullable();
            $table->string('MAP_ROLE', 30);        // e.g. SPK_FUEL (catalog: M_GENCODE GEN_MAP_ROLE)
            $table->string('MAP_CG', 45);          // company connection: connect_jos_jatpt | ...
            $table->string('MAP_BRANCH', 3);       // branch code: 101 | ...
            $table->string('MAP_ITMCD', 25);       // M_ITM.MITM_ITMCD inside that company+branch
            $table->string('MAP_LOCCD', 100)->nullable(); // optional default stock location
            $table->boolean('MAP_ACTIVE')->default(1);

            $table->unique(['MAP_ROLE', 'MAP_CG', 'MAP_BRANCH'], 'uq_itemmap_role_cg_br');
            $table->index(['MAP_CG', 'MAP_BRANCH'], 'ix_itemmap_cg_br');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('ITEM_MAPPINGS');
    }
};
