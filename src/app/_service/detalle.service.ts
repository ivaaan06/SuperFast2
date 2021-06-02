import { DetallePedido } from './../_model/DetallePedido';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {
  detallePedido = Array<DetallePedido>();
  constructor() { }

  getDetalle(detalle : DetallePedido[]){
    this.detallePedido = detalle;
  }

  setDetalle(){
    return this.detallePedido;
  }
}
