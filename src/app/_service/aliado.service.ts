import { Pedidos_s } from './../_model/Pedido_s';
import { Auxiliar } from './../_model/Auxiliar';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Producto } from './../_model/Producto';
import { environment } from './../../environments/environment';
import { Usuario } from './../_model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AliadoService {
  auxiliar = new Auxiliar();
  constructor(private http: HttpClient) { }

  pedido_sAliado(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
    return this.http.post<Pedidos_s[]>(environment.HOST+'/api/comunicacion/PostObtenerEstadoPedido', this.auxiliar);
  }
  
  pedido_sAliadoTerminados(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
    return this.http.post<Pedidos_s[]>(environment.HOST+'/api/comunicacion/PostObtenerEstadoPedidoTerminado', this.auxiliar);
  }

  agregarProducto(producto : Producto){
    return this.http.post(environment.HOST+'/api/Aliado/PostLBTN_guardarproducto', producto);
  }
  productosActivos(usuario : Usuario){
    return this.http.post<any[]>(environment.HOST+'/api/comunicacion/MostrarProducto', usuario);
  }
  productosDesactivados(usuario : Usuario){
    return this.http.post<any[]>(environment.HOST+'/api/comunicacion/PostMostrarProductoDesactivado', usuario);
  }
  productoId(id : number){
    return this.http.get<Producto>(environment.HOST+'/api/Aliado/GetLmostrar?id3='+id);
  }
  actualizarProducto(producto:Producto){
    return this.http.post<any>(environment.HOST+'/api/Aliado/PostLBTN_GuardarCambios',producto);
  }

}
