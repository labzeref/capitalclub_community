<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')
                ->nullable()
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->foreignId('default_instructor_id')
                ->nullable()
                ->references('id')
                ->on('instructors')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->string('title');
            $table->string('summery', 500)->nullable();
            $table->unsignedBigInteger('duration')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('strict')->default(false);
            $table->decimal('avg_rating')->default(false);
            $table->date('published_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('courses');
    }
};
