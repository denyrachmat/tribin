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
        Schema::create('M_DISC', function (Blueprint $table) {
            $table->id();
            $table->string('MDISC_CODE')->unique();
            $table->string('MDISC_DESC')->nullable();
            $table->float('MDISC_PERCENT')->nullable();
            $table->float('MDISC_AMT')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('M_DISC');
    }
};
