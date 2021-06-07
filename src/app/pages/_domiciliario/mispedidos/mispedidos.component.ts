import { Estado } from './../../../_model/Estado';
import { DetalleService } from './../../../_service/detalle.service';
import { DetallePedido } from './../../../_model/DetallePedido';
import { Usuario } from './../../../_model/Usuario';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { ActivatedRoute } from '@angular/router';
import { DomiciliarioService } from './../../../_service/domiciliario.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Pedidos_s } from './../../../_model/Pedido_s';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-mispedidos',
  templateUrl: './mispedidos.component.html',
  styleUrls: ['./mispedidos.component.css']
})
export class MispedidosComponent implements OnInit {
  estado = new Estado();
  displayedColumns: string[] = ['id_pedido', 'fecha', 'comentario_cliente', 'comentario_aliado', 'nombre_estado_ped', 'nombre_aliado', 'direccion_aliado', 'compras', 'nombre_cliente','direccion_cliente','telefono_cliente','nombre_estado_domicilio','cambiar'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  serializedDate = new FormControl((new Date()).toISOString());
  usuario= new Usuario();
  selected = 'Cambiar';
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @Output()detallePedido = Array<DetallePedido>();
  constructor(public route: ActivatedRoute,private domiciliarioService : DomiciliarioService,
    private perfilService: PerfilusuarioService, private detalleService:DetalleService) { }

  ngOnInit(): void {
    this.refrescar();
  }
  refrescar(){
    this.perfilService.getUser().subscribe(data =>{
      this.usuario=data;
      this.domiciliarioService.getMisPedidos(this.usuario).subscribe(data =>{
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator = this.paginator;
      });
    });
    
  }
  verDetalle(detalle : DetallePedido[] ){
    this.detallePedido = detalle;
    this.detalleService.getDetalle(this.detallePedido);
    this.detalleService.setAuteriorUrl('/mispedidos');
  }
  cambiarEstado(aux : number, id_pedido : number, domiciliario_id: number, estado_domicilio_id: number){
    this.estado.Id_pedido = id_pedido;
    this.estado.Domiciliario_id = domiciliario_id;
    this.estado.Estado_domicilio_id = aux;
    this.domiciliarioService.cambiarEstadoMisPedidos(this.estado).subscribe(data =>{ 
      this.refrescar();
      this.reset();
    });
  }
  reset(){
    this.selected="Seleccione"
  }
  
}
