<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('live_streams', function (Blueprint $table) {
            $table->id();
            $table->foreignId('live_series_id')
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->string('sub_title')->nullable();
            $table->string('embed_url', 500)->nullable();
            $table->string('video_url', 500)->nullable();
            $table->timestampTz('live_at')->nullable();
            $table->timestampTz('live_end_at')->nullable();
            $table->boolean('bannered')->default(false);
            $table->boolean('published')->default(false);
            $table->boolean('chat_enabled')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('live_streams');
    }
};
