<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('partner_profiles', function (Blueprint $table) {
            $table->string('title')->nullable()->change();
            $table->text('cc_benefits')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('partner_profiles', function (Blueprint $table) {
            //
        });
    }
};
