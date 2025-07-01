<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('live_streams', function (Blueprint $table) {
            $table->renameColumn('sub_title', 'title');
            $table->dropColumn(['live_series_id', 'chat_enabled']);
            $table->foreignId('instructor_id')
                ->nullable()
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->text('description')->nullable();
            $table->string('guests')->nullable();
            $table->timestamp('live_at')->change();
            $table->timestamp('live_end_at')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('live_streams', function (Blueprint $table) {
            $table->renameColumn('title', 'sub_title');
            $table->foreignId('live_series_id')
                ->constrained()
                ->restrictOnUpdate()
                ->restrictOnDelete();
            $table->boolean('chat_enabled')->default(false);
            $table->dropColumn(['instructor_id', 'description', 'guests']);
        });
    }
};
