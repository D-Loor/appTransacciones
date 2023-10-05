import { TipoModel } from "./tipo.model";

export class CategoriaModel {
    idCategoria?: number;
    idTipoCategoria?: number;
    categoria?: string;
    descripcion?: string;
    estado?: number;
    tipo_categoria?: TipoModel;
}