import { MatPaginator } from '@angular/material/paginator';

import { SolicitudesService } from './../../../_service/solicitudes.service';

import { MatTableDataSource } from '@angular/material/table';
import { Solicitud } from '../../../_model/Solicitud';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-aliados',
  templateUrl: './aliados.component.html',
  styleUrls: ['./aliados.component.css']
})
export class AliadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();

  constructor(public route: ActivatedRoute, private solicitudesService: SolicitudesService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngOnInit(): void {
    
    this.solicitudesService.solicitudesAliados().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      
    });
  }

}
