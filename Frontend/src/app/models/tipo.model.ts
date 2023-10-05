import { CategoriaModel } from "./categoria.model";

export class TipoModel {
    idTipo?: number;
    idCategoria?: number;
    tipo?: string;
    descripcion?: string;
    estado?: number;
    tipo_categoria?: CategoriaModel;
}