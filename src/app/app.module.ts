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
import { FormsModule } from '@angular/forms';
import { InicioComponent } from './pages/inicio/inicio.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { Not404Component } from './pages/not404/not404.component';
import { Error500Component } from './pages/error500/error500.component';

import { IniciodomiciliarioComponent } from './pages/_domiciliario/iniciodomiciliario/iniciodomiciliario.component';
import { InicioaliadoComponent } from './pages/_aliado/inicioaliado/inicioaliado.component';
import { InicioadminComponent } from './pages/_admin/inicioadmin/inicioadmin.component';
import { Invalid401Component } from './pages/invalid401/invalid401.component';

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
    Invalid401Component
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
