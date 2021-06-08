import { MatTableDataSource } from '@angular/material/table';
import { DetalleService } from './../../../_service/detalle.service';
import { ConsultaService } from './../../../_service/consulta.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DetallePedido } from './../../../_model/DetallePedido';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dtlcarrito',
  templateUrl: './dtlcarrito.component.html',
  styleUrls: ['./dtlcarrito.component.css']
})
export class DtlcarritoComponent implements OnInit {

  detallePedido2 = Array<DetallePedido>();
  displayedColumns2: string[] = ['nombreprodet', 'descripcion', 'cantidad', 'especprodaliado', 'v_unitario', 'v_total'];
  dataSource2 = new MatTableDataSource<DetallePedido>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private consultaService : ConsultaService
    ,public dialog: MatDialog,private detalleService : DetalleService) { }

  ngOnInit(): void {
    this.detallePedido2= this.detalleService.setDetalle();
    console.log(this.detallePedido2);
    this.dataSource2 = new MatTableDataSource(this.detallePedido2);
    this.dataSource2.sort= this.sort;
    this.dataSource2.paginator = this.paginator;
  }
  
}
