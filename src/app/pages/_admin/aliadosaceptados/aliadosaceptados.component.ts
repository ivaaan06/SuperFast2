import { MatPaginator } from '@angular/material/paginator';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/Solicitud';

@Component({
  selector: 'app-aliadosaceptados',
  templateUrl: './aliadosaceptados.component.html',
  styleUrls: ['./aliadosaceptados.component.css']
})
export class AliadosaceptadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private solicituService : SolicitudesService) { }

  ngOnInit(): void {
    this.solicituService.DomiciliariosAceptados().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      
    });
  }

}
