import { MatSnackBar } from '@angular/material/snack-bar';
import { RespuestaSolicitudesComponent } from './../domiciliarios/respuesta-solicitudes/respuesta-solicitudes.component';
import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { RespuestaSolicitud } from './../../../_model/RespuestaSolicitud';
import { MatSort } from '@angular/material/sort';
import { Subject } from 'rxjs';

import { MatPaginator } from '@angular/material/paginator';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/Solicitud';
import { RevisionComponent } from '../aliadosrechazados/revision/revision.component';

@Component({
  selector: 'app-domiciliariosrechazados',
  templateUrl: './domiciliariosrechazados.component.html',
  styleUrls: ['./domiciliariosrechazados.component.css']
})
export class DomiciliariosrechazadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  respuestaSolicitud = new RespuestaSolicitud();
  constructor(public route: ActivatedRoute, private solicituService : SolicitudesService
    ,public dialog: MatDialog,
    private snackBar : MatSnackBar ){ }

    ngOnInit(): void {
      this.refrescar();
      
     }
   
      abrirDialogo(id: number, hojavida: string) {
         const dialogRef = this.dialog.open(RevisionComponent, {
           width: '300px',
           data: {id: id, hojavida: hojavida}
         });
   
         dialogRef.afterClosed().subscribe(result => {
           if(result.opcion == "Aceptar") {
             
                 this.respuestaSolicitud.Id=id;
               
                 this.respuestaSolicitud.comandname="Revision";
                 let token = sessionStorage.getItem(environment.TOKEN);
                 const helper = new JwtHelperService();
                 const decodedToken = helper.decodeToken(token);
                 let correo=decodedToken.unique_name;
                 this.respuestaSolicitud.correo=correo;
                 this.solicituService.RespuestaDomiciliariosRechazados(this.respuestaSolicitud).subscribe(data=>{
                   this.refrescar();
                 });
               }else{
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
           this.solicituService.RespuestaAliadosRechazados(this.respuestaSolicitud).subscribe(data=>{
            this.snackBar.open('Solicitud aceptada correctamente', 'successful', {
              duration: 2000,
            });
           this.refrescar();
           });
     }
      
     refrescar(){
       this.solicituService.DomiciliariosRechazados().subscribe(data =>{
         this.dataSource = new MatTableDataSource(data);
         this.dataSource.sort= this.sort;
         this.dataSource.paginator = this.paginator;
        
       });
     }
   

}
