
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from './../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilusuarioService } from './../../_service/perfilusuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_model/Usuario';
import { Validators } from '@angular/forms';
import { ConstantPool } from '@angular/compiler';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    usuario = new Usuario() ;
    usuario2 = new Usuario() ;
    confirmar : string;
    des:string;
    private loca:any;
  constructor(private perfilusuarioService: PerfilusuarioService, private snackBar : MatSnackBar) { 
    

  }

  ngOnInit(): void {
        
    this.refrescar();
    
  }

  guardarCambios(){
    let nombre= ((document.getElementById("nombre") as HTMLInputElement).value);
    let apellido= ((document.getElementById("apellido") as HTMLInputElement).value);
    let correo= ((document.getElementById("email") as HTMLInputElement).value);
    let documneto= ((document.getElementById("documento") as HTMLInputElement).value);
    let telefono= ((document.getElementById("telefono") as HTMLInputElement).value);
    let password= ((document.getElementById("password") as HTMLInputElement).value);

    
      
    if(nombre == "" || apellido == "" || correo == "" || documneto == "" || telefono == "" || password==""){
      this.snackBar.open('No se permiten campos vacios', 'Advertrencia', {
        duration: 2000,
      });
      this.refrescar();
    }else { 
    this.usuario.nombre = nombre;
    this.usuario.apellido = apellido;
    this.usuario.correo = correo;
    this.usuario.documento = documneto;
    this.usuario.telefono = telefono;
    this.usuario.contrasenia = password;
    
     


      //ejecutar servicio

      
      this.perfilusuarioService.guardarUsuario(this.usuario).subscribe(data =>{
        this.refrescar();
        this.snackBar.open('Datos actualizados correctamente', 'Succesfull', {
          duration: 2000,
        });
      });
        
      }
      
    
   }   
   refrescar(){
    this.des = localStorage.getItem("email");
    
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usuario= data;
      this.loca = data.direccion;
      
    });
    
   }
   
   /*cancelarCambios(){
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usuario= data;
    });
  }*/
 

}

