import { MatPaginator } from '@angular/material/paginator';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/Solicitud';

@Component({
  selector: 'app-aliadosrechazados',
  templateUrl: './aliadosrechazados.component.html',
  styleUrls: ['./aliadosrechazados.component.css']
})
export class AliadosrechazadosComponent implements OnInit {

  
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(public route: ActivatedRoute, private solicitudesService : SolicitudesService) { }

  ngOnInit(): void {
    this.solicitudesService.AliadosRechazados().subscribe(data=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

}
