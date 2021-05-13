import { Invalid401Component } from './pages/invalid401/invalid401.component';
import { InicioaliadoComponent } from './pages/_aliado/inicioaliado/inicioaliado.component';
import { IniciodomiciliarioComponent } from './pages/_domiciliario/iniciodomiciliario/iniciodomiciliario.component';
import { InicioadminComponent } from './pages/_admin/inicioadmin/inicioadmin.component';
import { GuardianService } from './_service/guardian.service';
import { Error500Component } from './pages/error500/error500.component';
import { Not404Component } from './pages/not404/not404.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';


const routes: Routes = [
  //Admin
  {path: 'inicioadmin', component: InicioadminComponent , canActivate:[ GuardianService]},
  //Domiciliario
  {path: 'iniciodomiciliario', component: IniciodomiciliarioComponent , canActivate:[ GuardianService]},
  //Aliado
  {path: 'inicioaliado', component: InicioaliadoComponent , canActivate:[ GuardianService]},
  //Usuario normal
  {path: 'productos', component: ProductosComponent, canActivate:[ GuardianService]},
  {path: 'inicio', component: InicioComponent , canActivate:[ GuardianService]},
  {path: 'carrito', component: CarritoComponent ,canActivate:[ GuardianService]},
  {path: 'perfil', component: PerfilComponent ,canActivate:[ GuardianService]},
  //sin guardian
  
  {path: 'registrar', component: RegistrarComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: '401Invalid', component: Invalid401Component},
  {path: 'error/:status/:statusText', component: Error500Component},
  {path: '**', component: Not404Component}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
