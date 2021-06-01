import { DtlprocesoComponent } from './pages/historialenproceso/dtlproceso/dtlproceso.component';
import { DtlpedidosComponent } from './pages/historialpedidos/dtlpedidos/dtlpedidos.component';
import { HistorialenprocesoComponent } from './pages/historialenproceso/historialenproceso.component';
import { HistorialpedidosComponent } from './pages/historialpedidos/historialpedidos.component';
import { ProductodesactivoComponent } from './pages/_aliado/productodesactivo/productodesactivo.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { AgregarProductoComponent } from './pages/_aliado/agregar-producto/agregar-producto.component';

import { PedidosterminadosComponent } from './pages/_aliado/pedidosterminados/pedidosterminados.component';
import { PedidosComponent } from './pages/_aliado/pedidos/pedidos.component';
import { MispedidosComponent } from './pages/_domiciliario/mispedidos/mispedidos.component';
import { MihistorialComponent } from './pages/_domiciliario/mihistorial/mihistorial.component';
import { DomiciliariosaceptadosComponent } from './pages/_admin/domiciliariosaceptados/domiciliariosaceptados.component';
import { AliadosaceptadosComponent } from './pages/_admin/aliadosaceptados/aliadosaceptados.component';
import { DomiciliariosrechazadosComponent } from './pages/_admin/domiciliariosrechazados/domiciliariosrechazados.component';
import { AliadosrechazadosComponent } from './pages/_admin/aliadosrechazados/aliadosrechazados.component';
import { DomiciliariosComponent } from './pages/_admin/domiciliarios/domiciliarios.component';
import { AliadosComponent } from './pages/_admin/aliados/aliados.component';
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
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { PedidosdisponiblesComponent } from './pages/_domiciliario/pedidosdisponibles/pedidosdisponibles.component';
import { ProductosactivosComponent } from './pages/_aliado/productosactivos/productosactivos.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { EditaractivosComponent } from './pages/_aliado/productosactivos/editaractivos/editaractivos.component';
import { PerfiladminComponent } from './pages/_admin/perfiladmin/perfiladmin.component';


const routes: Routes = [
  //Admin
  {path: 'inicioadmin', component: InicioadminComponent , canActivate:[ GuardianService]},
  {path: 'aliados', component: AliadosComponent , canActivate:[ GuardianService]},
  {path: 'domiciliarios', component: DomiciliariosComponent , canActivate:[ GuardianService]},
  {path: 'aliadosrechazados', component: AliadosrechazadosComponent , canActivate:[ GuardianService]},
  {path: 'domiciliariosrechazados', component: DomiciliariosrechazadosComponent , canActivate:[ GuardianService]},
  {path: 'aliadosaceptados', component: AliadosaceptadosComponent, canActivate:[ GuardianService]},
  {path: 'domiciliariosaceptados', component: DomiciliariosaceptadosComponent , canActivate:[ GuardianService]},
  {path: 'perfil_admin', component: PerfiladminComponent ,canActivate:[ GuardianService]},
  //Domiciliario
  {path: 'iniciodomiciliario', component: IniciodomiciliarioComponent , canActivate:[ GuardianService]},
  {path: 'mihistorial', component: MihistorialComponent , canActivate:[ GuardianService]},
  {path: 'mispedidos', component: MispedidosComponent , canActivate:[ GuardianService]},
  {path: 'pedidosdisponibles', component: PedidosdisponiblesComponent , canActivate:[ GuardianService]},
  //Aliado
  {path: 'inicioaliado', component: InicioaliadoComponent , canActivate:[ GuardianService]},
  {path: 'pedido_s', component: PedidosComponent , canActivate:[ GuardianService]},
  {path: 'pedido_s_terminados', component: PedidosterminadosComponent , canActivate:[ GuardianService]},
  {path: 'agregar_productos', component: AgregarProductoComponent,canActivate:[ GuardianService]},
  {path: 'productos_activos', component: ProductosactivosComponent, canActivate:[ GuardianService]},
  {path: 'productos_desactivados', component: ProductodesactivoComponent, canActivate:[ GuardianService]},
  {path: 'editar_activos/:id', component: EditaractivosComponent, canActivate:[GuardianService] },
  
  
  //Usuario normal
  {path: 'productos', component: ProductosComponent, canActivate:[ GuardianService]},
  {path: 'inicio', component: InicioComponent , canActivate:[ GuardianService]},
  {path: 'carrito', component: CarritoComponent ,canActivate:[ GuardianService]},
  {path: 'perfil', component: PerfilComponent ,canActivate:[ GuardianService]},
  {path: 'historial_pedidos', component: HistorialpedidosComponent ,canActivate:[ GuardianService]},
  {path: 'historial_en_proceso', component: HistorialenprocesoComponent ,canActivate:[ GuardianService]},
  {path: 'dtl_pedidos', component: DtlpedidosComponent ,canActivate:[ GuardianService]},
  {path: 'dtl_proceso', component: DtlprocesoComponent ,canActivate:[ GuardianService]},
  //sin guardian
  
  {path: 'recuperar', component: RecuperarPasswordComponent},
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
