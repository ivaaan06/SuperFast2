import { DetalleService } from './../../../_service/detalle.service';
import { DetallePedido } from './../../../_model/DetallePedido';
import { Pedidos_s } from './../../../_model/Pedido_s';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { DomiciliarioService } from './../../../_service/domiciliario.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mihistorial',
  templateUrl: './mihistorial.component.html',
  styleUrls: ['./mihistorial.component.css']
})
export class MihistorialComponent implements OnInit {
  displayedColumns: string[] = ['id_pedido', 'fecha', 'comentario_cliente', 'comentario_aliado', 'nombre_estado_ped', 'nombre_aliado', 'direccion_aliado', 'compras', 'nombre_cliente','direccion_cliente','telefono_cliente','nombre_estado_domicilio'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  serializedDate = new FormControl((new Date()).toISOString());
  selected = 'Cambiar';
  @Output()detallePedido = Array<DetallePedido>();


  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute,private domiciliarioService: DomiciliarioService, 
    private detalleService:DetalleService) { }

  ngOnInit(): void {
    this.refrescar();
  }
  refrescar(){
    this.domiciliarioService.getMiHistorial().subscribe(data =>{
      console.log(data);
    });
  }
  verDetalle(detalle : DetallePedido[]){
    this.detallePedido = detalle;
    this.detalleService.getDetalle(this.detallePedido);
    this.detalleService.setAuteriorUrl('/mihistorial');
  }

}
