import { DetalleService } from './../../../_service/detalle.service';
import { DetallePedido } from './../../../_model/DetallePedido';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Usuario } from './../../../_model/Usuario';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { DomiciliarioService } from './../../../_service/domiciliario.service';
import { Pedidos_s } from './../../../_model/Pedido_s';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pedidosdisponibles',
  templateUrl: './pedidosdisponibles.component.html',
  styleUrls: ['./pedidosdisponibles.component.css']
})
export class PedidosdisponiblesComponent implements OnInit {
  usuario= new Usuario();
  detallePedido = Array<DetallePedido>();
  displayedColumns: string[] = ['id_pedido', 'fecha', 'comentario_cliente', 'comentario_aliado', 'nombre_estado_ped', 'nombre_aliado', 'direccion_aliado', 'compras', 'nombre_cliente','direccion_cliente','telefono_cliente','nombre_estado_domicilio','cambiar'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  serializedDate = new FormControl((new Date()).toISOString());
  selected = 'Cambiar';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute,private domiciliarioService : DomiciliarioService,
    private detalleService: DetalleService) { }

  ngOnInit(): void {
    
    this.refrescar();
  }
  refrescar(){
    this.domiciliarioService.getPedidosDisponibles().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator = this.paginator;
     
    });
  }
  cambiarEstado(opcion : string){
    console.log(opcion);
  }
  verDetalle(detalle : DetallePedido[]){
    this.detallePedido = detalle;
    this.detalleService.getDetalle(this.detallePedido);
    this.detalleService.setAuteriorUrl('/pedido_s_terminados');
  }


}
