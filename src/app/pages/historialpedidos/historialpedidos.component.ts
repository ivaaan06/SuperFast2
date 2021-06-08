import { Comentario } from './../../_model/Comentario';
import { DetalleService } from './../../_service/detalle.service';
import { element } from 'protractor';
import { DetallePedido } from './../../_model/DetallePedido';
import { FormControl } from '@angular/forms';

import { Pedidos_s } from './../../_model/Pedido_s';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PerfilusuarioService } from './../../_service/perfilusuario.service';
import { ConsultaService } from './../../_service/consulta.service';
import { ActivatedRoute } from '@angular/router';
import { Producto } from './../../_model/Producto';
import { MatTableDataSource } from '@angular/material/table';
import { Usuario } from './../../_model/Usuario';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-historialpedidos',
  templateUrl: './historialpedidos.component.html',
  styleUrls: ['./historialpedidos.component.css']
})
 

export class HistorialpedidosComponent implements OnInit {
  
  @Output()detallePedido = Array<DetallePedido>();

  private comentario = new Comentario();
  displayedColumns: string[] = ['id_pedido', 'fecha', 'comentario_cliente', 'comentario_aliado', 'estado_pedido', 'estado_domicilio_id', 'nombre_aliado','compras', 'valor_total'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  usuario = new Usuario();

  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private consultaService : ConsultaService
    ,public dialog: MatDialog, private detalleService : DetalleService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    
    this.refrescar();
    
  }
  refrescar(){
  
    this.consultaService.historialPedidos().subscribe(data =>{
      console.log(data);
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  verDetalle(detalle : DetallePedido[]){
    this.detallePedido = detalle;
    this.detalleService.getDetalle(this.detallePedido);
  }
  enviarComentario(idpedido : number){
    this.comentario.Id_pedido= idpedido;
    let texto= ((document.getElementById("comentario") as HTMLInputElement).value);
    this.comentario.Comentario_aliado=texto;
    this.comentario.CommandName="Guardar";
    console.log(this.comentario);
    this.consultaService.enviarComentario(this.comentario).subscribe(data =>{
      this.snackBar.open('Comentario Modificado', 'successful', {
        duration: 2000,
      });
      this.refrescar();
    });
    
  }

}
