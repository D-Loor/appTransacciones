import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from './../../../services/usuarios.service';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  cedula: string = '';
  password: string = '';

  placement = ToasterPlacement.TopEnd;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  constructor(public usuariosService: UsuariosService, private router: Router) { }

  ngOnInit(): void {

  }

  validarCredenciales() {
    if (this.cedula == null || this.cedula == "" || this.password == null || this.password == "") {
      this.showToast('Credenciales Incorrectas.!', 'danger');
    } else {
      this.usuariosService.validarLogin(this.cedula, this.password).then(data => {
        let resp = data as any;
        if (resp['code'] === "204") {
          this.showToast('Credenciales Incorrectas.!', 'danger');
        } else {
          localStorage.setItem('sesionLoginInicio', 'iniciar');
          localStorage.setItem('imagenUser', "");
          localStorage.setItem('idUsuario', resp['data'].idUsuario);
          localStorage.setItem('rolUser', resp['data'].rol_usuario.rol);
          localStorage.setItem('rolAcceso', resp['data'].rol_usuario.acceso);
          localStorage.setItem('cedulaUser', resp['data'].cedula);
          localStorage.setItem('nombreUser', resp['data'].nombres + " " + resp['data'].apellidos);
          
          this.router.navigate(['/estadisticas']);
          this.cedula = "";
          this.password = "";
        }
      }).catch(error => {
        console.log(error);
      });
    }
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
}
