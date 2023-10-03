import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { RolesService } from './../../../services/roles.service'
import { RolModel } from './../../../models/rol.model'
@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  tituloModal = "";
  visibleModal = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaRoles: RolModel[] = [];
  rol: RolModel = new RolModel;


  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public rolService: RolesService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
  }

  obtenerDatos() {
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

  registrarDatos() {
    this.rolService.guardar(this.rol).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe un rol con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El rol se ha creado correctamente.", "success");
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

  eliminarDato(idRol: number){
    this.rolService.eliminar(idRol).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe este rol.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El rol se ha eliminado correctamente.", "success");
        this.obtenerDatos();
      }else {
        this.showToast("Se ha presentado un error al eliminar.", "danger");
      }
    }).catch(error => {
      console.log(error);
    });
  }

  cargarDatos(datosModal: RolModel){
    this.tituloModal = "Editar";
    this.rol = { ...datosModal };
    this.visibleModal = true;
  }

  editarDato(){
    this.rolService.editar(this.rol).then(data => {
      let resp = data as any;
      if (resp['code'] == '400') {
        this.showToast("Ya existe un rol con este nombre.", "warning");
      } else if (resp['code'] == '200'){
        this.showToast("El rol se ha editado correctamente.", "success");
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
    this.rol.acceso = undefined;
    this.rol.descripcion = undefined
    this.rol.rol = undefined;
    this.rol.estado = undefined;
    this.rol.idRol = undefined;
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
