import { Component, OnInit, ViewChild } from '@angular/core';
import { ToasterComponent, ToasterPlacement } from '@coreui/angular';
import { NotificarComponent } from './../notify/notificar/notificar.component';

@Component({
  selector: 'app-locales',
  templateUrl: './locales.component.html',
  styleUrls: ['./locales.component.scss']
})
export class LocalesComponent implements OnInit{

  tituloModal = "";
  formularioValido : boolean = false;
  placement = ToasterPlacement.TopEnd;

  @ViewChild(ToasterComponent) toaster!: ToasterComponent;

  registrarDatos(){

  }
  
  ngOnInit(): void {
    this.tituloModal = "Agregar un nuevo Local"
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
