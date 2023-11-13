<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;

class UsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index($estado, $paginado)
    {
        if($estado == "*"){
            $datos=Usuario::orderBy('apellidos', 'asc')->with('rolUsuario')->paginate($paginado);
        }else{
            $datos=Usuario::orderBy('apellidos', 'asc')->where('estado', $estado)->with('rolUsuario')->paginate($paginado);
        }

        if($datos->count() != 0){
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
        $valida=Usuario::where('cedula', $request->cedula)->get()->first();
        if($valida != null){
            return response()->json(['code'=>'400']);
        }else{
            if($request->file('imagen') === null){
                $picture = '/imagenes/user.png';
            }else{
                $file=$request->file('imagen');
                $nombre=$file->getClientMimeType();
                $tipoImagen=str_replace('image/', '.',$nombre);
                $fileName=uniqid() . $tipoImagen;
                $path=public_path().'/imagenes';
                $file->move($path,$fileName);
                $picture = '/imagenes/'.$fileName;
                
            }
            $datos=new Usuario();
            $datos->idRol=$request->idRol;
            $datos->nombres=$request->nombres;
            $datos->apellidos=$request->apellidos;
            $datos->cedula=$request->cedula;
            $datos->password=$request->password;
            $datos->estado=$request->estado;
            $datos->imagen=$picture;
            $datos->save();
            return response()->json(['code'=>'200']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Usuario $usuario)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Usuario $usuario)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $idUsuario)
    {
        $datos=Usuario::where('idUsuario', $idUsuario)->get()->first();
        if($datos != null){
            if($datos->cedula == $request->cedula){
                $datos->idRol=$request->idRol;
                $datos->nombres=$request->nombres;
                $datos->apellidos=$request->apellidos;
                $datos->password=$request->password;
                $datos->estado=$request->estado;
                $datos->update();
                return response()->json(['code'=>'200']);
            }else{
                $valida=Usuario::where('cedula', $request->cedula)->get()->first();
                if($valida != null){
                    return response()->json(['code'=>'400']);
                }else{
                    $datos->idRol=$request->idRol;
                    $datos->nombres=$request->nombres;
                    $datos->apellidos=$request->apellidos;
                    $datos->cedula=$request->cedula;
                    $datos->password=$request->password;
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
    public function destroy($idUsuario)
    {
        $datos=Usuario::find($idUsuario);  
        if($datos != null){
            $datos->delete();
            return response()->json(['code'=>'200']);
        }else{
            return response()->json(['code'=>'204']);
        }
    }

    public function login($cedula, $clave)
    {
        $datos=Usuario::where('cedula',$cedula)->where('password',$clave)->where('estado','1')->with('rolUsuario')->get()->first(); 
        if($datos != null){
            return response()->json(['data'=>$datos, 'code'=>'200']);
        }else
            return response()->json(['code'=>'204']);
    }
}
