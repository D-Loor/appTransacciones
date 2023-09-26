<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'usuarios';
    protected $primaryKey = 'idUsuario';
    protected $fillable = [
        'idRol', 'nombres', 'apellidos', 'cedula', 'password', 'estado'
    ];

    public function rolUsuario(){
        return $this->belongsTo('App\Models\Rol','idRol');
    }
}
