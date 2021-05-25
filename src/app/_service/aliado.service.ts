import { Producto } from './../_model/Producto';
import { environment } from './../../environments/environment';
import { Usuario } from './../_model/Usuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AliadoService {

  constructor(private http: HttpClient) { }

  pedido_sAliado(usuario : Usuario){
    return this.http.post(environment.HOST+'/api/comunicacion/MostrarProducto', usuario);
  }
  
  pedido_sAliadoTerminados(usuario : Usuario){
    return this.http.post(environment.HOST+'/api/comunicacion/PostObtenerEstadoPedidoTerminado', usuario);
  }

  agregarProducto(producto : Producto){
    return this.http.post(environment.HOST+'/api/Aliado/PostLBTN_guardarproducto', producto);
  }
  productosActivos(usuario : Usuario){
    return this.http.post<any[]>(environment.HOST+'/api/comunicacion/MostrarProducto', usuario);
  }
  productoId(id : number){
    return this.http.get<Producto>(environment.HOST+'/api/Aliado/GetLmostrar?id3='+id);
  }
  actualizarProducto(producto:Producto){
    return this.http.post<any>(environment.HOST+'/api/Aliado/PostLBTN_GuardarCambios',producto);
  }

}
