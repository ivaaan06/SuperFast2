import { Producto } from './../_model/Producto';
import {TrackHttpError} from 'src/app/_model/TrackHttpError';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private url: string = environment.HOST+'/api/comunicacion';
  
  constructor(private http: HttpClient) { }
  
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
}
