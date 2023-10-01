import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RolModel } from '../models/rol.model';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  guardar(data: RolModel){
    let  url = 'http://127.0.0.1:8000/api/roles/';
    return new Promise ((resolve, reject) => {
      this.http.post(url,data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  obtener(){
    let  url = 'http://127.0.0.1:8000/api/roles/';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  editar(data: RolModel){
    let  url = 'http://127.0.0.1:8000/api/roles/' + data.idRol;
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idRol: number){
    let  url = 'http://127.0.0.1:8000/api/roles/' + idRol;
    return new Promise ((resolve, reject) => {
      this.http.delete(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

}
