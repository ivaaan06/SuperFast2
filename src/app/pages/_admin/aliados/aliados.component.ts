import { MatSnackBar } from '@angular/material/snack-bar';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';
import { RespuestaSolicitud } from './../../../_model/RespuestaSolicitud';
import { RespuestaSolicitudesComponent } from './../domiciliarios/respuesta-solicitudes/respuesta-solicitudes.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  respuestaSolicitud = new RespuestaSolicitud();
  constructor(public route: ActivatedRoute, private solicitudService: SolicitudesService,
              public dialog: MatDialog ,
              private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    
    this.refrescar();
  }
  abrirDialogo(id: number, hojavida: string) {
    const dialogRef = this.dialog.open(RespuestaSolicitudesComponent, {
      width: '300px',
      data: {id: id, hojavida: hojavida}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.opcion == "Aceptar") {
        console.log(id);
            this.respuestaSolicitud.Id=id;
            this.respuestaSolicitud.comandname="Rechazar";
            let token = sessionStorage.getItem(environment.TOKEN);
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(token);
            let correo=decodedToken.unique_name;
            this.respuestaSolicitud.correo=correo;
            this.solicitudService.RespuestaAliado(this.respuestaSolicitud).subscribe(data=>{
              this.refrescar();
            });
          }else{
            console.log("cancelar")
            this.refrescar();
          }
      });
}

Aceptar(id: number, hojavida: string){
    this.respuestaSolicitud.Id=id;
   
    this.respuestaSolicitud.comandname="Aceptar";
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let correo=decodedToken.unique_name;
    this.respuestaSolicitud.correo=correo;
      this.solicitudService.RespuestaAliado(this.respuestaSolicitud).subscribe(data=>{
        this.snackBar.open('Solicitud aceptada correctamente', 'successful', {
          duration: 2000,
        });
        this.refrescar();
      });
}
 
refrescar(){
  this.solicitudService.solicitudesAliados().subscribe(data =>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort= this.sort;
    this.dataSource.paginator = this.paginator;
   
  });
}
}
