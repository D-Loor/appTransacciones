import { ProductoModel } from "./producto.model";
import { LocalModel } from "./local.model";

export class StockModel {
    idStock?: number;
    idProducto?: number;
    idLocal?: number;
    stock?: number;
    producto_stock?: ProductoModel;
    local_stock?: LocalModel;

}