
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
  
  
  constructor(private loginservice : LoginService,  
              private router :Router ,
              private snackBar : MatSnackBar
              ) { }
  test : Date = new Date();
    focus;
    focus1;
    
    myDate = new Date().toLocaleString("en-US");
  ngOnInit(): void {
    
   console.log(this.myDate);
  }
  navegarHaciaIniciousuario(){
    this.loginservice.login(this.correo, this.contrasenia,  "1").subscribe(data =>{
      //console.log(data);
     
      
      
      sessionStorage.setItem(environment.TOKEN, data);
      const helper = new JwtHelperService();
 
      const decodedToken = helper.decodeToken(data);
     
      console.log(decodedToken);
       //cifrar variables

       
       sessionStorage.setItem("email", btoa(this.correo));
       sessionStorage.setItem("password", btoa(this.contrasenia));
      
      //environment.CONTRASENIA = CryptoJS.AES.encrypt(this.contrasenia,decodedToken.nameid).toString();
      
      let rol = decodedToken.role;
      
      if(rol == 1)
      this.router.navigateByUrl('/inicio');
      else if(rol == 2)
      this.router.navigateByUrl('/inicioaliado');
      else if(rol == 3)
      this.router.navigateByUrl('/iniciodomiciliario');
      else if(rol == 4)
      this.router.navigateByUrl('/inicioadmin');
      //capturar errorq
    },err =>{
      //Si hay error

      
      if(err.status == 401){
        this.snackBar.open('Usuario y/o cotrasena inconrrecta', 'Advertrencia', {
          duration: 2000,
        });
      } else {
        //this.router.navigateByUrl('/inicio');
        this.router.navigate([`/error/${err.status}/${err.statusText}`]);
      }


    });
  }

}

