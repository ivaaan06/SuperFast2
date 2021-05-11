import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Login } from '../_model/Login';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private url : string = `${environment.HOST}/api/admin`;
  private url2: string = environment.HOST+'/api/admin';


  constructor(private http: HttpClient, private router :Router) { }

  login(usuario: string, contrasena: string , rolid : string){
    let login : Login;
    login = new Login;
    login.correo = usuario;
    login.Contrasenia = contrasena;
    login.AplicacionID = rolid;
    
    return this.http.post<any>(`${this.url2}/login`,login );
  }
  
  estaLogeado(): number{
    let token = sessionStorage.getItem(environment.TOKEN);
    if(token != null){
      //decodificamos el token
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token); 
      //si esta expirado
      if(isExpired == true) {
        //devuelta al login
        return 2;
      } else {
        //aun activo el usuario
        return 1;
      }
    }else{
      //cancelar no hay nadir
      return 0;
    }
  }
  cerrarSesion(): void{
    sessionStorage.setItem(environment.TOKEN, null);
    this.router.navigateByUrl('/login');
  }


}
