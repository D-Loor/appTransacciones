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
use App\Http\Controllers\StockController;

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
Route::resource('stocks', StockController::class);


Route::get('usuarios/login/{cedula}/{clave}','App\Http\Controllers\UsuarioController@login');
Route::get('tipos/obtenerTiposPorCategoria/{idCategoria}','App\Http\Controllers\TipoController@obtenerTiposPorCategoria');
Route::get('productos/obtenerProductosPorTipo/{idTipo}','App\Http\Controllers\ProductoController@obtenerProductosPorTipo');

Route::get('roles/estado/{estado}/{paginado}', 'App\Http\Controllers\RolController@index');
Route::get('usuarios/estado/{estado}/{paginado}', 'App\Http\Controllers\UsuarioController@index');
Route::get('categorias/estado/{estado}', 'App\Http\Controllers\CategoriaController@index');
Route::get('tipos/estado/{estado}', 'App\Http\Controllers\TipoController@index');
Route::get('productos/estado/{estado}', 'App\Http\Controllers\ProductoController@index');
Route::get('locales/estado/{estado}', 'App\Http\Controllers\LocalController@index');

