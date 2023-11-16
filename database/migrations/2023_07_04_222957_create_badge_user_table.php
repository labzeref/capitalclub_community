<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('badge_user', function (Blueprint $table) {
            $table->foreignId('badge_id')
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->foreignId('user_id')
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('badge_user');
    }
};
