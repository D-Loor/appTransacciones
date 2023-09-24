<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'stock';
    protected $primaryKey = 'idStock';
    protected $fillable = [
        'idProducto', 'cantidad'
    ];

    public function productoStock(){
        return $this->belongsTo('App\Models\Producto','idProducto');
    }
}
