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
        Schema::create('stocks', function (Blueprint $table) {
            $table->bigIncrements('idStock');
            $table->unsignedBigInteger('idLocal');
            $table->unsignedBigInteger('idProducto');
            $table->integer('stock');

            $table->foreign('idLocal')->references('idLocal')->on('locales')->onDelete('restrict');
            $table->foreign('idProducto')->references('idProducto')->on('productos')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stocks');
    }
};
