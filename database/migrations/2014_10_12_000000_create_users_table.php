<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

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
            $table->string('discord_id')->nullable();
            $table->string('discord_username')->nullable();
            $table->string('discord_email')->nullable();
            $table->string('discord_avatar')->nullable();
            $table->string('discord_code')->nullable();
            $table->string('discord_access_token')->nullable();
            $table->string('discord_refresh_token')->nullable();
            $table->dateTime('discord_access_token_expiry')->nullable();
            $table->string('discord_scope')->nullable();
            $table->json('discord_roles')->nullable();
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
            $table->string('business_owner')->nullable();
            $table->string('annual_revenue')->nullable();
            $table->boolean('profile_completed')->default(false);
            $table->boolean('discord_integrated')->default(false);
            $table->rememberToken();
            $table->softDeletes();
            $table->timestamps();
        });

        DB::statement("ALTER SEQUENCE users_id_seq RESTART WITH 1000");
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
