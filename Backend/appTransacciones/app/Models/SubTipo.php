<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubTipo extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'subTipos';
    protected $primaryKey = 'idSubTipo';
    protected $fillable = [
        'idTipo', 'subTipo', 'descripcion', 'estado'
    ];

    public function tipoSubTipo(){
        return $this->belongsTo('App\Models\Tipo','idTipo');
    }
}
