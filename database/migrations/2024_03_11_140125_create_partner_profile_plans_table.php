<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('partner_profile_plans', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')
                ->constrained('partner_profiles')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('name');
            $table->string('url');
            $table->decimal('offer_price');
            $table->decimal('real_price');
            $table->json('features');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partner_profile_plans');
    }
};
