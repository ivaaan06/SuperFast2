import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilusuarioService } from './../../_service/perfilusuario.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/_model/Usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
    usuario = new Usuario() ;
    usuario2 = new Usuario() ;
    confirmar : string;
    

  constructor(private perfilusuarioService: PerfilusuarioService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usuario= data;
      console.log(data);
    });
  }

  guardarCambios(){
    let confir= ((document.getElementById("confirmar") as HTMLInputElement).value);
    
  
      //ejecutar servicio
      this.perfilusuarioService.guardarUsuario(this.usuario2);
        this.snackBar.open('Datos actualizados correctamente', 'Succesfull', {
          duration: 2000,
        });
      
     
    
    
   }   

}

