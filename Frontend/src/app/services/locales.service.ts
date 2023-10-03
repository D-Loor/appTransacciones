import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalModel } from '../models/local.model';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  private urlService = "http://127.0.0.1:8000/api/locales/" ;

  constructor(private http: HttpClient) { }

  guardar(data: LocalModel){
    return new Promise ((resolve, reject) => {
      this.http.post(this.urlService ,data).subscribe(res => {
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

  editar(data: LocalModel){
    return new Promise ((resolve, reject) => {
      this.http.put(this.urlService + data.idLocal, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idLocal: number){
    return new Promise ((resolve, reject) => {
      this.http.delete(this.urlService + idLocal).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
}
