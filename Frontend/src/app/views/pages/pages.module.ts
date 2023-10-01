import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { ButtonModule, CardModule, FormModule, GridModule, ToastModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { FormsModule } from '@angular/forms';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposCategoriasComponent } from './tipos-categorias/tipos-categorias.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { StocksComponent } from './stocks/stocks.component';
import { TableModule, UtilitiesModule, PaginationModule, BadgeModule, ModalModule } from '@coreui/angular';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    Page404Component,
    Page500Component,
    RolesComponent,
    UsuariosComponent,
    TiposCategoriasComponent,
    CategoriasComponent,
    ProductosComponent,
    StocksComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    CardModule,
    ButtonModule,
    GridModule,
    IconModule,
    FormModule,
    FormsModule,
    TableModule,
    UtilitiesModule,
    PaginationModule,
    BadgeModule,
    ModalModule,
    ToastModule
  ]
})
export class PagesModule {
}
