import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoriaModel } from '../models/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  private urlService = "http://127.0.0.1:8000/api/categorias/" ;

  constructor(private http: HttpClient) { }

  guardar(data: CategoriaModel){
    return new Promise ((resolve, reject) => {
      this.http.post(this.urlService, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  obtener(nombreCatergoria: String, estado: String, paginado: number, pagina: number){
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlService + "estado/" + nombreCatergoria + "/" + estado + "/" + paginado +"?page=" + pagina).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  editar(data: CategoriaModel){
    return new Promise ((resolve, reject) => {
      this.http.put(this.urlService + data.idCategoria, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idCategoria: number){
    return new Promise ((resolve, reject) => {
      this.http.delete(this.urlService + idCategoria).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
}
