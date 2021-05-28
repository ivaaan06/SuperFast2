import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilusuarioService } from './../../_service/perfilusuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.component.html',
  styleUrls: ['./recuperar-password.component.css']
})
export class RecuperarPasswordComponent implements OnInit {
  
  constructor(private recuperarService : PerfilusuarioService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  recuperar(){
    let correo= ((document.getElementById("email") as HTMLInputElement).value);
    this.recuperarService.recuperarPassword(correo).subscribe(data =>{
      this.snackBar.open('Correo enviado', 'success', {
        duration: 2000,
      });
    },err =>{
      this.snackBar.open('Ocurrio un error, por favor verificar correo', 'Advertrencia', {
        duration: 2000,
      });
    });
  }
}
