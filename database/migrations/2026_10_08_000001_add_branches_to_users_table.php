<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Adds the list of branches a user is allowed to work in.
 *
 * `users.branch` remains the user's default branch and is still the fallback
 * whenever `branches` is empty, so existing accounts keep working unchanged.
 * A user with several codes may switch between them from the header selector.
 */
return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('branches', 255)->nullable()->after('branch');
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('branches');
        });
    }
};
