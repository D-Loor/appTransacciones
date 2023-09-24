<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Local extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'stock';
    protected $primaryKey = 'idStock';
    protected $fillable = [
        'nombre', 'descripcion', 'estado'
    ];
}
