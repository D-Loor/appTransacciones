<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tipo extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'tipos';
    protected $primaryKey = 'idTipo';
    protected $fillable = [
        'idCategoria', 'tipo', 'descripcion', 'estado'
    ];

    public function tipoCategoria(){
        return $this->belongsTo('App\Models\Categoria','idCategoria');
    }
}
