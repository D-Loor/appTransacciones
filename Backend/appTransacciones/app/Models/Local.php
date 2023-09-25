<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Local extends Model
{
    use HasFactory;
    public $timestamps=false;
    protected $table = 'locales';
    protected $primaryKey = 'idLocal';
    protected $fillable = [
        'nombre', 'descripcion', 'estado'
    ];
}
