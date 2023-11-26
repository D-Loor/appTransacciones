import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { TransaccionModel } from 'src/app/models/transaccion.model';
import { ProductoModel } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { TransaccionesService } from 'src/app/services/transacciones.service';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { TipoModel } from 'src/app/models/tipo.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposService } from 'src/app/services/tipos.service';
import { LocalModel } from 'src/app/models/local.model';
import { LocalesService } from 'src/app/services/locales.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {
  tituloModal = "";
  visibleModal = false;
  visibleModalBusqueda = false;  
  visibleModalDetalle = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaTransacciones: TransaccionModel[] = [];
  listaCategorias: CategoriaModel[] = [];
  listaTipos: TipoModel[] = [];
  listaProductos: ProductoModel[] = [];
  listaProductosCompleta: ProductoModel[] = [];
  listaUsuarios: UsuarioModel[] = [];
  listaLocales: LocalModel[] = [];
  transaccion: TransaccionModel = new TransaccionModel;
  categoriaSeleccionada: String = "*";
  localSeleccionado: String = "*";
  usuarioSeleccionado: String = "*";
  tipoSeleccionado: number = 0;
  productoSeleccionado: String = "*";
  idUsario: any;
  fecha: Date = new Date;
  pagina: number = 1;
  totalPaginas: number = 1;
  itemsPaginado: number = 8;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public transaccionesService: TransaccionesService, public categoriasService: CategoriasService, 
    public tiposService: TiposService, public productoService: ProductosService, public localService: LocalesService, 
    public usuarioService: UsuariosService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
    this.transaccion.idUsuario = Number(localStorage.getItem('idUsuario'));

  }

  obtenerDatos() {
    this.obtenerDatosCategorias();
    this.obtenerDatosLocales();
    this.obtenerDatosUsuarios();
    this.obtenerDatosProductosCompletos();
    this.listaTransacciones = [];
    this.transaccionesService.obtener(this.localSeleccionado, this.productoSeleccionado, this.usuarioSeleccionado, this.categoriaSeleccionada, this.itemsPaginado, this.pagina).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Transacciones registradas.!', 'info');
      } else {
        this.totalPaginas = Number(resp['data']['last_page']);
        this.listaTransacciones = resp['data']['data'];
        console.log("listaTransacciones ", this.listaTransacciones);
        this.visibleModalBusqueda = false;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  registrarDatos() {
    this.fecha = new Date();
    this.transaccion.fecha = this.formatearFecha(this.fecha);

    this.transaccionesService.guardar(this.transaccion).then(data => {
      let resp = data as any;
      if (resp['code'] == '200'){
        this.showToast("La Trnsacción se ha creado correctamente.", "success");
        this.obtenerDatos();
        this.limpiarFormulario();
        this.visibleModal = false;
      }else if(resp['code'] == '204'){
        this.showToast("Solo existen " + resp['total'] + " en stock.", "info");
      }else {
        this.showToast("Se ha presentado un error al guardar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });
  }


  formatearFecha(fecha: Date) {
    const year = fecha.getFullYear();
    const month = this.agregarCeroDelante(fecha.getMonth() + 1);
    const day = this.agregarCeroDelante(fecha.getDate());
    const hours = this.agregarCeroDelante(fecha.getHours());
    const minutes = this.agregarCeroDelante(fecha.getMinutes());
    const seconds = this.agregarCeroDelante(fecha.getSeconds());

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  }

  agregarCeroDelante(valor: number) {
    return valor < 10 ? `0${valor}` : valor;
  }
  eliminarDato(idtransaccion: number){
    this.transaccionesService.eliminar(idtransaccion).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe esta Transacción.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("La Transacción se ha eliminado correctamente.", "success");
        this.obtenerDatos();
      }else {
        this.showToast("Se ha presentado un error al eliminar.", "danger");
      }
    }).catch(error => {
      this.showToast("Se ha presentado un error al eliminar.", "danger");
      console.log(error);
    });
  }

  cargarDatos(datosModal: TransaccionModel){
    this.tituloModal = "Editar";
    this.categoriaSeleccionada = datosModal.producto_transaccion?.tipo_producto?.idCategoria?.toString() || "";
    this.obtenerDatosTipos();
    this.tipoSeleccionado = datosModal.producto_transaccion?.idTipo || 0;
    this.obtenerDatosProductos();
    this.transaccion = { ...datosModal };
    this.visibleModal = true;
  }

  editarDato(){
    this.transaccionesService.editar(this.transaccion).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe un transaccion con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El transaccion se ha editado correctamente.", "success");
        this.obtenerDatos();
        this.limpiarFormulario();
        this.visibleModal = false;
      }else if(resp['code'] == '204'){
        this.showToast("Solo existen " + resp['total'] + " en stock.", "info");
      }else {
        this.showToast("Se ha presentado un error al editar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });    
  }

  limpiarFormulario(){
    this.transaccion.idLocal = undefined
    this.transaccion.idProducto = undefined;
    this.transaccion.cantidad = undefined;
    this.transaccion.valor = undefined;
    this.transaccion.observacion = undefined;
    this.transaccion.idTransaccion = undefined;
    this.transaccion.tipo = undefined;
    this.tipoSeleccionado = 0;
    this.categoriaSeleccionada = "";
  }

  showToast(mensaje: string, color: string) {
    const options = {
      title: mensaje,
      delay: 5000,
      placement: this.placement,
      colorToast: color,
      autohide: true,
    }
    const componentRef = this.toaster.addToast(NotificarComponent, { ...options });
  }

  obtenerDatosCategorias() {
    this.listaCategorias = [];
    this.categoriasService.obtener("*", "*", 1000, 1).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Categorías registradas.!', 'info');
      } else {
        this.listaCategorias = resp['data']['data'];
        console.log("listaCategorias ", this.listaCategorias);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerDatosTipos() {
    this.tipoSeleccionado = 0;
    this.transaccion.idProducto = 0;
    this.listaTipos = [];
    this.tiposService.obtenerPorCategoria(this.categoriaSeleccionada).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Tipos registrados para esta categoría.!', 'info');
      } else {
        this.listaTipos = resp['data'];
        console.log("listaTipos ", this.listaTipos);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerDatosProductos() {
    this.transaccion.idProducto = 0;
    this.listaProductos = [];
    this.productoService.obtenerPorTipo(this.tipoSeleccionado).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Productos registrados para este tipo.!', 'info');
      } else {
        this.listaProductos = resp['data'];
        console.log("listaProductos ", this.listaProductos);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerDatosProductosCompletos() {
    this.listaProductosCompleta = [];
    this.productoService.obtener("*", "*", "*", 1000, 1).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Productos registrados.!', 'info');
      } else {
        this.listaProductosCompleta = resp['data']['data'];
        console.log("listaProductos ", this.listaProductosCompleta);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerDatosLocales() {
    this.listaLocales = [];
    this.localService.obtener("1", 1000, 1).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Locales registrados.!', 'info');
      } else {
        this.listaLocales = resp['data']['data'];
        console.log("listaLocales ", this.listaLocales);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerDatosUsuarios() {
    this.listaUsuarios = [];
    this.usuarioService.obtener("*", 1000, 1).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Usuarios registrados.!', 'info');
      } else {
        this.listaUsuarios = resp['data']['data'];
        console.log("lista ", this.listaUsuarios);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  limpiarFormularioBusqueda(){
    this.localSeleccionado = "*";
    this.categoriaSeleccionada = "*";
    this.usuarioSeleccionado = "*";
    this.productoSeleccionado = "*";
  }

  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }

  handleChangeDetalle(event: any) {
    this.visibleModalDetalle = event;
  }

  handleChangeBusqueda(event: any) {
    this.visibleModalBusqueda = event;
  }

}
