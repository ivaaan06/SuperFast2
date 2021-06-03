import { Estado_aliado } from './../../../_model/Estado_aliado';
import { DomiciliarioService } from './../../../_service/domiciliario.service';
import { DetalleService } from './../../../_service/detalle.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Pedidos_s } from './../../../_model/Pedido_s';
import { DetallePedido } from './../../../_model/DetallePedido';
import { AliadoService } from './../../../_service/aliado.service';
import { Usuario } from './../../../_model/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { Component, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {
  displayedColumns: string[] = ['id_pedido', 'fecha', 'comentario_cliente', 'comentario_aliado',  'compras', 'nombre_estado_ped','cambiar'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  serializedDate = new FormControl((new Date()).toISOString());
  selected = 'Cambiar';
  private estado = new Estado_aliado();
  @Output()detallePedido = Array<DetallePedido>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute,private aliadoService: AliadoService, 
    private detalleService:DetalleService,
    private perfilServce : PerfilusuarioService) { }

  ngOnInit(): void {
    this.refrescar();
  }
  refrescar(){
    
      this.aliadoService.pedido_sAliado().subscribe(data2 =>{
        console.log(data2);
        this.dataSource = new MatTableDataSource(data2);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator = this.paginator;
     
      });
    
  
  }
    verDetalle(detalle : DetallePedido[]){
      this.detallePedido = detalle;
      this.detalleService.getDetalle(this.detallePedido);
      this.detalleService.setAuteriorUrl('/pedido_s');
    }
    cambiarEstado(aux : number, id_pedido : number, aliado_id: number, estado_pedido: number){
      this.estado.Id_pedido = id_pedido;
      this.estado.idseleccion = aux;
      
      this.aliadoService.cambiarEstadoMisPedidos(this.estado).subscribe(data =>{
        this.refrescar();
        this.reset();
        
      });
    }
    reset(){
      this.selected="Seleccione"
    }
}
