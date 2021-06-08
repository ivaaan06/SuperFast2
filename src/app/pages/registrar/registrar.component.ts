import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/_model/Usuario';
import {RegistroService} from 'src/app/_service/registro.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})
export class RegistrarComponent implements OnInit {
  
  usuario = new Usuario() ;
  des:string;

  constructor(private registroService: RegistroService,
              private router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  guardarCambios(){
    let nombre= ((document.getElementById("signin-name") as HTMLInputElement).value);
    let apellido= ((document.getElementById("signin-lastname") as HTMLInputElement).value);
    let correo= ((document.getElementById("signin-email") as HTMLInputElement).value);
    let direccion= ((document.getElementById("signin-adress") as HTMLInputElement).value);
    let telefono= ((document.getElementById("signin-number") as HTMLInputElement).value);
    let contrasenia= ((document.getElementById("signin-pass") as HTMLInputElement).value);
    let documento = ((document.getElementById("signin-document") as HTMLInputElement).value);


    this.usuario.id_rol=1;
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    this.usuario.correo = correo;
    this.usuario.contrasenia = contrasenia;
    this.usuario.direccion = direccion;
    this.usuario.telefono = telefono;
    this.usuario.documento = documento;
    this.usuario.imagenperfil= "imagen";
    this.usuario.auditoria="papita";
    this.usuario.aprobacion=15;
      
    //ejecutar servicio
    this.registroService.barraProgreso.next("1");
    this.registroService.registroUsuario(this.usuario).subscribe(data =>{
      this.openSnackBar('Usuario registrado satisfactoriamente','Info');
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
