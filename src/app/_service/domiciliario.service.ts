import { PerfilusuarioService } from './perfilusuario.service';
import { Estado } from './../_model/Estado';
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
  constructor(private http: HttpClient,
    private perfilService:PerfilusuarioService) { }

  getPedidosDisponibles(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
    this.perfilService.getUser().subscribe(data =>{
      this.usuario= data;
    });
    return this.http.post<Pedidos_s[]>(this.url+'/api/comunicacion/PostObtenerPedidoDomiciliario',this.auxiliar);
  }
  getMisPedidos(usuario :Usuario){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
    this.perfilService.getUser().subscribe(data =>{
      this.usuario= data;
    });
    return this.http.post<Pedidos_s[]>(this.url+'/api/comunicacion/PostObtenerMiPedidoDomiciliario',this.auxiliar);
  }
  getMiHistorial(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
    this.perfilService.getUser().subscribe(data =>{
      this.usuario= data;
    });
    return this.http.post<Pedidos_s[]>(this.url+'/api/comunicacion/PostObtenerMiPedidosEntregadosDomiciliario',this.auxiliar);
  }
  cambiarEstadoMisPedidos(estado:Estado){
    console.log(estado);
    return this.http.put(this.url+'/api/Domiciliario/PutDDL_Estado',estado);
  }
}
