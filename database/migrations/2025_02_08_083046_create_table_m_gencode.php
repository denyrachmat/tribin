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
        Schema::create('M_GENCODE', function (Blueprint $table) {
            $table->id();
            $table->string('MGECD_CODE');
            $table->string('MGECD_VALUE');
            $table->string('MGECD_DESC')->nullable();
            $table->boolean('MGECD_ACTIVE')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('M_GENCODE');
    }
};
