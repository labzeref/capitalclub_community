<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('chunks', function (Blueprint $table) {
            $table->id();
            $table->string('key');
            $table->string('extension')->nullable();
            $table->boolean('singular')->default(false);
            $table->boolean('combined')->default(false);
            $table->string('combined_filename')->nullable();
            $table->timestamps();

            $table->index('key');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chunks');
    }
};
