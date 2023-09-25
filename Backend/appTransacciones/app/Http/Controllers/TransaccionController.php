<?php

namespace App\Http\Controllers;

use App\Models\Transaccion;
use Illuminate\Http\Request;

class TransaccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $datos=Transaccion::orderBy('fecha', 'asc')->with('usuarioTransaccion', 'productoTransaccion', 'localTransaccion', 'categoriaTransaccion')->get();
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
        $datos=new Transaccion();
        $datos->idUsuario=$request->idUsuario;
        $datos->idProducto=$request->idProducto;
        $datos->idLocal=$request->idLocal;
        $datos->idCategoria=$request->idCategoria;
        $datos->cantidad=$request->cantidad;
        $datos->valor=$request->valor;
        $datos->observacion=$request->observacion;
        $datos->fecha=$request->fecha;
        $datos->save();
        return response()->json(['code'=>'200']);        
    }

    /**
     * Display the specified resource.
     */
    public function show(Transaccion $transaccion)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Transaccion $transaccion)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idTransaccion)
    {
        $datos=Transaccion::where('idTransaccion', $idTransaccion)->get()->first();
        if($datos != null){
            $datos->idUsuario=$request->idUsuario;
            $datos->idProducto=$request->idProducto;
            $datos->idLocal=$request->idLocal;
            $datos->idCategoria=$request->idCategoria;
            $datos->cantidad=$request->cantidad;
            $datos->valor=$request->valor;
            $datos->observacion=$request->observacion;
            $datos->fecha=$request->fecha;
            $datos->update();
            return response()->json(['code'=>'200']);
        }else {
            return response()->json(['code'=>'400']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($idTransaccion)
    {
        $datos=Transaccion::find($idTransaccion);  
        if($datos != null){
            $datos->delete();
            return response()->json(['code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }
    }
}
