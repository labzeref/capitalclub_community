<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('lesson_enrollment', function (Blueprint $table) {
            $table->dropColumn('progress');
        });
    }

    public function down(): void
    {
        Schema::table('lesson_enrollment', function (Blueprint $table) {
            $table->decimal('progress')->nullable()->after('completed');
        });
    }
};
