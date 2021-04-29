import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Login } from '../_model/Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url : string = `${environment.HOST}/admin`;
  constructor(private http: HttpClient) { }
  login(usuario :string, contrasena ){
    let login : Login;
    login = new Login;
    login.Correo = usuario;
    login.Contrasenia = contrasena;
    
    return this.http.post<any>(`${this.url}/login`,login );
  }
  
}
