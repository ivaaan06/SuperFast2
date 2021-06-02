import { Usuario } from './../_model/Usuario';
import { Auxiliar } from './../_model/Auxiliar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { Pedidos_s } from './../_model/Pedido_s';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DomiciliarioService {
  usuario = new Usuario();
  auxiliar = new Auxiliar();
  private url: string = environment.HOST;
  constructor(private http: HttpClient) { }

  getPedidosDisponibles(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
   
    return this.http.post<Pedidos_s[]>(this.url+'/api/comunicacion/ObtenerPedidoDomiciliario',this.auxiliar);
  }
  getMisPedidos(usuario :Usuario){
    console.log(usuario);
    return this.http.post<Pedidos_s[]>(this.url+'/api/comunicacion/PostObtenerMiPedidoDomiciliario',usuario);
  }
  getMiHistorial(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
   
    return this.http.post<Pedidos_s[]>(this.url+'/api/comunicacion/PostObtenerMiPedidosEntregadosDomiciliario',this.auxiliar);
  }
}
