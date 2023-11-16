<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('premium_users', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('glitch_id');
            $table->string('email')->unique();
            $table->string('promo_code');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('premium_users');
    }
};
