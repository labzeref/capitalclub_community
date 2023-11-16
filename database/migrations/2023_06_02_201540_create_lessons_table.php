<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lessons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->foreignId('module_id')
                ->nullable()
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->string('title');
            $table->string('description', 500)->nullable();
            $table->string('vimeo_url')->nullable();
            $table->string('vimeo_preview_url')->nullable();
            $table->unsignedBigInteger('duration')->nullable();
            $table->date('published_at')->nullable();
            $table->date('dripped_at')->nullable();
            $table->time('preview_start_time')->nullable();
            $table->time('preview_end_time')->nullable();
            $table->smallInteger('passing_marks_percentage')->nullable();
            $table->boolean('quiz_skipable')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lessons');
    }
};
