<?php

namespace App\Http\Controllers;

use App\Models\Transaccion;
use App\Models\Local;
use App\Models\Stock;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TransaccionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($paginado)
    {
        $datos=Transaccion::orderBy('fecha', 'asc')->with('usuarioTransaccion', 'productoTransaccion', 'productoTransaccion.tipoProducto', 'localTransaccion')->paginate($paginado);
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
        $stock=Stock::where('idLocal',$request->idLocal)->where('idProducto',$request->idProducto)->get()->first();

        if($stock != null){
            if($request->tipo == "Compra"){
                $stock->stock=$stock->stock + $request->cantidad;
            }else{
                if($stock->stock >= $request->cantidad){
                    $stock->stock=$stock->stock - $request->cantidad;
                }else {
                    return response()->json(['code'=>'204', 'total'=> $stock->stock]); 
                }
            }
            $stock->update();
        }else{
            if($request->tipo == "Compra"){
                $nuevoStock=new Stock();
                $nuevoStock->idLocal=$request->idLocal;
                $nuevoStock->idProducto=$request->idProducto;
                $nuevoStock->stock=$request->cantidad;
                $nuevoStock->save();
            }else{
                return response()->json(['code'=>'400']); 
            }
        }

        $datos=new Transaccion();
        $datos->idUsuario=$request->idUsuario;
        $datos->idProducto=$request->idProducto;
        $datos->idLocal=$request->idLocal;
        $datos->tipo=$request->tipo;
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

            $stock=Stock::where('idLocal',$request->idLocal)->where('idProducto',$request->idProducto)->get()->first();

            if($stock != null){
                if($request->tipo == "Compra"){
                    $stock->stock=$stock->stock + $request->cantidad;
                }else{
                    if($stock->stock >= $request->cantidad){
                        $stock->stock=$stock->stock - $request->cantidad;
                    }else {
                        return response()->json(['code'=>'204', 'total'=> $stock->stock]); 
                    }
                }
                $stock->update();
            }else{
                if($request->tipo == "Compra"){
                    $nuevoStock=new Stock();
                    $nuevoStock->idLocal=$request->idLocal;
                    $nuevoStock->idProducto=$request->idProducto;
                    $nuevoStock->stock=$request->cantidad;
                    $nuevoStock->save();
                }else{
                    return response()->json(['code'=>'400']); 
                }
            }

            $datos->idUsuario=$request->idUsuario;
            $datos->idProducto=$request->idProducto;
            $datos->idLocal=$request->idLocal;
            $datos->tipo=$request->tipo;
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

    public function obtenerTransaccionesUsuarios($fechaInicio, $fechaFin)
    {
        $datos = Transaccion::whereBetween('fecha', [$fechaInicio, $fechaFin])
        ->select('idUsuario', 
                 DB::raw('SUM(CASE WHEN tipo = "Compra" THEN valor ELSE 0 END) as compras'),
                 DB::raw('SUM(CASE WHEN tipo = "Venta" THEN valor ELSE 0 END) as ventas'),
                 DB::raw('SUM(CASE WHEN tipo = "Venta" THEN valor ELSE 0 END) - SUM(CASE WHEN tipo = "Compra" THEN valor ELSE 0 END) as total'))
        ->groupBy('idUsuario')
        ->with('usuarioTransaccion', 'usuarioTransaccion.rolUsuario')
        ->get();

        if($datos->count() != 0){
            return response()->json(['data' => $datos, 'code' => '200']);
        } else {
            return response()->json(['code' => '204']);
        }
    }

    public function obtenerTransaccionesLocales($year, $month, $week)
    {        
        $datos = Transaccion::select('idLocal')
            ->selectRaw('YEAR(fecha) AS year, MONTH(fecha) AS month, WEEK(fecha, 1) AS week')
            ->selectRaw('SUM(CASE WHEN DAYOFWEEK(fecha) = 1 THEN valor ELSE 0 END) AS lunes')
            ->selectRaw('SUM(CASE WHEN DAYOFWEEK(fecha) = 2 THEN valor ELSE 0 END) AS martes')
            ->selectRaw('SUM(CASE WHEN DAYOFWEEK(fecha) = 3 THEN valor ELSE 0 END) AS miercoles')
            ->selectRaw('SUM(CASE WHEN DAYOFWEEK(fecha) = 4 THEN valor ELSE 0 END) AS jueves')
            ->selectRaw('SUM(CASE WHEN DAYOFWEEK(fecha) = 5 THEN valor ELSE 0 END) AS viernes')
            ->selectRaw('SUM(CASE WHEN DAYOFWEEK(fecha) = 6 THEN valor ELSE 0 END) AS sabado')
            ->selectRaw('SUM(CASE WHEN DAYOFWEEK(fecha) = 7 THEN valor ELSE 0 END) AS domingo')
            ->selectRaw('SUM(valor) AS total')
            ->whereYear('fecha', $year)
            ->whereMonth('fecha', $month)
            ->whereRaw('WEEK(fecha, 1) = ?', [$week])
            ->where('tipo', 'Venta')
            ->groupBy('idLocal', 'year', 'month', 'week')
            ->with('localTransaccion')
            ->get();

        if($datos->count() != 0){
            return response()->json(['data' => $datos, 'code' => '200']);
        } else {
            return response()->json(['code' => '204']);
        }
    }

    public function obtenerTransaccionesAnual($year)
    {
        $registrosPorLocal = Transaccion::whereYear('fecha', $year)
        ->select('idLocal', DB::raw('MONTH(fecha) as mes'), DB::raw('SUM(valor) as total_valor'))
        ->groupBy('idLocal', 'mes')
        ->orderBy('idLocal', 'asc')
        ->orderBy('mes', 'asc')
        ->get();

        $locales=Local::orderBy('nombre', 'asc')->get();


        // Crear una colección vacía para los resultados
        $resultados = collect([]);

        // Agrupar los registros por idLocal
        $gruposPorLocal = $registrosPorLocal->groupBy('idLocal');

        foreach ($gruposPorLocal as $idLocal => $registros) {

            $meses = $registros->pluck('total_valor', 'mes')->toArray();
            ksort($meses); // Ordenar el arreglo por mes
            $nombreLocal = "";
            foreach ($locales as $local) {
                if($local['idLocal'] === $idLocal){
                    $nombreLocal = $local['nombre'];
                    break;
                }
            }
            $resultadoPorLocal = [
                'local' => $nombreLocal,
                'meses' => array_values(array_replace(array_fill(1, 12, 0), $meses)),
            ];
            $resultados->push($resultadoPorLocal);
        }

        if ($resultados->count() > 0) {
            return response()->json(['data' => $resultados, 'code' => '200']);
        } else {
            return response()->json(['code' => '204']);
        }

    }

}
