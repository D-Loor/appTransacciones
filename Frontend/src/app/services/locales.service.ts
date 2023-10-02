import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalModel } from '../models/local.model';

@Injectable({
  providedIn: 'root'
})
export class LocalesService {

  constructor(private http: HttpClient) { }

  guardar(data: LocalModel){
    let  url = 'http://127.0.0.1:8000/api/locales/';
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
    let  url = 'http://127.0.0.1:8000/api/locales/';
    return new Promise ((resolve, reject) => {
      this.http.get(url).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  editar(data: LocalModel){
    let  url = 'http://127.0.0.1:8000/api/locales/' + data.idLocal;
    console.log(data.idLocal+""+data.nombre+""+data.descripcion+""+data.estado);
    return new Promise ((resolve, reject) => {
      this.http.put(url, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idlocal: number){
    let  url = 'http://127.0.0.1:8000/api/locales/' + idlocal;
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
