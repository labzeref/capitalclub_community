<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('course_enrollment', function (Blueprint $table) {
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->foreignId('course_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->smallInteger('progress');
            $table->boolean('completed')->default(false);
            $table->date('enrolled_at')->useCurrent();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('course_enrollment');
    }
};
