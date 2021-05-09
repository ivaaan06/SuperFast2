
import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../_service/login.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: string;
  contrasenia: string;
  constructor(private loginservice : LoginService,  
              private router :Router ) { }
  test : Date = new Date();
    focus;
    focus1;
    

  ngOnInit(): void {
    //this.loginservice.login(this.correo, this.contrasenia).subscribe(data =>{
      //console.log(data);
    //});
  }
  navegarHaciaIniciousuario(){
    //this.loginservice.login(this.correo,this.contrasenia).subscribe(data => {
      //console.log(data);
    //});
    this.loginservice.login(this.correo, this.contrasenia,  "1").subscribe(data =>{
      //console.log(data);
      sessionStorage.setItem(environment.TOKEN, data);
      const helper = new JwtHelperService();
 
      const decodedToken = helper.decodeToken(data);
      const expirationDate = helper.getTokenExpirationDate(data);
      const isExpired = helper.isTokenExpired(data);
      console.log(decodedToken);
      console.log(expirationDate);
      console.log(isExpired);
      if(data != null){
      this.router.navigateByUrl('/inicio');
      }else{
        
      }
    });
  }
}
