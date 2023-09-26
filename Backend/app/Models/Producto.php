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
        'idCategoria', 'nombre', 'descripcion', 'precio', 'estado'
    ];

    public function categoriaProducto(){
        return $this->belongsTo('App\Models\Categorias','idCategoria');
    }
}
