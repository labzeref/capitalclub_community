<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('checkout_champ_products', function (Blueprint $table) {
            $table->id();
            $table->string('checkout_champ_id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->decimal('cost');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('checkout_champ_products');
    }
};
