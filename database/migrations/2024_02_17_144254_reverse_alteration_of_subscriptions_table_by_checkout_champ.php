<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->dropColumn(['checkout_champ_purchase_id', 'checkout_champ_order_id']);
        });
    }

    public function down(): void
    {
        Schema::table('subscriptions', function (Blueprint $table) {
            $table->string('checkout_champ_purchase_id')->nullable();
            $table->string('checkout_champ_order_id')->nullable();
        });
    }
};
