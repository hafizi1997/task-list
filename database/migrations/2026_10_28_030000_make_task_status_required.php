<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $open = DB::table('statuses')->where('slug', 'open')->value('id');
        if ($open) DB::table('tasks')->whereNull('status_id')->update(['status_id' => $open]);
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['status_id']);
            $table->unsignedBigInteger('status_id')->nullable(false)->change();
            $table->foreign('status_id')->references('id')->on('statuses')->restrictOnDelete();
        });
    }
    public function down(): void
    {
        Schema::table('tasks', function (Blueprint $table) {
            $table->dropForeign(['status_id']);
            $table->unsignedBigInteger('status_id')->nullable()->change();
            $table->foreign('status_id')->references('id')->on('statuses')->nullOnDelete();
        });
    }
};
