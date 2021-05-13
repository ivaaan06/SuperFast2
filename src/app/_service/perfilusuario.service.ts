import { Observable } from 'rxjs';

import { Usuario } from 'src/app/_model/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilusuarioService {
  private url : string = `${environment.HOST}/api/Perfil`;
  private url2: string = environment.HOST+'/api/Perfil';
  
  constructor(private http: HttpClient) { }

  getUser(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let id=decodedToken.nameid;
    return this.http.get<Usuario>(environment.HOST+'/api/Perfil/Getmostrarperfil?id='+id);
  }
  guardarUsuario(usuario :Usuario){
    console.log(usuario);
    
    return this.http.put(environment.HOST+'/api/Perfil/PostBTN_guardar',usuario );
    
  }
  
}
