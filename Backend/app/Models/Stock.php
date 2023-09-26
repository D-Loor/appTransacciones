<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'stocks';
    protected $primaryKey = 'idStock';
    protected $fillable = [
        'idLocal', 'idProducto', 'stock'
    ];

    public function productoStock(){
        return $this->belongsTo('App\Models\Producto','idProducto');
    }

    public function localStock(){
        return $this->belongsTo('App\Models\Local','idLocal');
    }
}
