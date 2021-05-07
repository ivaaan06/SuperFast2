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


  constructor(private http: HttpClient) { }

  login(usuario: string, contrasena: string , rolid : string){
    let login : Login;
    login = new Login;
    login.correo = usuario;
    login.Contrasenia = contrasena;
    login.AplicacionID = rolid;
    
    return this.http.post<any>(`${this.url2}/login`,login );
  }
  
}
