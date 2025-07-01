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
            $table->boolean('verified_by_nmi')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('charge_bee_customers', function (Blueprint $table) {
            $table->dropColumn('verified_by_nmi');
        });
    }
};
