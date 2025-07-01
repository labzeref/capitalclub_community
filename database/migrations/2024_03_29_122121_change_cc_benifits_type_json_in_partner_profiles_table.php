<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('partner_profiles', function (Blueprint $table) {
//            DB::statement('ALTER TABLE partner_profiles ALTER COLUMN cc_benefits TYPE json USING cc_benefits::json');
        });
    }

    public function down(): void
    {
        Schema::table('partner_profiles', function (Blueprint $table) {
//            $table->text('cc_benefits')->nullable()->change();
        });
    }
};
