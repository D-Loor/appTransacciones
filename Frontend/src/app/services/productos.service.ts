import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from '../models/producto.model'
@Injectable({
  providedIn: 'root'
})
export class ProductosService {


  private urlService = "http://127.0.0.1:8000/api/productos/" ;

  constructor(private http: HttpClient) { }

  guardar(data: ProductoModel, imagen:any){
    var formData = new FormData();
    formData.append('imagen', imagen);
    formData.append('idTipo', data.idTipo !== undefined ? data.idTipo.toString() : '');
    formData.append('nombre', data.nombre !== undefined ? data.nombre : '');
    formData.append('descripcion', data.descripcion !== undefined ? data.descripcion : '');
    formData.append('precio', data.precio !== undefined ? data.precio.toString() : '');
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

  obtener(nombreProducto: String, idCategoria: String, estado: String, paginado: number, pagina: number){
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlService +  "estado/" + nombreProducto + "/" + idCategoria + "/" + estado + "/" + paginado +"?page=" + pagina).subscribe(res => {
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

  obtenerPorTipo(idTipo: number){
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlService + "obtenerProductosPorTipo/" + idTipo).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

}
