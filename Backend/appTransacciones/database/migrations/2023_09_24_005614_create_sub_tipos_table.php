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
        Schema::create('subTipos', function (Blueprint $table) {
            $table->bigIncrements('idSubTipo');
            $table->unsignedBigInteger('idTipo');
            $table->string('subTipo');
            $table->string('descripcion');
            $table->boolean('estado');

            $table->foreign('idTipo')->references('idTipo')->on('tipos')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subTipos');
    }
};
