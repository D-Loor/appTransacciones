<?php

namespace App\Http\Controllers;

use App\Models\Tipo;
use Illuminate\Http\Request;

class tipoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datos=Tipo::orderBy('tipo', 'asc')->with('tipoCategoria')->get();
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
        $valida=Tipo::where('tipo', $request->tipo)->get()->first();
        if($valida != null){
            return response()->json(['code'=>'400']);
        }else{
            $datos=new Tipo();
            $datos->idCategoria=$request->idCategoria;
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
    public function show(Tipo $tipoCategoria)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tipo $tipoCategoria)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idTipo)
    {
        $datos=Tipo::where('idTipo',$idTipo)->get()->first();
        if($datos != null){
            if($datos->tipo == $request->tipo){
                $datos->idCategoria=$request->idCategoria;
                $datos->descripcion=$request->descripcion;
                $datos->estado=$request->estado;          
                $datos->update();
                return response()->json(['code'=>'200']);
            }else{
                $valida=Tipo::where('tipo', $request->tipo)->get()->first();
                if($valida != null){
                    return response()->json(['code'=>'400']);
                }else{
                    $datos->idCategoria=$request->idCategoria;
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
    public function destroy($idTipo)
    {
        $datos=Tipo::find($idTipo);  
        if($datos != null){
            $datos->delete();
            return response()->json(['code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }
    }
}
