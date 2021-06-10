import { DetallePedido } from './../../../_model/DetallePedido';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ConsultaService } from './../../../_service/consulta.service';
import { DetalleService } from './../../../_service/detalle.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dtlmihistorial',
  templateUrl: './dtlmihistorial.component.html',
  styleUrls: ['./dtlmihistorial.component.css']
})
export class DtlmihistorialComponent implements OnInit {
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
    
    this.dataSource2 = new MatTableDataSource(this.detallePedido2);
    this.dataSource2.sort= this.sort;
    this.dataSource2.paginator = this.paginator;
  }
  regresar(){
    
    if(this.detalleService.getAnteriorUrl() == null){
      this.router.navigateByUrl('/pedido_s_terminados');
    }else{
      this.router.navigateByUrl(this.detalleService.getAnteriorUrl());
    }
    
  }
}
