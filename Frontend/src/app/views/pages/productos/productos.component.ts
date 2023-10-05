import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { ProductosService } from 'src/app/services/productos.service';
import { ProductoModel } from 'src/app/models/producto.model';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  tituloModal = "";
  visibleModal = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaUsuarios: ProductoModel[] = [];
  producto: ProductoModel = new ProductoModel;


  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public productoService: ProductosService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.listaUsuarios = [];
    this.obtenerDatosRoles();
    this.productoService.obtener().then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Usuarios registrados.!', 'info');
      } else {
        this.listaUsuarios = resp['data'];
        console.log("lista ", this.listaUsuarios);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  registrarDatos() {
    if(this.validarPassword()){
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
  }

  eliminarDato(idProducto: number){
    this.productoService.eliminar(idProducto).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe este producto.", "warning");
      } else if (resp['code'] == '200'){
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
    this.producto = { ...datosModal };
    this.visibleModal = true;
  }

  editarDato(){
    if(this.validarPassword()){
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
    
  }

  limpiarFormulario(){
    this.producto.idProducto = undefined
    this.producto.idCategoria = undefined;
    this.producto.nombre = undefined;
    this.producto.descripcion = undefined;
    this.producto.precio = undefined;
    this.producto.estado = undefined;
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

  handleLiveDemoChange(event: any) {
    this.visibleModal = event;
  }
 
  obtenerDatosT() {
    this.listaRoles = [];
    this.rolService.obtener().then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Roles registrados.!', 'info');
      } else {
        this.listaRoles = resp['data'];
        console.log("lista ", this.listaRoles);
      }
    }).catch(error => {
      console.log(error);
    });
  }
}
