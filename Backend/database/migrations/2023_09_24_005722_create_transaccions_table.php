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
        Schema::create('transacciones', function (Blueprint $table) {
            $table->bigIncrements('idTransaccion');
            $table->unsignedBigInteger('idUsuario');
            $table->unsignedBigInteger('idProducto');
            $table->unsignedBigInteger('idLocal');
            $table->string('tipo');
            $table->integer('cantidad');
            $table->double('valor');
            $table->string('observacion');
            $table->timestamp('fecha');

            $table->foreign('idUsuario')->references('idUsuario')->on('usuarios')->onDelete('restrict');
            $table->foreign('idProducto')->references('idProducto')->on('productos')->onDelete('restrict');
            $table->foreign('idLocal')->references('idLocal')->on('locales')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transacciones');
    }
};
