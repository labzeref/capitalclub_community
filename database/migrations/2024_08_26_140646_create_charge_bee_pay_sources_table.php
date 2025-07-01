<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('charge_bee_pay_sources', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable();
            $table->string('customer_id');
            $table->string('reference_id');
            $table->string('paysource_id');
            $table->string('expiry_month');
            $table->string('expiry_year');
            $table->string('last4');
            $table->string('gateway');
            $table->string('gateway_account_id');
            $table->json('payload');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('charge_bee_pay_sources');
    }
};
