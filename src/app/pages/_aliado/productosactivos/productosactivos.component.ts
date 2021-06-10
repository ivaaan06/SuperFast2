import { MatSnackBar } from '@angular/material/snack-bar';
import { element } from 'protractor';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { Usuario } from './../../../_model/Usuario';
import { MatDialog } from '@angular/material/dialog';
import { AliadoService } from './../../../_service/aliado.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../../_model/Producto';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-productosactivos',
  templateUrl: './productosactivos.component.html',
  styleUrls: ['./productosactivos.component.css']
})
export class ProductosactivosComponent implements OnInit {
  displayedColumns: string[] = ['nombre_producto', 'descripcion_producto', 'precio_producto', 'imagen_producto1', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();
  usuario = new Usuario();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private aliadoService : AliadoService
    ,public dialog: MatDialog, private perfilusuarioService: PerfilusuarioService,
    private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.perfilusuarioService.getUser().subscribe(data =>{
      this.usuario =  data;
      this.refrescar();
    });
    
  }
  refrescar(){
    this.aliadoService.productosActivos(this.usuario).subscribe(data =>{
      console.log()
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  desactivar(producto :Producto){
    producto.estado_producto= 2;
    this.aliadoService.actualizarProducto(producto).subscribe(data=>{
        this.snackBar.open('Producto Desactivado', 'successful', {
          duration: 2000,
          
        });
        this.refrescar();
  });
  }
}
