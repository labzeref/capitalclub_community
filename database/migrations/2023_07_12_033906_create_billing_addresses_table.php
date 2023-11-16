<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('billing_addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('phone_number', 20)->nullable();
            $table->string('street_address')->nullable();
            $table->string('city', 40)->nullable();
            $table->string('zip_code')->nullable();
            $table->string('country_iso', 5)->nullable();
            $table->string('state', 40)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('billing_addresses');
    }
};
