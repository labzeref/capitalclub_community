<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('lesson_enrollment', function (Blueprint $table) {
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('course_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('lesson_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->boolean('completed');
            $table->decimal('progress', 5);
            $table->boolean('quiz_skipped')->default(false);
            $table->smallInteger('quiz_marks_percentage')->nullable();
            $table->date('enrolled_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lesson_enrollment');
    }
};
