import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { Usuario } from './../../../_model/Usuario';
import { Component, OnInit } from '@angular/core';
import { type } from 'os';

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrls: ['./perfiladmin.component.css']
})
export class PerfiladminComponent implements OnInit {
  usuario = new Usuario() ;
  usuario2 = new Usuario() ;
  confirmar : string;
  des:string;
constructor(private perfilusuarioService: PerfilusuarioService, private snackBar : MatSnackBar)  { }

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
      
    });
   }
}
