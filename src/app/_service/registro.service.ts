import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from '../_model/Usuario';
import { RegDomiciliario} from '../_model/RegDomiciliario';
import { RegAliado} from '../_model/RegAliado';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private url: string = environment.HOST+'/api/Registrar/PostInsertar_Usuario';

  public barraProgreso = new Subject<string>();

  constructor(private http: HttpClient) { }

  registroUsuario(usuario: Usuario){
  
    return this.http.post<string>(`${this.url}`, usuario)
  }

  VerificacionAliado(correo: String){
    return this.http.get(environment.HOST+'/api/GenerarToken/PostLB_Recuperar?TB_Correo='+correo);
  }

  registroAliado(regaliado: RegAliado){
    return this.http.post<string>(environment.HOST+'/api/Registrar_aliado/PostLBTN_registrar1',regaliado);
  }

  registroDomiciliario(regdomiciliario: RegDomiciliario){
    return this.http.post<string>(environment.HOST+'/api/Registrar_Domiciliario/Registrar_domiciliario',regdomiciliario);
  }
}
