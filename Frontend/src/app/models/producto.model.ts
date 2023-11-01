import { TipoModel } from "./tipo.model";

export class ProductoModel {
    idProducto?: number;
    idTipo?: number;
    nombre?: string;
    descripcion?: string;
    precio?: number;
    estado?: number;
    imagen?: string;
    tipo_producto?: TipoModel;
}