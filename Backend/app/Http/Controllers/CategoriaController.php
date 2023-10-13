<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($estado, $paginado)
    {
        if($estado == "*"){
            $datos=Categoria::orderBy('categoria', 'asc')->paginate($paginado);
        }else{
            $datos=Categoria::orderBy('categoria', 'asc')->where('estado', $estado)->paginate($paginado);
        }
        
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
        $valida=Categoria::where('categoria', $request->categoria)->get()->first();
        if($valida != null){
            return response()->json(['code'=>'400']);
        }else{
            $datos=new Categoria();
            $datos->categoria=$request->categoria;
            $datos->descripcion=$request->descripcion;
            $datos->estado=$request->estado;
            $datos->save();
            
            return response()->json(['code'=>'200']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Categoria $categoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idCategoria)
    {
        $datos=Categoria::where('idCategoria',$idCategoria)->get()->first();
        if($datos != null){
            if($datos->categoria == $request->categoria){
                $datos->descripcion=$request->descripcion;
                $datos->estado=$request->estado;          
                $datos->update();
                return response()->json(['code'=>'200']);
            }else{
                $valida=Categoria::where('categoria', $request->categoria)->get()->first();
                if($valida != null){
                    return response()->json(['code'=>'400']);
                }else{
                    $datos->categoria=$request->categoria;
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
    public function destroy($idCategoria)
    {
        $datos=Categoria::find($idCategoria);  
        if($datos != null){
            $datos->delete();
            return response()->json(['code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }
    }
}
