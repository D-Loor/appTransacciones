<?php

namespace App\Http\Controllers;

use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($paginado)
    {
        $datos=Stock::orderBy('stock', 'asc')->with('productoStock', 'productoStock.tipoProducto', 'localStock')->paginate($paginado);
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
        $datos=new Stock();
        $datos->idLocal=$request->idLocal;
        $datos->idProducto=$request->idProducto;
        $datos->stock=$request->stock;
        $datos->save();
        
        return response()->json(['code'=>'200']);
    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $datos=Stock::where('idLocal',$request->idLocal)->where('idProducto',$request->idProducto)->get()->first();
        if($datos != null){
            $datos->stock=$request->stock;
            $datos->update();
            return response()->json(['code'=>'200']);
        }else {
            return response()->json(['code'=>'400']);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
