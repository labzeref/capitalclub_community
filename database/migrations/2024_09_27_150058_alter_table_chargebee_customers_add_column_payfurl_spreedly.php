<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('charge_bee_customers', function (Blueprint $table) {
            $table->text('spreedly_nmi_customer_vault_id')->nullable();
            $table->text('payfurl_nmi_customer_vault_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('charge_bee_customers', function (Blueprint $table) {
            $table->dropColumn('spreedly_nmi_customer_vault_id');
            $table->dropColumn('payfurl_nmi_customer_vault_id');
        });
    }
};
