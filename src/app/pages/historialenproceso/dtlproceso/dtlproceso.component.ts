import { ConsultaService } from './../../../_service/consulta.service';
import { DetalleService } from './../../../_service/detalle.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DetallePedido } from './../../../_model/DetallePedido';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dtlproceso',
  templateUrl: './dtlproceso.component.html',
  styleUrls: ['./dtlproceso.component.css']
})
export class DtlprocesoComponent implements OnInit {
  detallePedido2 = Array<DetallePedido>();
  displayedColumns2: string[] = ['nombreprodet', 'descripcion', 'cantidad', 'especprodaliado', 'v_unitario', 'v_total'];
  dataSource2 = new MatTableDataSource<DetallePedido>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private consultaService : ConsultaService
    ,public dialog: MatDialog,private detalleService : DetalleService) { }

  ngOnInit(): void {
    this.detallePedido2= this.detalleService.setDetalle();
    
    this.dataSource2 = new MatTableDataSource(this.detallePedido2);
    this.dataSource2.sort= this.sort;
    this.dataSource2.paginator = this.paginator;
  }
 
 
}
