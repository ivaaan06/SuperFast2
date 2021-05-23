import { Subject } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/Solicitud';

@Component({
  selector: 'app-domiciliariosrechazados',
  templateUrl: './domiciliariosrechazados.component.html',
  styleUrls: ['./domiciliariosrechazados.component.css']
})
export class DomiciliariosrechazadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private solicituService : SolicitudesService) { }

  ngOnInit(): void {
      
      this.solicituService.DomiciliariosRechazados().subscribe(data =>{
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
      
    
      
  }

}
