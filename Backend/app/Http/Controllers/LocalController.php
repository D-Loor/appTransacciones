<?php

namespace App\Http\Controllers;

use App\Models\Local;
use Illuminate\Http\Request;

class LocalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datos=Local::orderBy('nombre', 'asc')->get();
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
        $valida=Local::where('nombre', $request->nombre)->get()->first();
        if($valida != null){
            return response()->json(['code'=>'400']);
        }else{
            $datos=new Local();
            $datos->nombre=$request->nombre;
            $datos->descripcion=$request->descripcion;
            $datos->estado=$request->estado;
            $datos->save();
            
            return response()->json(['code'=>'200']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Local $local)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Local $local)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idLocal)
    {
        $datos=Local::where('idLocal',$idLocal)->get()->first();
        if($datos != null){
            if($datos->nombre == $request->nombre){
                $datos->descripcion=$request->descripcion;
                $datos->estado=$request->estado;          
                $datos->update();
                return response()->json(['code'=>'200']);
            }else{
                $valida=Local::where('nombre', $request->nombre)->get()->first();
                if($valida != null){
                    return response()->json(['code'=>'400']);
                }else{
                    $datos->nombre=$request->nombre;
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
    public function destroy($idLocal)
    {
        $datos=Local::find($idLocal);  
        if($datos != null){
            $datos->delete();
            return response()->json(['code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }
    }
}
