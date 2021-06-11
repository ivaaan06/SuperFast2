import { RespuestaSolicitud } from './../_model/RespuestaSolicitud';
import { Solicitud } from '../_model/Solicitud';
import { Subject } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {

  private url: string = environment.HOST+'/api/comununicacion/GetMostrarSolicitudDomiciliario';

  public barraProgreso = new Subject<string>();
  constructor(private http: HttpClient) { }

  
  solicitudesAliados(){
    return this.http.get<any[]>(environment.HOST+'/api/comunicacion/GetMostrarSolicitudAliado');
  }
  solicitudesDomiciliarios(){
    return this.http.get<Solicitud[]>(environment.HOST+'/api/comununicacion/GetMostrarSolicitudDomiciliario');
  }
  DomiciliariosRechazados(){
    return this.http.get<any[]>(environment.HOST+'/api/comunicacion/GetMostrarSolicitudDomiciliarioRechazado');
  }
  AliadosRechazados(){
    return this.http.get<Solicitud[]>(environment.HOST+'/api/comunicacion/GetMostrarSolicitudAliadoRechazado');
  }
  DomiciliariosAceptados(){
    return this.http.get<any[]>(environment.HOST+'/api/comunicacion/GetMostrarSolicitudDomiciliarioAceptado');
  }
  AliadosAceptados(){
    return this.http.get<Solicitud[]>(environment.HOST+'/api/comunicacion/GetMostrarSolicitudAliadoAceptado');
  }
  //respuesta a solicitudes
  RespuestaDomiciliario(respuesta : RespuestaSolicitud){
    return this.http.put(environment.HOST+'/api/Administrador/PutLGV_domiciliariiosaprobar', respuesta);
  }
  RespuestaAliado(respuesta : RespuestaSolicitud){
    return this.http.put(environment.HOST+'/api/Administrador/putLGV_aliadoaprobar', respuesta);
  }
  RespuestaAliadosAceptados(respuesta : RespuestaSolicitud){
    return this.http.put(environment.HOST+'/api/user/PutLGV_solicitudaliadosaceptados', respuesta);
  }
  RespuestaAliadosRechazados(respuesta : RespuestaSolicitud){
    return this.http.put(environment.HOST+'/api/user/PutLGV_aliadorechazado', respuesta);
  }
  RespuestaDomiciliariosAceptados(respuesta : RespuestaSolicitud){
    return this.http.put(environment.HOST+'/api/user/PutLGV_domiciliariosaceptados', respuesta);
  }
  RespuestaDomiciliariosRechazados(respuesta : RespuestaSolicitud){
    return this.http.put(environment.HOST+'/api/user/PutLGV_domiciliariorechazado', respuesta);
  }


 

}

