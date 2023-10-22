import { RolModel } from "./rol.model";

export class UsuarioModel {
    idUsuario?: number;
    idRol?: number;
    nombres?: string;
    apellidos?: string;
    cedula?: string;
    password?: string;
    estado?: number;
    imagen?: string;
    rol_usuario?: RolModel;
}