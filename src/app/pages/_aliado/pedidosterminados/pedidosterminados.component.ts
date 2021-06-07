import { MatSnackBar } from '@angular/material/snack-bar';
import { Comentario } from './../../../_model/Comentario';
import { Estado_aliado } from './../../../_model/Estado_aliado';
import { Usuario } from './../../../_model/Usuario';
import { AliadoService } from './../../../_service/aliado.service';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { DomiciliarioService } from './../../../_service/domiciliario.service';
import { MatSort } from '@angular/material/sort';
import { DetalleService } from './../../../_service/detalle.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { DetallePedido } from './../../../_model/DetallePedido';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { Pedidos_s } from './../../../_model/Pedido_s';
import { Component, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pedidosterminados',
  templateUrl: './pedidosterminados.component.html',
  styleUrls: ['./pedidosterminados.component.css']
})
export class PedidosterminadosComponent implements OnInit {
  displayedColumns: string[] = ['id_pedido', 'fecha', 'comentario_cliente', 'comentario_aliado',  'compras', 'nombre_estado_ped','cambiar'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  serializedDate = new FormControl((new Date()).toISOString());
  selected = 'Cambiar';
  private comentario = new Comentario();
  private estado = new Estado_aliado();
  @Output()detallePedido = Array<DetallePedido>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute,private aliadoService: AliadoService, 
    private detalleService:DetalleService,
    private perfilServce : PerfilusuarioService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.refrescar();
  }
  refrescar(){
    
      this.aliadoService.pedido_sAliadoTerminados().subscribe(data2 =>{
        console.log(data2);
        this.dataSource = new MatTableDataSource(data2);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator = this.paginator;
     
      });
    
  
  }
  verDetalle(detalle : DetallePedido[]){
    this.detallePedido = detalle;
    this.detalleService.getDetalle(this.detallePedido);
    this.detalleService.setAuteriorUrl('/pedido_s_terminados');
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
  enviarComentario(idpedido : number){
    this.comentario.Id_pedido= idpedido;
    let texto= ((document.getElementById("comentario") as HTMLInputElement).value);
    this.comentario.Comentario_aliado=texto;
    this.comentario.CommandName="Guardar";
    console.log(this.comentario);
    this.aliadoService.enviarComentario(this.comentario).subscribe(data =>{
      this.snackBar.open('Comentario Modificado', 'successful', {
        duration: 2000,
      });
      this.refrescar();
    });
    
  }
}


