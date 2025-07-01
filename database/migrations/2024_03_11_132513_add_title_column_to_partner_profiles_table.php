<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('partner_profiles', function (Blueprint $table) {
            $table->string('title')->default('No Title');
        });
    }

    public function down(): void
    {
        Schema::table('partner_profiles', function (Blueprint $table) {
            $table->dropColumn('title');
        });
    }
};
