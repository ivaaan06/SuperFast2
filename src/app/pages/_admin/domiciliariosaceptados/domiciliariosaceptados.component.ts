import { SolicitudesService } from './../../../_service/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/Solicitud';

@Component({
  selector: 'app-domiciliariosaceptados',
  templateUrl: './domiciliariosaceptados.component.html',
  styleUrls: ['./domiciliariosaceptados.component.css']
})
export class DomiciliariosaceptadosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private solicituService : SolicitudesService) { }

  ngOnInit(): void {
    this.solicituService.DomiciliariosAceptados().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
    })
  }

}
