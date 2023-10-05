import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from '../models/producto.model'
@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private urlService = "http://127.0.0.1:8000/api/productos/" ;

  constructor(private http: HttpClient) { }

  guardar(data: ProductoModel){
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

  editar(data: ProductoModel){
    return new Promise ((resolve, reject) => {
      this.http.put(this.urlService + data.idProducto, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idProducto: number){
    return new Promise ((resolve, reject) => {
      this.http.delete(this.urlService + idProducto).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
}
