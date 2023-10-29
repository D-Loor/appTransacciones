import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/producto.model';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { TipoModel } from 'src/app/models/tipo.model';
import { CategoriasService } from 'src/app/services/categorias.service';
import { TiposService } from 'src/app/services/tipos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  tituloModal = "";
  visibleModal = false;
  visibleModalConfirmacion = false;
  visibleModalBusqueda = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaProductos: ProductoModel[] = [];
  listaCategorias: CategoriaModel[] = [];
  listaTipos: TipoModel[] = [];
  producto: ProductoModel = new ProductoModel;
  categoriaSeleccionada: String = "*";
  nombreProducto: String = "";
  pagina: number = 1;
  totalPaginas: number = 1;
  itemsPaginado: number = 1;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public productoService: ProductosService, public categoriaService: CategoriasService, public tipoService: TiposService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.listaProductos = [];
    this.obtenerCategorias();
    let nombre = this.nombreProducto.toString();
    if(this.nombreProducto === "" || this.nombreProducto === undefined || this.nombreProducto === null){
      nombre = "*";
    }
    this.productoService.obtener(nombre, this.categoriaSeleccionada, "*", this.itemsPaginado, this.pagina).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Productos registrados.!', 'info');
      } else {
        this.totalPaginas = Number(resp['data']['last_page']);
        this.listaProductos = resp['data']['data'];
        console.log("listaProductos ", this.listaProductos);
        this.visibleModalBusqueda = false;
      }
    }).catch(error => {
      console.log(error);
    });
  }

  registrarDatos() {
    this.productoService.guardar(this.producto).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe un producto con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El producto se ha creado correctamente.", "success");
        this.obtenerDatos();
        this.limpiarFormulario();
        this.visibleModal = false;
      }else {
        this.showToast("Se ha presentado un error al guardar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  eliminarDato(){
    this.productoService.eliminar(this.producto?.idProducto || 0).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe este producto.", "warning");
      } else if (resp['code'] == '200'){
        this.visibleModalConfirmacion = false;
        this.showToast("El producto se ha eliminado correctamente.", "success");
        this.obtenerDatos();
      }else {
        this.showToast("Se ha presentado un error al eliminar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  cargarDatos(datosModal: ProductoModel){
    this.tituloModal = "Editar";
    this.categoriaSeleccionada = datosModal.tipo_producto?.idCategoria?.toString() || "";
    this.obtenerTipos();
    this.producto = { ...datosModal };
    this.visibleModal = true;
  }

  editarDato(){
    console.log("edit ", this.producto)
      this.productoService.editar(this.producto).then(data => {
        let resp = data as any;
        if (resp['code'] == '400') {
          this.showToast("Ya existe un producto con este nombre.", "warning");
        } else if (resp['code'] == '200'){
          this.showToast("El producto se ha editado correctamente.", "success");
          this.obtenerDatos();
          this.limpiarFormulario();
          this.visibleModal = false;
        }else {
          this.showToast("Se ha presentado un error al editar.", "danger");
        }
      }).catch(error => {
        console.log(error);
      });    
  }

  limpiarFormulario(){
    this.producto.idProducto = undefined
    this.producto.idTipo = undefined;
    this.producto.nombre = undefined;
    this.categoriaSeleccionada = "";
    this.producto.descripcion = undefined;
    this.producto.precio = undefined;
    this.producto.estado = undefined;
  }

  limpiarFormularioBusqueda(){
    this.nombreProducto = ""
    this.categoriaSeleccionada = "*";
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

  obtenerCategorias() {
    this.listaCategorias = [];
    this.categoriaService.obtener("*","1",1000,1).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Categorias registradas.!', 'info');
      } else {
        this.listaCategorias = resp['data']['data'];
        console.log("listaCategorias ", this.listaCategorias);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  obtenerTipos() {
    this.listaTipos = [];
    this.tipoService.obtenerPorCategoria(this.categoriaSeleccionada).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen tipos registrados en esta categoría.!', 'info');
      } else {
        this.listaTipos = resp['data'];
        console.log("listaTipos ", this.listaCategorias);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }
 
  handleChangeConfirmacion(event: any) {
    this.visibleModalConfirmacion = event;
  }

  handleChangeBusqueda(event: any) {
    this.visibleModalBusqueda = event;
  }

}
