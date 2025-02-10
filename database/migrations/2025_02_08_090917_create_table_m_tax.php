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
        Schema::create('table_m_tax', function (Blueprint $table) {
            $table->id();
            $table->string('MTAX_CODE')->unique();
            $table->string('MTAX_TYPE');
            $table->float('MTAX_PERCENT');
            $table->datetime('MTAX_EFFDT');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('table_m_tax');
    }
};
