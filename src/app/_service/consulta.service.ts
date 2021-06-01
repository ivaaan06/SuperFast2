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

  mostrarFiltro(query=''):Observable<Producto[]>{
    const filter = `${environment.HOST}/api/comunicacion/GetMostrarProductoInicioBusqueda?busqueda=${query.toLowerCase()}`;
    return this.http.get<Producto[]>(filter);
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
  historialPedidos(){
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usuario= data;
      console.log(data);
    });
    this.auxiliar.Id= this.usuario.id;
    return this.http.post<any>(environment.HOST+'/api/comunicacion/PostObtenerComprasUsuario', this.auxiliar);  
  }

  pedidosEnProceso(){
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usuario= data;
      console.log(data);
    });
    this.auxiliar.Id= this.usuario.id;
    return this.http.post<Pedidos_s[]>(environment.HOST+'/api/comunicacion/PostObtenerComprasUsuario', this.auxiliar.Id);
  }
}
