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
        Schema::create('M_TAX', function (Blueprint $table) {
            $table->id();
            $table->string('MTAX_CODE')->unique();
            $table->string('MTAX_TYPE')->nullable();
            $table->float('MTAX_PERCENT');
            $table->datetime('MTAX_EFFDT');
            $table->float('MTAX_TAXMIN')->nullable();
            $table->float('MTAX_TAXMAX')->default(999999999999);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('M_TAX');
    }
};
