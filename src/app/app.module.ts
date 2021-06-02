import { PedidosComponent } from './pages/_aliado/pedidos/pedidos.component';

import { LoginService } from './_service/login.service';
import { environment } from './../environments/environment';

import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductosComponent } from './pages/productos/productos.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './pages/inicio/inicio.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { Not404Component } from './pages/not404/not404.component';
import { Error500Component } from './pages/error500/error500.component';

import { IniciodomiciliarioComponent } from './pages/_domiciliario/iniciodomiciliario/iniciodomiciliario.component';
import { InicioaliadoComponent } from './pages/_aliado/inicioaliado/inicioaliado.component';
import { InicioadminComponent } from './pages/_admin/inicioadmin/inicioadmin.component';
import { Invalid401Component } from './pages/invalid401/invalid401.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { JwtModule, JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { AliadosComponent } from './pages/_admin/aliados/aliados.component';
import { DomiciliariosComponent } from './pages/_admin/domiciliarios/domiciliarios.component';
import { AliadosrechazadosComponent } from './pages/_admin/aliadosrechazados/aliadosrechazados.component';
import { DomiciliariosrechazadosComponent } from './pages/_admin/domiciliariosrechazados/domiciliariosrechazados.component';
import { AliadosaceptadosComponent } from './pages/_admin/aliadosaceptados/aliadosaceptados.component';
import { DomiciliariosaceptadosComponent } from './pages/_admin/domiciliariosaceptados/domiciliariosaceptados.component';
import { PedidosdisponiblesComponent } from './pages/_domiciliario/pedidosdisponibles/pedidosdisponibles.component';
import { MispedidosComponent } from './pages/_domiciliario/mispedidos/mispedidos.component';
import { MihistorialComponent } from './pages/_domiciliario/mihistorial/mihistorial.component';
import { RespuestaSolicitudesComponent } from './pages/_admin/domiciliarios/respuesta-solicitudes/respuesta-solicitudes.component';
import { RevisionComponent } from './pages/_admin/aliadosrechazados/revision/revision.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PedidosterminadosComponent } from './pages/_aliado/pedidosterminados/pedidosterminados.component';
import { ProductosactivosComponent } from './pages/_aliado/productosactivos/productosactivos.component';
import { AgregarProductoComponent } from './pages/_aliado/agregar-producto/agregar-producto.component';
import { EditaractivosComponent } from './pages/_aliado/productosactivos/editaractivos/editaractivos.component';
import { RecuperarPasswordComponent } from './pages/recuperar-password/recuperar-password.component';
import { ProductodesactivoComponent } from './pages/_aliado/productodesactivo/productodesactivo.component';
import { PerfiladminComponent } from './pages/_admin/perfiladmin/perfiladmin.component';
import { HistorialpedidosComponent } from './pages/historialpedidos/historialpedidos.component';
import { HistorialenprocesoComponent } from './pages/historialenproceso/historialenproceso.component';
import { DtlpedidosComponent } from './pages/historialpedidos/dtlpedidos/dtlpedidos.component';
import { DtlprocesoComponent } from './pages/historialenproceso/dtlproceso/dtlproceso.component';
import { RespuestaprocesoComponent } from './pages/historialenproceso/respuestaproceso/respuestaproceso.component';


export  function jwtOptionsFactory(loginService) {
  return {
    tokenGetter: async () => {
      let respuesta = loginService.estaLogeado();
      let intentos = 0;
      if(respuesta == 1 || respuesta == 2){
        if(respuesta == 2){
          //expiro el token
          refresLogin();
        while(true){
          await delay(1500);
          respuesta = loginService.estaLogeado();
          if(respuesta==1){
            break;
          }
          intentos++;
          if(intentos == 3){
            //se intenta 3 veces sin resultados
            //borramos datos guardadados
            
            loginService.cerrarSesion();
            return null;
          }
        }
  
      }

        let tk = sessionStorage.getItem(environment.TOKEN);
        return tk != null ? tk : '';

      } else {
        return null;
      }
    },
    allowedDomains : ["52.67.179.68:8081"],
    disallowedRoutes: ["http://52.67.179.68:8081/api/admin/login"]
  }
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
export function refresLogin(){
  let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
  //let auxcorre = CryptoJS.AES.decrypt(environment.CORREO.trim(), decodedToken.nameid.trim()).toString();

  this.loginService.login( sessionStorage.getItem("email"), sessionStorage.getItem("password"),  "1").subscribe(data =>{
    sessionStorage.setItem(environment.TOKEN, data);
  });
}
@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    LoginComponent,
    RegistrarComponent,
    InicioComponent,
    CarritoComponent,
    Not404Component,
    Error500Component,
    IniciodomiciliarioComponent,
    InicioaliadoComponent,
    InicioadminComponent,
    Invalid401Component,
    PerfilComponent,
    AliadosComponent,
    DomiciliariosComponent,
    AliadosrechazadosComponent,
    DomiciliariosrechazadosComponent,
    AliadosaceptadosComponent,
    DomiciliariosaceptadosComponent,
    PedidosdisponiblesComponent,
    MispedidosComponent,
    MihistorialComponent,
    RespuestaSolicitudesComponent,
    RevisionComponent,
    PedidosComponent,
    PedidosterminadosComponent,
    ProductosactivosComponent,
    AgregarProductoComponent,
    EditaractivosComponent,
    RecuperarPasswordComponent,
    ProductodesactivoComponent,
    PerfiladminComponent,
    HistorialpedidosComponent,
    HistorialenprocesoComponent,
    DtlpedidosComponent,
    DtlprocesoComponent,
    RespuestaprocesoComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
      JwtModule.forRoot({
        jwtOptionsProvider: {
          provide: JWT_OPTIONS,
          useFactory: jwtOptionsFactory,
          deps: [LoginService]
        }
      })
    ],
    providers: [
      { provide: LocationStrategy, useClass: HashLocationStrategy },
      LoginService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
