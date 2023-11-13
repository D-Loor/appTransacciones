<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($nombreProducto, $idCategoria, $estado, $paginado)
    {
        if($estado == "*"){
            $query=Producto::orderBy('nombre', 'asc')->with('tipoProducto', 'tipoProducto.tipoCategoria');
        }else{
            $query=Producto::orderBy('nombre', 'asc')->where('estado', $estado)->with('tipoProducto', 'tipoProducto.tipoCategoria');
        }

        if ($nombreProducto !== "*") {
            $query->where('nombre', 'LIKE', '%' . $nombreProducto . '%');
        }

        if ($idCategoria !== "*") {
            $query->whereHas('tipoProducto', function ($subquery) use ($idCategoria) {
                $subquery->where('idCategoria', $idCategoria);
            });
        }

        $datos = $query->paginate($paginado);

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
            if($request->file('imagen') === null){
                $picture = '/imagenes/producto.png';
            }else{
                $file=$request->file('imagen');
                $nombre=$file->getClientMimeType();
                $tipoImagen=str_replace('image/', '.',$nombre);
                $fileName=uniqid() . $tipoImagen;
                $path=public_path().'/imagenes';
                $file->move($path,$fileName);
                $picture = '/imagenes/'.$fileName;
                
            }
            $datos=new Producto();
            $datos->idTipo=$request->idTipo;
            $datos->nombre=$request->nombre;
            $datos->descripcion=$request->descripcion;
            $datos->precio=$request->precio; 
            $datos->estado=$request->estado;
            $datos->imagen=$picture;
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
                $valida=Producto::where('nombre', $request->nombre)->get()->first();
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

    public function obtenerProductosPorTipo($idTipo)
    {
        $datos=Producto::where('idTipo', $idTipo)->where('estado', "1")->orderBy('nombre', 'asc')->with('tipoProducto')->get();
        $num_rows = count($datos);
        if($num_rows != 0){
            return response()->json(['data'=>$datos, 'code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        } 
    }

}
