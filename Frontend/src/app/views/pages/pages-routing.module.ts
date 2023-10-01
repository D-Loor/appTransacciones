import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposCategoriasComponent } from './tipos-categorias/tipos-categorias.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { LocalesComponent } from './locales/locales.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { StocksComponent } from './stocks/stocks.component';

const routes: Routes = [
  {
    path: '404',
    component: Page404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: Page500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: 'roles',
    component: RolesComponent,
    data: {
      title: 'Roles'
    }
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
      title: 'Usuarios'
    }
  },
  {
    path: 'categorias/tipos',
    component: TiposCategoriasComponent,
    data: {
      title: 'Tipos Categorías'
    }
  },
  {
    path: 'categorias/categorias',
    component: CategoriasComponent,
    data: {
      title: 'Categorías'
    }
  },
  {
    path: 'productos',
    component: ProductosComponent,
    data: {
      title: 'Productos'
    }
  },
  {
    path: 'locales',
    component: LocalesComponent,
    data: {
      title: 'Locales'
    }
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent,
    data: {
      title: 'Transacciones'
    }
  },
  {
    path: 'stocks',
    component: StocksComponent,
    data: {
      title: 'Stocks'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
