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
    public pdfPath;
    pdfURL: any;
    public message: string;
    sellersPermitFile: any;

  //base64s
  sellersPermitString: string;

    constructor(private registroService: RegistroService,
                private router: Router,
                private _snackBar: MatSnackBar) { }
  
    ngOnInit(): void {
    }
  
    guardarCambios(){
      let nombreComercial= ((document.getElementById("signin-name") as HTMLInputElement).value);
      let correo= ((document.getElementById("signin-email") as HTMLInputElement).value);
      let direccion= ((document.getElementById("signin-adress") as HTMLInputElement).value);
      let telefono= ((document.getElementById("signin-number") as HTMLInputElement).value);
      let contrasenia= ((document.getElementById("signin-pass") as HTMLInputElement).value);
      let nit = ((document.getElementById("signin-document") as HTMLInputElement).value);
      let actComercial = ((document.getElementById("signin-actComercial") as HTMLInputElement).value);  
  
      this.usuario.nombre1 = "foto";
      this.usuario.nombre2 = "rut";
      this.usuario.nombre = nombreComercial;
      this.usuario.correo = correo;
      this.usuario.contrasenia = contrasenia;
      this.usuario.direccion = direccion;
      this.usuario.telefono = telefono;
      this.usuario.documento = nit;
      this.usuario.imagen_logo= "";
      this.usuario.extension_logo="jpg";
      this.usuario.actividad_comercial=actComercial;
      this.usuario.rut=this.sellersPermitString;
      this.usuario.extension_rut="pdf" 
      

      //ejecutar servicio
      this.registroService.barraProgreso.next("1");
      this.registroService.registroAliado(this.usuario).subscribe(data =>{
        
        this.openSnackBar('Aliado registrado satisfactoriamente','Info');
        this.registroService.barraProgreso.next("2");
        this.router.navigate(['/login']);
      });
        
      
    }
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action, {
          duration: 3000
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
  