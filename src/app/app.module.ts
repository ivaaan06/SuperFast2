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
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
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
import { delay } from 'rxjs/operators';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

export  function jwtOptionsFactory(loginService) {
  return {
    tokenGetter: async () => {
      let respuesta = this.loginService.estaLogeado();
      let intentos =0;
      if(respuesta== 1 || respuesta==2){
        if(respuesta==2){
          //expiro el token
        this.refresLogin();
        while(true){
          await this.delay(1500);
          respuesta = this.loginService.estaLogeado();
          if(respuesta==1){
            break;
          }
          intentos++;
          if(intentos == 3){
            //se intenta 3 veces sin resultados
            //borramos datos guardadados
            
            this.loginService.cerrarSesion();
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
    allowedDomains : ["52.67.179.68:8081/api"],
    disallowedRoutes: ["http://52.67.179.68:8081/api/admin/login"]
  }
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
    RevisionComponent
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
