<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TiposCategoria extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'tiposCategorias';
    protected $primaryKey = 'idTipoCategoria';
    protected $fillable = [
        'tipo', 'descripcion', 'estado'
    ];
}
