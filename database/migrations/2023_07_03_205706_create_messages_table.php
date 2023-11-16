<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_participant_id')
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->foreignId('user_id')
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->foreignId('conversation_id')
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->string('value', 1500);
            $table->boolean('seen')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
