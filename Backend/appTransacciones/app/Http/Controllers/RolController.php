<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;

class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datos=Rol::orderBy('idRol', 'asc')->get();
        $num_rows = count($datos);
        if($num_rows != 0){
            return response()->json(['data'=>$datos, 'code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }    
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(rol $rol)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(rol $rol)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, rol $rol)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(rol $rol)
    {
        //
    }
}
