import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Usuario } from '../_model/Usuario';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private url: string = environment.HOST+'/api/Registrar/PostInsertar_Usuario';

  public barraProgreso = new Subject<string>();

  constructor(private http: HttpClient) { }

  registroUsuario(usuario: Usuario){
    console.log(usuario);
    return this.http.post<string>(`${this.url}`, usuario)
  }
}
