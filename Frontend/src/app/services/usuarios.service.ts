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

  guardar(data: UsuarioModel){
    return new Promise ((resolve, reject) => {
      this.http.post(this.urlService, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  obtener(estado: string){
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlService +  "estado/" + estado).subscribe(res => {
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
