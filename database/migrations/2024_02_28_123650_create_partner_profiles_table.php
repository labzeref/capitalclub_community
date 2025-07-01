<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('partner_profiles', function (Blueprint $table) {
            $table->id();
            $table->string('short_description');
            $table->text('long_description')->nullable();
            $table->string('promo_line');
            $table->string('promo_code')->nullable();
            $table->text('website_link')->nullable();
            $table->text('instructions')->nullable();
            $table->text('instructions_note')->nullable();
            $table->boolean('featured')->default(false);
            $table->date('published_at')->nullable();
            $table->json('plans')->nullable();
            $table->boolean('is_trust_pilot')->default(false);
            $table->text('trust_pilot_link')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('partner_profiles');
    }
};
