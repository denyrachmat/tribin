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
        Schema::create('T_DLVSJDETA', function (Blueprint $table) {
            $table->id();
            $table->string('TDLVSJDETA_DLVCD');
            $table->string('TDLVSJDETA_TYPE');
            $table->string('TDLVSJDETA_CONDGRP');
            $table->datetime('TDLVSJDETA_STARTDT');
            $table->datetime('TDLVSJDETA_ENDDT');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('T_DLVSJDETA');
    }
};
