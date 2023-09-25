<?php

namespace App\Http\Controllers;

use App\Models\TiposCategoria;
use Illuminate\Http\Request;

class TiposCategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datos=TiposCategoria::orderBy('tipo', 'asc')->get();
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
        $valida=TiposCategoria::where('tipo', $request->tipo)->get()->first();
        if($valida != null){
            return response()->json(['code'=>'400']);
        }else{
            $datos=new TiposCategoria();
            $datos->tipo=$request->tipo;
            $datos->descripcion=$request->descripcion;
            $datos->estado=$request->estado; 
            $datos->save();
            
            return response()->json(['code'=>'200']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(TiposCategoria $tipoCategoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TiposCategoria $tipoCategoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idTipoCategoria)
    {
        $datos=TiposCategoria::where('idTipoCategoria',$idTipoCategoria)->get()->first();
        if($datos != null){
            if($datos->tipo == $request->tipo){
                $datos->descripcion=$request->descripcion;
                $datos->estado=$request->estado;          
                $datos->update();
                return response()->json(['code'=>'200']);
            }else{
                $valida=TiposCategoria::where('tipo', $request->tipo)->get()->first();
                if($valida != null){
                    return response()->json(['code'=>'400']);
                }else{
                    $datos->tipo=$request->tipo;
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
    public function destroy($idTipoCategoria)
    {
        $datos=TiposCategoria::find($idTipoCategoria);  
        if($datos != null){
            $datos->delete();
            return response()->json(['code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }
    }
}
