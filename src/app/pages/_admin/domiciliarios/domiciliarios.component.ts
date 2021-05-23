import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { Solicitud } from '../../../_model/Solicitud';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-domiciliarios',
  templateUrl: './domiciliarios.component.html',
  styleUrls: ['./domiciliarios.component.css']
})
export class DomiciliariosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();

 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private solicituService : SolicitudesService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.solicituService.solicitudesDomiciliarios().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      
    });
   
  }


  
}
