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
        Schema::table('T_DLVORDHEAD', function (Blueprint $table) {
            $table->string('TDLVORD_INVCD', 40)->nullable();
            $table->string('updated_by', 16)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('T_DLVORDHEAD', function (Blueprint $table) {
            //
        });
    }
};
