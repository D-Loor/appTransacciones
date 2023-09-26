<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datos=Producto::orderBy('nombre', 'asc')->with('categoriaProducto')->get();
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
        $valida=Producto::where('nombre', $request->nombre)->get()->first();
        if($valida != null){
            return response()->json(['code'=>'400']);
        }else{
            $datos=new Producto();
            $datos->idTipo=$request->idTipo;
            $datos->nombre=$request->nombre;
            $datos->descripcion=$request->descripcion;
            $datos->precio=$request->precio; 
            $datos->estado=$request->estado; 
            $datos->save();
            
            return response()->json(['code'=>'200']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Producto $producto)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producto $producto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idProducto)
    {
        $datos=Producto::where('idProducto',$idProducto)->get()->first();
        if($datos != null){
            if($datos->nombre == $request->nombre){
                $datos->idTipo=$request->idTipo;
                $datos->descripcion=$request->descripcion;
                $datos->precio=$request->precio;
                $datos->estado=$request->estado;          
                $datos->update();
                return response()->json(['code'=>'200']);
            }else{
                $valida=Producto::where('tipo', $request->tipo)->get()->first();
                if($valida != null){
                    return response()->json(['code'=>'400']);
                }else{
                    $datos->idTipo=$request->idTipo;
                    $datos->nombre=$request->nombre;
                    $datos->descripcion=$request->descripcion;
                    $datos->precio=$request->precio; 
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
    public function destroy($idProducto)
    {
        $datos=Producto::find($idProducto);  
        if($datos != null){
            $datos->delete();
            return response()->json(['code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }
    }
}
