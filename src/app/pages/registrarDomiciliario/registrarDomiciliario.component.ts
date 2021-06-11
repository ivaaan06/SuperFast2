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

    public pdfPath;
    pdfURL: any;
    public message: string;
  
  sellersPermitFile: any;

  //base64s
  sellersPermitString: string;

    usuario = new RegDomiciliario() ;
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
      let telefono= ((document.getElementById("signin-number") as HTMLInputElement).value);
      let contrasenia= ((document.getElementById("signin-pass") as HTMLInputElement).value);
      let documento = ((document.getElementById("signin-document") as HTMLInputElement).value);
      let tipVehi = ((document.getElementById("signin-vehiculo") as HTMLInputElement).value);
      let confirmarcontrasenia= ((document.getElementById("password")as HTMLInputElement).value);
    if(contrasenia != confirmarcontrasenia ){
      this._snackBar.open('Las Contraseñas NO Coinsiden', 'Advertencia', {
        duration: 2000,
      });
    }else{
  
      this.usuario.archivo=this.sellersPermitString;
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
  }
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
          duration: 3000,
      });
    }

    preview(event: any): void {
      let files: FileList = event.target.files;
  
      if(files.length == 0)
        return;
  
        var mimeType = files[0].type;
        if (mimeType.match(/pdf\/*/) == null) {
          this.message = "Only pdf are supported.";
          return;
        }
  
        var reader = new FileReader();
        this.pdfPath = files;
        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.pdfURL = reader.result; 
        }
        
        this.picked(event);
    }
  
  
    public picked(event) {
          let fileList: FileList = event.target.files;
          const file: File = fileList[0];
          this.sellersPermitFile = file;
          this.handleInputChange(file); //turn into base64   
    }
  
    handleInputChange(files) {
      var file = files;
      var pattern = /pdf-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }
    _handleReaderLoaded(e) {
      let reader = e.target;
      var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
      //this.imageSrc = base64result;
      this.sellersPermitString = base64result;
      
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
  