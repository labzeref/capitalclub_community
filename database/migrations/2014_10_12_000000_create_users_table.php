<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('country_iso', 5);
            $table->foreign('country_iso')
                ->references('iso')
                ->on('countries')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->string('first_name', 60);
            $table->string('last_name', 60);
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('about', 500)->nullable();
            $table->tinyInteger('status')->default(\App\Enums\UserStatusEnum::Active->value);
            $table->string('charge_bee_id')->nullable();
            $table->boolean('verified_by_webhook')->default(false);
            $table->boolean('subscribed')->default(false);
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
