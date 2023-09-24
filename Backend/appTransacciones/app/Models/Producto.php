<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'productos';
    protected $primaryKey = 'idProducto';
    protected $fillable = [
        'idTipo', 'nombre', 'descripcion', 'precio', 'estado'
    ];

    public function tipoProducto(){
        return $this->belongsTo('App\Models\Tipo','idTipo');
    }
}
