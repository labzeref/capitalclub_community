<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('invitations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('invitation_file_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('email')->index();
            $table->string('code')->index();
            $table->dateTime('start_at');
            $table->dateTime('end_at');
            $table->timestamps();

            $table->index(['email', 'code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('invitations');
    }
};
