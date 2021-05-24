
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
import { JwtModule } from '@auth0/angular-jwt';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { AliadosComponent } from './pages/_admin/aliados/aliados.component';
import { DomiciliariosComponent } from './pages/_admin/domiciliarios/domiciliarios.component';
import { AliadosrechazadosComponent } from './pages/_admin/aliadosrechazados/aliadosrechazados.component';
import { DomiciliariosrechazadosComponent } from './pages/_admin/domiciliariosrechazados/domiciliariosrechazados.component';
import { AliadosaceptadosComponent } from './pages/_admin/aliadosaceptados/aliadosaceptados.component';
import { DomiciliariosaceptadosComponent } from './pages/_admin/domiciliariosaceptados/domiciliariosaceptados.component';

export function tokenGetter(){
  let tk = sessionStorage.getItem('access_token');
  return tk != null ? tk : '';
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
    DomiciliariosaceptadosComponent  
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
      config:{
      tokenGetter : tokenGetter,
      //que url se le quiere colocar el token automaticamente
      allowedDomains : ["52.67.179.68:8081/api"],
      disallowedRoutes: ["http://52.67.179.68:8081/api/admin/login"],
    }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
