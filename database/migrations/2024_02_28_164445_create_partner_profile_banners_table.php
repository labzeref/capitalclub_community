<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('partner_profile_banners', function (Blueprint $table) {
            $table->id();
            $table->foreignId('profile_id')
                ->constrained('partner_profiles')
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('vimeo_url')->nullable();
            $table->boolean('is_vimeo')->default(false);
            $table->integer('order');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partner_profile_banners');
    }
};
