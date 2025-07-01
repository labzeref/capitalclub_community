<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::dropIfExists('single_live_streams');
    }

    public function down(): void
    {
        Schema::create('single_live_streams', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('uuid')->index();
            $table->string('restream_link');
            $table->softDeletes();
            $table->timestamps();
        });
    }
};
