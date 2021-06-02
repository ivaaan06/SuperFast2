import { DetallePedido } from './../_model/DetallePedido';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  detallePedido = Array<DetallePedido>();
  anteriorUrl : string;
  constructor() { }

  getDetalle(detalle : DetallePedido[]){
    this.detallePedido = detalle;
  }

  setDetalle(){
    return this.detallePedido;
  }
  setAuteriorUrl(url : string){
    this.anteriorUrl=url;
  }

  getAnteriorUrl(){
    return this.anteriorUrl;
  }
}
