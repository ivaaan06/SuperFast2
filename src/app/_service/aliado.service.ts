
import { PerfilusuarioService } from './perfilusuario.service';
import { AddProducto } from './../_model/AddProducto';
import { Comentario } from './../_model/Comentario';
import { Estado_aliado } from './../_model/Estado_aliado';

import { Estado } from './../_model/Estado';
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
  private usuario = new Usuario();
  constructor(private http: HttpClient,private perfilService : PerfilusuarioService) { }

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

  agregarProducto(producto : AddProducto){
    return this.http.post(environment.HOST+'/api/Aliado/PostLBTN_guardarproducto', producto);
  }
  productosActivos(usuario: Usuario){
        return this.http.post<any[]>(environment.HOST+'/api/comunicacion/MostrarProducto', usuario);
      
  }
    
  productosDesactivados(usuario:Usuario){
    
    return this.http.post<any[]>(environment.HOST+'/api/comunicacion/PostMostrarProductoDesactivado', usuario);
  }
  productoId(id : number){
    return this.http.get<any>(environment.HOST+'/api/Aliado/GetLmostrar?id3='+id);
  }
  actualizarProducto(producto:Producto){
    return this.http.post<any>(environment.HOST+'/api/Aliado/PostLBTN_GuardarCambios',producto);
  }
  cambiarEstadoMisPedidos(estado:Estado_aliado){
 
    return this.http.put(environment.HOST+'/api/Pedidosaliado/PutLDDL_Categoria',estado);
  }
  enviarComentario(comentario:Comentario){
    return this.http.put(environment.HOST+'/api/Pedidosaliado/PutLGV_pedidos',comentario);
  }

}
