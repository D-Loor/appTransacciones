import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockModel } from '../models/stock.model';

@Injectable({
  providedIn: 'root'
})
export class StocksService {

  private urlService = "http://127.0.0.1:8000/api/stocks/" ;

  constructor(private http: HttpClient) { }

  guardar(data: StockModel){
    return new Promise ((resolve, reject) => {
      this.http.post(this.urlService, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  obtener(nombreProducto: String, idLocal: String, paginado: number, pagina: number){
    return new Promise ((resolve, reject) => {
      this.http.get(this.urlService + "obtener/" + nombreProducto + "/" + idLocal + "/" + paginado +"?page=" + pagina).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  editar(data: StockModel){
    return new Promise ((resolve, reject) => {
      this.http.put(this.urlService + data.idStock, data).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }

  eliminar(idStock: number){
    return new Promise ((resolve, reject) => {
      this.http.delete(this.urlService + idStock).subscribe(res => {
        resolve(res);{
        }
      }, error => {
        reject(error);
      });
    });
  }
}