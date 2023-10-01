import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit{
  tituloModal = "";
  formularioValido : boolean = false;

  ngOnInit(){
    this.tituloModal = "Agregar un nuevo Rol"
  }

  registrarDatos(){

  }

}
