
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../_service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { EMPTY } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: string;
  contrasenia: string;
  constructor(private loginservice: LoginService,
              private router: Router ,
              private snackBar: MatSnackBar
              ) { }
  test: Date = new Date();
    focus;
    focus1;
    myDate = new Date().toLocaleString("en-US");
  ngOnInit(): void {
  }

  navegarHaciaIniciousuario(){
    this.loginservice.login(this.correo, this.contrasenia,  "1").subscribe(data => {
      sessionStorage.setItem(environment.TOKEN, data);
      const helper = new JwtHelperService();
 
      const decodedToken = helper.decodeToken(data);
       // cifrar variables
       sessionStorage.setItem("email", btoa(this.correo));
       sessionStorage.setItem("password", btoa(this.contrasenia));

      const rol = decodedToken.role;
      if (rol == 1){
      this.router.navigateByUrl('/productos');
      }else if (rol == 2){
      this.router.navigateByUrl('/perfil_aliado');
      }else if (rol == 3){
      this.router.navigateByUrl('/perfil_domiciliario');
      }else if (rol == 4){
      this.router.navigateByUrl('/perfil_admin');
      }
      // capturar error
    }, err => {
      // Si hay error
      if (err.status == 401){
        this.snackBar.open('Usuario y/o cotrasena inconrrecta', 'Advertrencia', {
          duration: 2000,
        });
      } else {
        this.router.navigate([`/error/${err.status}/${err.statusText}`]);
      }
    });
  }

}
