<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stream_messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('live_stream_id')
                ->nullable()
                ->constrained('live_streams')
                ->onDelete('cascade');

            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('value', 1500);
            $table->timestamp('send_at');
            $table->foreignId('mentioned_message_id')->nullable()->constrained('stream_messages')->onDelete('cascade');
            $table->boolean('reported')->nullable();
            $table->date('reported_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stream_messages');
    }
};
