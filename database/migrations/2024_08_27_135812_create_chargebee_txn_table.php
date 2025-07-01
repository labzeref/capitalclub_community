<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('chargebee_txn', function (Blueprint $table) {
            $table->id();
            $table->string('txn_id')->unique();
            $table->string('customer_id')->nullable();
            $table->string('subscription_id')->nullable();
            $table->string('gateway_account_id')->nullable();
            $table->string('payment_source_id')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('gateway')->nullable();
            $table->string('type')->nullable();
            $table->string('date')->nullable();
            $table->double('amount')->nullable();
            $table->string('id_at_gateway')->nullable();
            $table->string('status')->nullable();
            $table->string('fraud_reason')->nullable();
            $table->string('deleted')->nullable();
            $table->string('masked_card_number')->nullable();
            $table->string('currency_code')->nullable();
            $table->string('base_currency_code')->nullable();
            $table->double('amount_unused')->nullable();
            $table->json('payload');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('chargebee_txn');
    }
};
