import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { LocalesService } from './../../../services/locales.service'
import { LocalModel } from './../../../models/local.model'

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss']
})
export class LocalesComponent implements OnInit{
  tituloModal = "";
  visibleModal = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaLocales: LocalModel[] = [];
  local: LocalModel = new LocalModel;
  pagina: number = 1;
  totalPaginas: number = 1;
  itemsPaginado: number = 8;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public localService: LocalesService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.listaLocales = [];
    this.localService.obtener("*", this.itemsPaginado, this.pagina).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Locales registrados.!', 'info');
      } else {
        this.totalPaginas = Number(resp['data']['last_page']);
        this.listaLocales = resp['data']['data'];
        console.log("lista ", this.listaLocales);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  registrarDatos() {
    this.localService.guardar(this.local).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe un local con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El local se ha creado correctamente.", "success");
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

  eliminarDato(idlocal: number){
    this.localService.eliminar(idlocal).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe este local.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El local se ha eliminado correctamente.", "success");
        this.obtenerDatos();
      }else {
        this.showToast("Se ha presentado un error al eliminar.", "danger");
      }
    }).catch(error => {
      this.showToast("Se ha presentado un error al eliminar.", "danger");
      console.log(error);
    });
  }

  cargarDatos(datosModal: LocalModel){
    this.tituloModal = "Editar";
    this.local = { ...datosModal };
    this.visibleModal = true;
  }

  editarDato(){
    this.localService.editar(this.local).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe un local con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El local se ha editado correctamente.", "success");
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
    this.local.idLocal = undefined;
    this.local.nombre = undefined;
    this.local.descripcion = undefined
    this.local.estado = undefined;
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
