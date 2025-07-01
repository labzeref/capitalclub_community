<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::dropIfExists('live_series');
    }

    public function down(): void
    {
        Schema::create('live_series', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description', 500);
            $table->foreignId('default_instructor_id')
                ->nullable()
                ->references('id')
                ->on('instructors')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->softDeletes();
            $table->timestamps();
        });
    }
};
