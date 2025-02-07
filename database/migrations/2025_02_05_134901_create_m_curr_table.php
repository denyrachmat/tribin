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
        Schema::connection('')->create('m_curr', function (Blueprint $table) {
            $table->id();
            $table->string('MCUR_CURCD');
            $table->string('MCUR_CURDESC');
            $table->boolean('MCUR_ACTIVE')->default(0);
            $table->datetime('MCUR_VALIDFR');
            $table->datetime('MCUR_VALIDTO');
            $table->float('MCUR_EXRATE');
            $table->boolean('MCUR_DEFAULT')->default(0);
            $table->string('created_by');
            $table->datetime('deleted_at');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::connection('')->dropIfExists('m_curr');
    }
};
