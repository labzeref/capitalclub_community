<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('cb_to_coc_migration_stripe_non_order_customers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('checkout_champ_customer_id');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cb_to_coc_migration_stripe_non_order_customers');
    }
};
