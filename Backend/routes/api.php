<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RolController;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\TipoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\TransaccionController;
use App\Http\Controllers\LocalController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('roles', RolController::class);
Route::resource('usuarios', UsuarioController::class);
Route::resource('categorias', CategoriaController::class);
Route::resource('tipos', TipoController::class);
Route::resource('productos', ProductoController::class);
Route::resource('locales', LocalController::class);
Route::resource('transacciones', TransaccionController::class);


Route::get('login/{cedula}/{clave}','App\Http\Controllers\UsuarioController@Login');