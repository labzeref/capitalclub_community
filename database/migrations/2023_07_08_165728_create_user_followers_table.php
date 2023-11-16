<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('user_followers', function (Blueprint $table) {
            $table->foreignId('follower_id')
                ->references('id')
                ->on('users')
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->foreignId('followed_id')
                ->references('id')
                ->on('users')
                ->restrictOnUpdate()
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('user_followers');
    }
};
