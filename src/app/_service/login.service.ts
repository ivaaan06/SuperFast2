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
  private urlCerrarSession:string =environment.HOST+'/api/CerrarSession/PostPage_Load?usuario1='

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
      //cancelar no hay nadie
      return 0;
    }
  }
  cerrarSesion(): void{
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    let login : Login;
    login = new Login;
    login.correo = decodedToken.unique_name;
    login.Contrasenia = decodedToken.certpublickey;
    login.AplicacionID = "1";
    this.http.post<any>(`${this.urlCerrarSession}`,nameid);
    //this.http.post(this.urlCerrarSession, Login).subscribe();
    //puede ser put
    //return this.http.post(this.urlCerrarSession , login).subscribe();
    //parte grafica 
    sessionStorage.setItem(environment.TOKEN, null);
    this.router.navigateByUrl('/login');
    
  }


}
