
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
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-historialpedidos',
  templateUrl: './historialpedidos.component.html',
  styleUrls: ['./historialpedidos.component.css']
})
export class HistorialpedidosComponent implements OnInit {
  displayedColumns: string[] = ['id_pedido', 'fecha', 'comentario_cliente', 'comentario_aliado', 'estado_pedido', 'estado_domiciliario_id', 'nombre_aliado','compras', 'valor_total'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  usuario = new Usuario();
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private consultaService : ConsultaService
    ,public dialog: MatDialog, private perfilusuarioService: PerfilusuarioService,
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

}
