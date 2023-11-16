<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('subscriptions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->cascadeOnDelete();
            $table->string('item_price_id');
            $table->string('charge_bee_id');
            $table->string('period_unit');
            $table->dateTime('current_term_start');
            $table->dateTime('current_term_end');
            $table->dateTime('next_billing_at');
            $table->dateTime('started_at');
            $table->dateTime('activated_at');
            $table->string('currency_code');
            $table->integer('amount');
            $table->string('last4');
            $table->string('brand');
            $table->string('masked_number');
            $table->string('status');
            $table->boolean('verified_by_webhook')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('subscriptions');
    }
};
