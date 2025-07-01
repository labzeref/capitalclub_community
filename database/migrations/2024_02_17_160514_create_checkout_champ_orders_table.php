<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('checkout_champ_orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->restrictOnDelete();
            $table->string('checkout_champ_id');
            $table->foreignId('product_id')->nullable();
            $table->foreignId('card_id')->nullable();
            $table->datetime('start_at');
            $table->datetime('end_at');
            $table->decimal('amount');
            $table->string('status');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('checkout_champ_orders');
    }
};
