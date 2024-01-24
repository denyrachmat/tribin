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
        Schema::table('T_SLODETA', function (Blueprint $table) {
            $table->string('TSLODETA_BRANCH', 3)->after('TSLODETA_SLOCD');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('T_SLODETA', function (Blueprint $table) {
            //
        });
    }
};
