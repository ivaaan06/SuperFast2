import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pedidosdisponibles',
  templateUrl: './pedidosdisponibles.component.html',
  styleUrls: ['./pedidosdisponibles.component.css']
})
export class PedidosdisponiblesComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

}
