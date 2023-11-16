<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('title', 1500);
            $table->string('type');
            $table->boolean('published');
            $table->date('published_at')->nullable();
            $table->timestamp('schedule_at')->nullable();
            $table->string('poll_duration_name')->nullable();
            $table->date('poll_duration_date')->nullable();
            $table->tinyInteger('status');
            $table->boolean('reported')->nullable();
            $table->date('reported_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
