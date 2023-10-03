import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { TiposService } from './../../../services/tipos.service'
import { TipoModel } from '../../../models/tipo.model'

@Component({
  selector: 'app-tipos-categorias',
  templateUrl: './tipos-categorias.component.html',
  styleUrls: ['./tipos-categorias.component.scss']
})
export class TiposCategoriasComponent implements OnInit{
  tituloModal = "";
  visibleModal = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaTipos: TipoModel[] = [];
  tipo: TipoModel = new TipoModel;


  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public tipoService: TiposService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.listaTipos = [];
    this.tipoService.obtener().then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Tipos de Categorias registrados.!', 'info');
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
        this.showToast("Ya existe un Tipo de Categoria con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El Tipo de Categoria se ha creado correctamente.", "success");
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

  eliminarDato(idTipoCategoria: number){
    this.tipoService.eliminar(idTipoCategoria).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe este Tipo de Categoria.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El Tipo de Categoria se ha eliminado correctamente.", "success");
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
        this.showToast("Ya existe un Tipo de Categoria con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El Tipo de Categoria se ha editado correctamente.", "success");
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
    this.tipo.idTipoCategoria = undefined;
    this.tipo.tipo = undefined;
    this.tipo.descripcion = undefined
    this.tipo.estado = undefined;
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
}
