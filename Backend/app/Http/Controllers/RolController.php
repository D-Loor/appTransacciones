<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Pagination\Paginator;
use Illuminate\Database\Eloquent\Builder;


class RolController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($estado, $paginado)
    {
        
        if ($estado == "*") {
            $datos = Rol::orderBy('idRol', 'asc')->paginate($paginado);
        } else {
            $datos = Rol::orderBy('idRol', 'asc')->where('estado', $estado)->paginate($paginado);
        }

        if ($datos->count() != 0) {
            return response()->json(['code' => '200', 'data' => $datos]);
        } else {
            return response()->json(['code' => '204']);
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
        $valida=Rol::where('rol', $request->rol)->get()->first();
        if($valida != null){
            return response()->json(['code'=>'400']);
        }else{
            $datos=new Rol();
            $datos->rol=$request->rol;
            $datos->acceso=$request->acceso;
            $datos->descripcion=$request->descripcion;
            $datos->estado=$request->estado;
            $datos->save();
            
            return response()->json(['code'=>'200']);
        }
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
    public function update(Request $request, $idRol)
    {
        $datos=Rol::where('idRol',$idRol)->get()->first();
        if($datos != null){
            if($datos->rol == $request->rol){
                $datos->acceso=$request->acceso;
                $datos->descripcion=$request->descripcion;
                $datos->estado=$request->estado;            
                $datos->update();
                return response()->json(['code'=>'200']);
            }else{
                $valida=Rol::where('rol', $request->rol)->get()->first();
                if($valida != null){
                    return response()->json(['code'=>'400']);
                }else{
                    $datos->rol=$request->rol;
                    $datos->acceso=$request->acceso;
                    $datos->descripcion=$request->descripcion;
                    $datos->estado=$request->estado;   
                    $datos->update();
                    return response()->json(['code'=>'200']);
                }    
            }
        }else {
            return response()->json(['code'=>'400']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idRol)
    {
        $datos=Rol::find($idRol);  
        if($datos != null){
            $datos->delete();
            return response()->json(['code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }
    }
}
