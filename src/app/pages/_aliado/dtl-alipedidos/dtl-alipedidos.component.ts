import { DetallePedido } from './../../../_model/DetallePedido';
import { ConsultaService } from './../../../_service/consulta.service';
import { DetalleService } from './../../../_service/detalle.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dtl-alipedidos',
  templateUrl: './dtl-alipedidos.component.html',
  styleUrls: ['./dtl-alipedidos.component.css']
})
export class DtlAlipedidosComponent implements OnInit {

  detallePedido2 = Array<DetallePedido>();
  displayedColumns2: string[] = ['nombreprodet', 'descripcion', 'cantidad', 'especprodaliado', 'v_unitario', 'v_total'];
  dataSource2 = new MatTableDataSource<DetallePedido>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private consultaService : ConsultaService
    ,public dialog: MatDialog,private detalleService : DetalleService,
    private router: Router) { }

  ngOnInit(): void {
    this.detallePedido2= this.detalleService.setDetalle();
    console.log(this.detallePedido2);
    this.dataSource2 = new MatTableDataSource(this.detallePedido2);
    this.dataSource2.sort= this.sort;
    this.dataSource2.paginator = this.paginator;
  }
  regresar(){
    console.log(this.detalleService.getAnteriorUrl());
    if(this.detalleService.getAnteriorUrl() == null){
      this.router.navigateByUrl('/pedidosdisponibles');
    }else{
      this.router.navigateByUrl(this.detalleService.getAnteriorUrl());
    }
    
  }
}
