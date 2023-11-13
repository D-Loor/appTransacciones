import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private urlService = "http://127.0.0.1:8000/api/usuarios/" ;

  constructor(private http: HttpClient) { }

  validarLogin(cedula:string, clave:string) {
    let  url = this.urlService + 'login/' + cedula + '/' + clave;
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);
      }, error => {
        reject(error);
      });
    });
  }

  guardar(data: UsuarioModel, imagen:any){
    var formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('idRol', data.idRol !== undefined ? data.idRol.toString() : '');
    formData.append('nombres', data.nombres !== undefined ? data.nombres : '');
    formData.append('apellidos', data.apellidos !== undefined ? data.apellidos : '');
    formData.append('cedula', data.cedula !== undefined ? data.cedula : '');
    formData.append('password', data.password !== undefined ? data.password : '');
    formData.append('estado', data.estado !== undefined ? data.estado.toString() : '');
    return new Promise ((resolve, reject) => {
      this.http.post(this.urlService, formData).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  obtener(estado: string, paginado: number, pagina: number){
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlService +  "estado/" + estado + "/" + paginado +"?page=" + pagina).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  editar(data: UsuarioModel){
    return new Promise ((resolve, reject) => {
      this.http.put(this.urlService + data.idUsuario, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idUsuario: number){
    return new Promise ((resolve, reject) => {
      this.http.delete(this.urlService + idUsuario).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
}
