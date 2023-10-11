import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page404Component } from './page404/page404.component';
import { Page500Component } from './page500/page500.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RolesComponent } from './roles/roles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { TiposComponent } from './tipos/tipos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ProductosComponent } from './productos/productos.component';
import { LocalesComponent } from './locales/locales.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { StocksComponent } from './stocks/stocks.component';
import { nivel1Guard } from './../../guards/nivel1.guard';
import { nivel2Guard } from './../../guards/nivel2.guard';
import { nivel3Guard } from './../../guards/nivel3.guard';
import { nivel4Guard } from './../../guards/nivel4.guard';

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
    }, 
    canActivate: [nivel1Guard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    data: {
      title: 'Usuarios'
    }, 
    canActivate: [nivel1Guard]
  },
  {
    path: 'categorias/tipos',
    component: TiposComponent,
    data: {
      title: 'Tipos Categorías'
    }, 
    canActivate: [nivel3Guard]
  },
  {
    path: 'categorias/categorias',
    component: CategoriasComponent,
    data: {
      title: 'Categorías'
    }, 
    canActivate: [nivel3Guard]
  },
  {
    path: 'productos',
    component: ProductosComponent,
    data: {
      title: 'Productos'
    }, 
    canActivate: [nivel3Guard]
  },
  {
    path: 'locales',
    component: LocalesComponent,
    data: {
      title: 'Locales'
    }, 
    canActivate: [nivel2Guard]
  },
  {
    path: 'transacciones',
    component: TransaccionesComponent,
    data: {
      title: 'Transacciones'
    }, 
    canActivate: [nivel3Guard]
  },
  {
    path: 'stocks',
    component: StocksComponent,
    data: {
      title: 'Stocks'
    }, 
    canActivate: [nivel4Guard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
