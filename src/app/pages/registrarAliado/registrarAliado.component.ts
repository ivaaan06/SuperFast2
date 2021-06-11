import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegAliado } from 'src/app/_model/RegAliado';
import { Usuario } from 'src/app/_model/Usuario';
import {RegistroService} from 'src/app/_service/registro.service';

@Component({
    selector: 'app-registrarAliado',
    templateUrl: './registrarAliado.component.html',
    styleUrls: ['./registrarAliado.component.css']
  })
  export class RegistrarAliadoComponent implements OnInit {
    
    usuario = new RegAliado() ;
    des:string;
  
    constructor(private registroService: RegistroService,
                private router: Router,
                private _snackBar: MatSnackBar) { }
  
    ngOnInit(): void {
    }
  
    guardarCambios(){
      let rut = ((document.getElementById("signin-rut") as HTMLInputElement).value);
      let nombreComercial= ((document.getElementById("signin-name") as HTMLInputElement).value);
      let correo= ((document.getElementById("signin-email") as HTMLInputElement).value);
      let direccion= ((document.getElementById("signin-adress") as HTMLInputElement).value);
      let telefono= ((document.getElementById("signin-number") as HTMLInputElement).value);
      let contrasenia= ((document.getElementById("signin-pass") as HTMLInputElement).value);
      let nit = ((document.getElementById("signin-document") as HTMLInputElement).value);
      let actComercial = ((document.getElementById("signin-actComercial") as HTMLInputElement).value);  
      let confirmarcontrasenia= ((document.getElementById("password")as HTMLInputElement).value);
    if(contrasenia != confirmarcontrasenia ){
      this._snackBar.open('Las Contraseñas NO Coinsiden', 'Advertencia', {
        duration: 2000,
      });
    }else{
  
      this.usuario.nombre1 = "foto";
      this.usuario.nombre2 = "rut";
      this.usuario.nombre = nombreComercial;
      this.usuario.correo = correo;
      this.usuario.contrasenia = contrasenia;
      this.usuario.direccion = direccion;
      this.usuario.telefono = telefono;
      this.usuario.documento = nit;
      this.usuario.imagen_logo= "";
      this.usuario.extension_logo="png";
      this.usuario.actividad_comercial=actComercial;
      this.usuario.rut=rut;
      this.usuario.extension_rut="pdf" 
      

      //ejecutar servicio
      this.registroService.barraProgreso.next("1");
      this.registroService.registroAliado(this.usuario).subscribe(data =>{
        
        this.openSnackBar('Aliado registrado satisfactoriamente','Info');
        this.registroService.barraProgreso.next("2");
        this.router.navigate(['/login']);
      }, err =>{
        
        this.openSnackBar("Capturar Error",'Error');
      });
        
      
    }
  }
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
          duration: 3000
      });
    }
    validacioncontrasenia( value: string){
      let contrasenia= ((document.getElementById("signin-pass") as HTMLInputElement).value);
      let confirmarcontrasenia= ((document.getElementById("password")as HTMLInputElement).value);
      if(contrasenia != '' && confirmarcontrasenia != ''){
        if(contrasenia== confirmarcontrasenia){
         this._snackBar.open('Las Contraseñas Coinsiden', 'Advertencia', {
           duration: 2000,
         });
        }
      }else{
       this._snackBar.open('Las Contraseñas NO Coinsiden', 'Advertencia', {
         duration: 2000,
       });
      }
    }
  
  }
  
  export class MyErrorStateMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
      const isSubmitted = form && form.submitted;
      return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
    }
  }
  
  export class InputErrorStateMatcherExample {
    emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
  
    matcher = new MyErrorStateMatcher();
  }
  