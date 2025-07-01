<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('checkout_champ_cards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->boolean('is_primary');
            $table->string('pay_source_id');
            $table->string('type');
            $table->string('last_4');
            $table->string('year');
            $table->string('month');
            $table->date('expiry_date');
            $table->string('ach_routing_number')->nullable();
            $table->string('ach_account_type')->nullable();
            $table->string('ach_bank_name')->nullable();
            $table->string('ach_last_4')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('checkout_champ_cards');
    }
};
