import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { RespuestaSolicitudesComponent } from './../domiciliarios/respuesta-solicitudes/respuesta-solicitudes.component';
import { RespuestaSolicitud } from './../../../_model/RespuestaSolicitud';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/Solicitud';
import { RevisionComponent } from './revision/revision.component';

@Component({
  selector: 'app-aliadosrechazados',
  templateUrl: './aliadosrechazados.component.html',
  styleUrls: ['./aliadosrechazados.component.css']
})
export class AliadosrechazadosComponent implements OnInit {

  
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'rut', 'actividadcomercial', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();
  respuestaSolicitud = new RespuestaSolicitud();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public route: ActivatedRoute, private solicituService : SolicitudesService,
    public dialog: MatDialog) { }

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
               this.respuestaSolicitud.comandname="Rechazar";
               let token = sessionStorage.getItem(environment.TOKEN);
               const helper = new JwtHelperService();
               const decodedToken = helper.decodeToken(token);
               let correo=decodedToken.unique_name;
               this.respuestaSolicitud.correo=correo;
               this.solicituService.RespuestaAliadosRechazados(this.respuestaSolicitud).subscribe(data=>{
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
         this.refrescar();
         });
   }
    
   refrescar(){
     this.solicituService.AliadosRechazados().subscribe(data =>{
       this.dataSource = new MatTableDataSource(data);
       this.dataSource.sort= this.sort;
       this.dataSource.paginator = this.paginator;
      
     });
   }
 
}
