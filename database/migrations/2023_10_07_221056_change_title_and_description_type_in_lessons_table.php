<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->text('title')->nullable()->change();
            $table->text('description')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->string('title')->nullable()->change();
            $table->string('description', 500)->nullable()->change();
        });
    }
};
