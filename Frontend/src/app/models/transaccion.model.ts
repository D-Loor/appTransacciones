import { UsuarioModel } from "./usuario.model";
import { ProductoModel } from "./producto.model";
import { LocalModel } from "./local.model";

export class TransaccionModel {
    idTransaccion?: number;
    idUsuario?: number;
    idProducto?: number;
    idLocal?: number;
    tipo?: string;
    cantidad?: number;
    valor?: number;
    observacion?: string;
    fecha?: String;
    usuario_transaccion?: UsuarioModel;
    producto_transaccion?: ProductoModel;
    local_transaccion?: LocalModel;
}