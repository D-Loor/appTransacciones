<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaccion extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'transacciones';
    protected $primaryKey = 'idTransaccion';
    protected $fillable = [
        'idUsuario', 'idProducto', 'idLocal', 'idCategoria', 'cantidad', 'valor', 'observacion', 'fecha'
    ];

    public function usuarioTransaccion(){
        return $this->belongsTo('App\Models\Usuario','idUsuario');
    }

    public function productoTransaccion(){
        return $this->belongsTo('App\Models\Producto','idProducto');
    }

    public function localTransaccion(){
        return $this->belongsTo('App\Models\Local','idLocal');
    }

    public function categoriaTransaccion(){
        return $this->belongsTo('App\Models\Categorias','idCategoria');
    }
}
