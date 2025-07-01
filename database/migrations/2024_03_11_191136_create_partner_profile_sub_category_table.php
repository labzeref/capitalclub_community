<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('partner_profile_sub_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')
                ->constrained('partner_profiles')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('category_id')
                ->constrained('market_place_categories')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partner_profile_sub_category');
    }
};
