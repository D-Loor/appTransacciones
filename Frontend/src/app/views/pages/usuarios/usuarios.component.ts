import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { RolModel } from 'src/app/models/rol.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  confirmarPass: any;
  tituloModal = "";
  visibleModal = false;
  visibleModalConfirmacion = false;
  formularioValido: boolean = false;
  placement = ToasterPlacement.TopEnd;
  listaUsuarios: UsuarioModel[] = [];
  listaRoles: RolModel[] = [];
  usuario: UsuarioModel = new UsuarioModel;
  pagina: number = 1;
  totalPaginas: number = 1;
  itemsPaginado: number = 1;
  url = ""; imagen = "0";
  imagenUsuario : any;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public usuarioService: UsuariosService, public rolService: RolesService) {

  }

  ngOnInit() {
    this.tituloModal = "Agregar";
    this.obtenerDatos();
  }

  obtenerDatos() {
    this.listaUsuarios = [];
    this.obtenerDatosRoles();
    this.usuarioService.obtener("*", this.itemsPaginado, this.pagina).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Usuarios registrados.!', 'info');
      } else {
        this.totalPaginas = Number(resp['data']['last_page']);
        this.listaUsuarios = resp['data']['data'];
        console.log("lista ", this.listaUsuarios);
      }
    }).catch(error => {
      console.log(error);
    });
  }

  registrarDatos() {
    if(this.validarPassword()){
      this.usuarioService.guardar(this.usuario, this.imagenUsuario).then(data => {
        let resp = data as any;
        debugger
        if (resp['code'] == '400') {
          this.showToast("Ya existe un usuario con esta cedula.", "warning");
        } else if (resp['code'] == '200'){
          this.showToast("El usuario se ha creado correctamente.", "success");
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

  eliminarDato(){
    this.usuarioService.eliminar(this.usuario.idUsuario || 0).then(data => {
      let resp = data as any;
      if (resp['code'] == '204') {
        this.showToast("No existe este usuario.", "warning");
      } else if (resp['code'] == '200'){
        this.visibleModalConfirmacion = false;
        this.showToast("El usuario se ha eliminado correctamente.", "success");
        this.obtenerDatos();
      }else {
        this.showToast("Se ha presentado un error al eliminar.", "danger");
      }
    }).catch(error => {
      this.showToast("Se ha presentado un error al eliminar.", "danger");
      console.log(error);
    });
  }

  cargarDatos(datosModal: UsuarioModel){
    this.tituloModal = "Editar";
    this.usuario = { ...datosModal };
    this.visibleModal = true;
  }

  editarDato(){
    if(this.validarPassword()){
      this.usuarioService.editar(this.usuario).then(data => {
        let resp = data as any;
        if (resp['code'] == '400') {
          this.showToast("Ya existe un usuario con este nombre.", "warning");
        } else if (resp['code'] == '200'){
          this.showToast("El usuario se ha editado correctamente.", "success");
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
    this.usuario.idUsuario = undefined
    this.usuario.idRol = undefined;
    this.usuario.nombres = undefined;
    this.usuario.apellidos = undefined;
    this.usuario.cedula = undefined;
    this.usuario.password = undefined;
    this.usuario.estado = undefined;
    this.confirmarPass = undefined;
    this.imagenUsuario = undefined;
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

  validarPassword():boolean {
    if(this.usuario.password === this.confirmarPass){
      return true;
    }
    this.showToast("Las contraseñas ingresadas no coinciden!", "warning");
    return false;
  }

  obtenerDatosRoles() {
    this.listaRoles = [];
    this.rolService.obtener("1", 100, 1).then(data => {
      let resp = data as any;
      if (resp['code'] === "204") {
        this.showToast('No existen Roles registrados.!', 'info');
      } else {
        this.listaRoles = resp['data']['data'];
        console.log("lista ", this.listaRoles);
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

  public onSelectFile(event:any) {
    if (event.target.files && event.target.files[0]) {
      
      let tipoImagen = event.target.files[0].type;
      if( tipoImagen == "image/jpeg"  || tipoImagen == "image/png" || tipoImagen == "image/jpg"){

        this.imagenUsuario = event.target.files[0];
        var reader = new FileReader();
        this.imagen="1";

        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (event) => {
          this.url = event.target!.result as string;
        }
      
      }else{
        this.showToast('Selecciones una imagen con formato jpg/jpeg/png.', 'warning');
        this.imagen="0";
      }
      
    }
  }

 
}
