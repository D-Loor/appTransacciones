<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('roles')->insert([
        [
            'rol' => 'Administrador',
            'acceso' => '1',
            'descripcion' => 'Rol principal del sistema.',
            'estado' => '1',            
        ],
        [
            'rol' => 'Gerente',
            'acceso' => '2',
            'descripcion' => 'Rol encargado de la venta de los productos.',
            'estado' => '1',            
        ],
        [
            'rol' => 'Encargado de Ventas',
            'acceso' => '3',
            'descripcion' => 'Rol encargado de la venta de los productos.',
            'estado' => '1',            
        ],
        [
            'rol' => 'Inspector de Ventas',
            'acceso' => '4',
            'descripcion' => 'Rol encargado de supervisar el stock de los productos.',
            'estado' => '1',            
        ]]);

        DB::table('usuarios')->insert([
            [
                'idRol' => '2',
                'nombres' => 'Rolando',
                'apellidos' => 'Morán Chávez',
                'cedula' => '1',
                'password' => '123',
                'estado' => '1',               
            ],
            [
                'idRol' => '1',
                'nombres' => 'Aaron',
                'apellidos' => 'Loor Morán',
                'cedula' => '2',
                'password' => '123',
                'estado' => '1',             
            ],
            [
                'idRol' => '1',
                'nombres' => 'Diego',
                'apellidos' => 'Loor Morán',
                'cedula' => '3',
                'password' => '123',
                'estado' => '1',           
            ],
            [
                'idRol' => '3',
                'nombres' => 'Toño',
                'apellidos' => 'Morán Chávez',
                'cedula' => '4',
                'password' => '123',
                'estado' => '1',           
            ]
        ]);

        DB::table('locales')->insert([
            'nombre' => 'Puerto López',
            'descripcion' => 'Local principal.',
            'estado' => '1',            
        ]);

        DB::table('categorias')->insert([
            [
                'categoria' => 'Frutas',
                'descripcion' => 'Frutos comestibles.',
                'estado' => '1',            
            ],
            [
                'categoria' => 'Madera',
                'descripcion' => 'Material del tronco de un árbol.',
                'estado' => '1',            
            ]
        ]);
    
    }
}
