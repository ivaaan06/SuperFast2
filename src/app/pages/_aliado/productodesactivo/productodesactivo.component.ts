import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { AliadoService } from './../../../_service/aliado.service';
import { ActivatedRoute } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Usuario } from './../../../_model/Usuario';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../../_model/Producto';
import { Component, OnInit, ViewChild } from '@angular/core';
import { RespuestaSolicitud } from 'src/app/_model/RespuestaSolicitud';

@Component({
  selector: 'app-productodesactivo',
  templateUrl: './productodesactivo.component.html',
  styleUrls: ['./productodesactivo.component.css']
})
export class ProductodesactivoComponent implements OnInit {
  displayedColumns: string[] = ['nombre_producto', 'descripcion_producto', 'precio_producto', 'imagen_producto1', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();
  usuario = new Usuario();
  respuesta = new RespuestaSolicitud();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private aliadoService : AliadoService
    ,public dialog: MatDialog, private perfilusuarioService: PerfilusuarioService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
    this.perfilusuarioService.getUser().subscribe(data =>{
      this.usuario =  data;
      this.refrescar()
    });
    
  }
  refrescar(){
    this.aliadoService.productosDesactivados(this.usuario).subscribe(data =>{
      
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator = this.paginator;
     
    });
  }
  activar(producto :Producto){
    this.respuesta.Id = producto.id;
    this.respuesta.comandname = "Activar";

    this.aliadoService.activarProducto(this.respuesta).subscribe(data=>{
      this.refrescar();
        this.snackBar.open('Producto Activado', 'successful', {
          duration: 2000,
          
        });
      
  });
  }

}
