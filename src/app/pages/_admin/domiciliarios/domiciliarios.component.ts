import { MatSnackBar } from '@angular/material/snack-bar';
import { element } from 'protractor';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';
import { RespuestaSolicitud } from './../../../_model/RespuestaSolicitud';
import { RespuestaSolicitudesComponent } from './respuesta-solicitudes/respuesta-solicitudes.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { Solicitud } from '../../../_model/Solicitud';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-domiciliarios',
  templateUrl: './domiciliarios.component.html',
  styleUrls: ['./domiciliarios.component.css']
})
export class DomiciliariosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();

  respuestaSolicitud = new RespuestaSolicitud();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public route: ActivatedRoute, 
    private solicituService : SolicitudesService,
              public dialog: MatDialog,  
              private router: Router,
              private snackBar : MatSnackBar 
              ) { }

  ngOnInit(): void {
   this.refrescar();
   
  }

   abrirDialogo(id: number) {
      const dialogRef = this.dialog.open(RespuestaSolicitudesComponent, {
        width: '300px',
        data: {id: id}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.opcion == "Aceptar") {
          
              this.respuestaSolicitud.Id=id;
           
              this.respuestaSolicitud.comandname="Rechazar";
              let token = sessionStorage.getItem(environment.TOKEN);
              const helper = new JwtHelperService();
              const decodedToken = helper.decodeToken(token);
              let correo=decodedToken.unique_name;
              this.respuestaSolicitud.correo=correo;
              this.solicituService.RespuestaDomiciliario(this.respuestaSolicitud).subscribe(data=>{
                this.refrescar();
              });
            }else{
              
              this.refrescar();
            }
        });
  }
  
  Aceptar(id: number){
      this.respuestaSolicitud.Id=id;
      this.respuestaSolicitud.comandname="Aceptar";
      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let correo=decodedToken.unique_name;
      this.respuestaSolicitud.correo=correo;
        this.solicituService.RespuestaDomiciliario(this.respuestaSolicitud).subscribe(data=>{
          this.snackBar.open('Solicitud aceptada correctamente', 'successful', {
            duration: 2000,
          });
        this.refrescar();
        });
  }
   
  refrescar(){
    this.solicituService.solicitudesDomiciliarios().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator = this.paginator;
     
    });
  }


}
