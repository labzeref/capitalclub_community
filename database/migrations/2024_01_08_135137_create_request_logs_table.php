<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('request_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->index();
            $table->string('ip')->nullable();
            $table->string('country')->nullable();
            $table->string('city')->nullable();
            $table->string('zip')->nullable();
            $table->string('device')->nullable();
            $table->string('uri')->nullable()->index();
            $table->timestamps();

            $table->index(['user_id', 'uri']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('request_logs');
    }
};
