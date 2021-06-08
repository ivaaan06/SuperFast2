import { Comentario } from './../_model/Comentario';
import { AddCarrito } from './../_model/AddCarrito';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Auxiliar } from './../_model/Auxiliar';
import { PerfilusuarioService } from './perfilusuario.service';
import { Pedidos_s } from './../_model/Pedido_s';
import { Usuario } from './../_model/Usuario';
import { Producto } from './../_model/Producto';
import {TrackHttpError} from 'src/app/_model/TrackHttpError';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { observable, Observable, throwError } from 'rxjs';
import { catchError, take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private url: string = environment.HOST+'/api/comunicacion';
  usuario = new Usuario();
  auxiliar = new Auxiliar();
  constructor(private http: HttpClient,private perfilusuarioService :PerfilusuarioService) { }
  
  retornar() {
    return this.http.get<Producto[]>(`${this.url}/GetMostrarProductoInicio`);
  }

  searchCharacters(query = ''):Observable<Producto[] | TrackHttpError> {
    const filter = `${environment.HOST}/api/comunicacion/GetMostrarProductoInicioBusqueda?busqueda=${query.toLowerCase()}`;
    return this.http.get<Producto[]>(filter)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  private handleHttpError(
    error:HttpErrorResponse
  ):Observable<TrackHttpError>{

    let dataError = new TrackHttpError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = 'A ocurrido un error.';
    return throwError(dataError);
  }

  getDetails(id: number) {
    return this.http.get<Producto>(`${environment.HOST}/${id}`)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }


  //api/comunicacion/GetRangoPrecios?ValorMinimo={ValorMinimo}&ValorMaximo={ValorMaximo}
  filtroPrecio(ValorMinimo=0,ValorMaximo=ValorMinimo*7):Observable<Producto[] | TrackHttpError>{
    const filter = `${environment.HOST}/api/comunicacion/GetRangoPrecios?ValorMinimo=${ValorMinimo}&ValorMaximo=${ValorMaximo}`;
    return this.http.get<Producto[]>(filter)
    .pipe(catchError((err) => this.handleHttpError(err)));
  }

  historialPedidos(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
    return this.http.post<any>(environment.HOST+'/api/comunicacion/PostObtenerComprasUsuarioEntregado', this.auxiliar);  
  }

  pedidosEnProceso(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
    return this.http.post<Pedidos_s[]>(environment.HOST+'/api/comunicacion/PostObtenerComprasUsuario', this.auxiliar);
  }
  cancelarPedido(comadname : string ,id :number){
      return this.http.get(environment.HOST+'/api/PedidosCliente/GetCancelarPedidoCliente?comandname='+comadname+'&Id_pedido='+id);
  }

  numeroPedidos(){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    const filter = `${environment.HOST}/api/Inicio/Getmostrarcantidadtotal?idusuario=${nameid}`;
    return this.http.get<Producto[]>(filter);
  }

  addCarrito(addCarrito:AddCarrito){
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
 
    return this.http.post<Pedidos_s[]>(environment.HOST+'/api/Inicio/AgregarPedidosCarrito', addCarrito);
  }
  enviarComentario(comentario:Comentario){
    return this.http.put(environment.HOST+'/api/PedidosCliente/PutLGV_pedidocarrito0',comentario);
  }
  /*contProducto(especificaciones='',cantidad:number){
    return this.http.post(environment.HOST+'/api/Inicio/AgregarPedidoCarrito');
  }*/
}
