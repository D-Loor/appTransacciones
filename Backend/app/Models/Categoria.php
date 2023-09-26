<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'categorias';
    protected $primaryKey = 'idCategoria';
    protected $fillable = [
        'idTipoCategoria', 'categoria', 'descripcion', 'estado'
    ];

    public function tipoCategoria(){
        return $this->belongsTo('App\Models\TiposCategoria','idTipoCategoria');
    }
}
