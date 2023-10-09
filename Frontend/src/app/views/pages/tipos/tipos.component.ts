import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from '../notify/notificar/notificar.component';
import { TiposService } from '../../../services/tipos.service'
import { TipoModel } from '../../../models/tipo.model'
import { CategoriaModel } from 'src/app/models/categoria.model';
import { CategoriasService } from 'src/app/services/categorias.service';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent implements OnInit{
  tituloModal = "";
  visibleModal = false;
  visibleModalConfirmacion = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaTipos: TipoModel[] = [];
  listaCategorias: CategoriaModel[] = [];
  tipo: TipoModel = new TipoModel;


  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public tipoService: TiposService, public categoriaService: CategoriasService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.listaTipos = [];
    this.obtenerCategorias();
    this.tipoService.obtener("*").then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Tipos registrados.!', 'info');
      } else {
        this.listaTipos = resp['data'];
        console.log("lista ", this.listaTipos);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  registrarDatos() {
    this.tipoService.guardar(this.tipo).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe un Tipo con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El Tipo se ha creado correctamente.", "success");
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
    this.tipoService.eliminar(this.tipo.idTipo || 0).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe este Tipo.", "warning");
      } else if (resp['code'] == '200'){
        this.visibleModalConfirmacion = false;
        this.showToast("El Tipo se ha eliminado correctamente.", "success");
        this.obtenerDatos();
      }else {
        this.showToast("Se ha presentado un error al eliminar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  cargarDatos(datosModal: TipoModel){
    this.tituloModal = "Editar";
    this.tipo = { ...datosModal };
    this.visibleModal = true;
  }

  editarDato(){
    this.tipoService.editar(this.tipo).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe un Tipo con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El Tipo se ha editado correctamente.", "success");
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

  obtenerCategorias() {
    this.listaCategorias = [];
    this.categoriaService.obtener("1").then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Categorias registradas.!', 'info');
      } else {
        this.listaCategorias = resp['data'];
        console.log("listaCategorias ", this.listaCategorias);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  limpiarFormulario(){
    this.tipo.idTipo = undefined;
    this.tipo.tipo = undefined;
    this.tipo.descripcion = undefined
    this.tipo.estado = undefined;
    this.tipo.idCategoria = undefined;
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

  handleChangeConfirmacion(event: any) {
    this.visibleModalConfirmacion = event;
  }
}
