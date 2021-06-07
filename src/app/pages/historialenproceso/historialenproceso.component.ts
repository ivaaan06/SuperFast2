import { Comentario } from './../../_model/Comentario';
import { RespuestaprocesoComponent } from './respuestaproceso/respuestaproceso.component';
import { DetalleService } from './../../_service/detalle.service';
import { DetallePedido } from './../../_model/DetallePedido';
import { Usuario } from './../../_model/Usuario';
import { Pedidos_s } from './../../_model/Pedido_s';
import { MatTableDataSource } from '@angular/material/table';
import { PerfilusuarioService } from './../../_service/perfilusuario.service';
import { ConsultaService } from './../../_service/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-historialenproceso',
  templateUrl: './historialenproceso.component.html',
  styleUrls: ['./historialenproceso.component.css']
})
export class HistorialenprocesoComponent implements OnInit {
  detallePedido = Array<DetallePedido>();
  displayedColumns: string[] = ['id_pedido', 'fecha', 'comentario_cliente', 'comentario_aliado', 'estado_pedido', 'estado_domicilio_id', 'nombre_aliado','compras', 'valor_total', 'cancelar'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  private comentario = new Comentario();
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private consultaService : ConsultaService
    ,public dialog: MatDialog, private detalleService: DetalleService,
    private snackBar : MatSnackBar){ }

  ngOnInit(): void {
  
    this.refrescar();
  }
  refrescar(){
   
    this.consultaService.pedidosEnProceso().subscribe(data =>{
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
  abrirDialogo(id: number) {
    const dialogRef = this.dialog.open(RespuestaprocesoComponent, {
      width: '300px',
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.opcion == "Aceptar") {
            this.consultaService.cancelarPedido("Cancelar",id).subscribe(data=>{
              this.snackBar.open('Pedido Cancelado', 'Successful', {
                duration: 2000,
              });
              this.refrescar();
            });
          }else{
            console.log("cancelar")
            this.refrescar();
          }
      });
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
