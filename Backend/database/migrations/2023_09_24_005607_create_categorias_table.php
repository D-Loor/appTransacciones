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
        Schema::create('categorias', function (Blueprint $table) {
            $table->bigIncrements('idCategoria');
            $table->unsignedBigInteger('idTipoCategoria');
            $table->string('categoria');
            $table->string('descripcion');
            $table->boolean('estado');

            $table->foreign('idTipoCategoria')->references('idTipoCategoria')->on('tiposCategorias')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categorias');
    }
};
