<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('premium_users', function (Blueprint $table) {
            $table->bigInteger('glitch_id')->nullable()->change();
            $table->string('promo_code')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('premium_users', function (Blueprint $table) {
            $table->bigInteger('glitch_id')->change();
            $table->string('promo_code')->change();
        });
    }
};
