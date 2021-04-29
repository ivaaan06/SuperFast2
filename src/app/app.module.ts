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

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    LoginComponent,
    RegistrarComponent,
    InicioComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
