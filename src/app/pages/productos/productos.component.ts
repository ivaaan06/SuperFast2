import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../_model/Producto';

import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  //displayedColumns: string[] = ['id', 'nombre_producto', 'descripcion_producto', 'imagen_producto1','estado_producto','id_aliado','nombre_aliado','actividad_comercial','cantidad','decision'];
  //dataSource = new MatTableDataSource<Producto>();

  constructor(private consultaservice: ConsultaService) { }

  ngOnInit(): void {
    //iniciar variables
    this.consultaservice.retornar().subscribe(data => {
     // this.dataSource = new MatTableDataSource(data);
    });
  }

}
