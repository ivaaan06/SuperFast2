import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegDomiciliario } from 'src/app/_model/RegDomiciliario';
import { Usuario } from 'src/app/_model/Usuario';
import {RegistroService} from 'src/app/_service/registro.service';

@Component({
    selector: 'app-registrarDomiciliario',
    templateUrl: './registrarDomiciliario.component.html',
    styleUrls: ['./registrarDomiciliario.component.css']
  })
  export class RegistrarDomiciliarioComponent implements OnInit {
    
    usuario = new RegDomiciliario() ;
    des:string;
  
    constructor(private registroService: RegistroService,
                private router: Router,
                private _snackBar: MatSnackBar) { }
  
    ngOnInit(): void {
    }
  
    guardarCambios(){
      let hv = ((document.getElementById("signin-hv") as HTMLInputElement).value);
      let nombre= ((document.getElementById("signin-name") as HTMLInputElement).value);
      let apellido= ((document.getElementById("signin-lastname") as HTMLInputElement).value);
      let correo= ((document.getElementById("signin-email") as HTMLInputElement).value);
      let telefono= ((document.getElementById("signin-number") as HTMLInputElement).value);
      let contrasenia= ((document.getElementById("signin-pass") as HTMLInputElement).value);
      let documento = ((document.getElementById("signin-document") as HTMLInputElement).value);
      let tipVehi = ((document.getElementById("signin-vehiculo") as HTMLInputElement).value);
  
      this.usuario.archivo=hv;
      this.usuario.nombre = nombre;
      this.usuario.apellido = apellido;
      this.usuario.correo = correo;
      this.usuario.contrasenia = contrasenia;
      this.usuario.telefono = telefono;
      this.usuario.documento = documento;
      this.usuario.tipovehiculo=tipVehi;
      this.usuario.extension=".pdf";
       
      //ejecutar servicio
      this.registroService.barraProgreso.next("1");
      this.registroService.registroDomiciliario(this.usuario).subscribe(data =>{
        this.openSnackBar('Domiciliario registrado satisfactoriamente','Info');
        this.registroService.barraProgreso.next("2");
        this.router.navigate(['/login']);
      }, err =>{
        
        this.openSnackBar("Capturar Error",'Error');
      });
        
      
    }

    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
          duration: 3000
      });
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
  