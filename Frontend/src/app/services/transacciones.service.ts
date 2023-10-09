import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TransaccionModel } from '../models/transaccion.model';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  private urlService = "http://127.0.0.1:8000/api/transacciones/" ;

  constructor(private http: HttpClient) { }

  guardar(data: TransaccionModel){
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

  editar(data: TransaccionModel){
    return new Promise ((resolve, reject) => {
      this.http.put(this.urlService + data.idTransaccion, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idTipo: number){
    return new Promise ((resolve, reject) => {
      this.http.delete(this.urlService + idTipo).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  obtenerPorCategoria(idTransaccion: number){
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlService + "obtenerTiposPorCategoria/" + idTransaccion).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

}
