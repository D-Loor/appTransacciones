import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolModel } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private urlService = "http://127.0.0.1:8000/api/roles/" ;

  constructor(private http: HttpClient) { }

  guardar(data: RolModel){
    return new Promise ((resolve, reject) => {
      this.http.post(this.urlService,data).subscribe(res => {
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

  editar(data: RolModel){
    return new Promise ((resolve, reject) => {
      this.http.put(this.urlService + data.idRol, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idRol: number){
    return new Promise ((resolve, reject) => {
      this.http.delete(this.urlService + idRol).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

}
