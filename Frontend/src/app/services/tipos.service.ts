import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TipoModel } from '../models/tipo.model';

@Injectable({
  providedIn: 'root'
})
export class TiposService {

  private urlService = "http://127.0.0.1:8000/api/tipos/" ;

  constructor(private http: HttpClient) { }

  guardar(data: TipoModel){
    return new Promise ((resolve, reject) => {
      this.http.post(this.urlService, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  obtener(){
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlService).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  editar(data: TipoModel){
    return new Promise ((resolve, reject) => {
      this.http.put(this.urlService + data.idTipoCategoria, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idTipoCategoria: number){
    return new Promise ((resolve, reject) => {
      this.http.delete(this.urlService + idTipoCategoria).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
}