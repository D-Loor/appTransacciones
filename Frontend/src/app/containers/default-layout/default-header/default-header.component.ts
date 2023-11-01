import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent implements OnInit{

  @Input() sidebarId: string = "sidebar";

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)
  public nombreUsuario : any;
  public rolUsuario : any;
  public imagenUsuario : any = "";

  constructor(private classToggler: ClassToggleService, private ruta: Router) {
    super();
  }
  ngOnInit(){
    this.nombreUsuario = localStorage.getItem('nombreUser');
    this.rolUsuario = localStorage.getItem('rolUser');
    this.imagenUsuario= "http://127.0.0.1:8000"+localStorage.getItem('imagenUser');
  }
  
  cerrarCesion(){
    localStorage.removeItem('sesionLoginInicio');
    localStorage.removeItem('imagenUser');
    localStorage.removeItem('idUsuario');
    localStorage.removeItem('rolUser');
    localStorage.removeItem('nivelAcceso');
    localStorage.removeItem('cedulaUser');
    localStorage.removeItem('nombreUser');

    this.ruta.navigate(["./"]);

  }
}
