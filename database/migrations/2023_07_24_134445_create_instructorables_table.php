<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instructorables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('instructor_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->morphs('instructorable');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instructorables');
    }
};
