import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';
import { RespuestaSolicitud } from './../../../_model/RespuestaSolicitud';
import { RespuestaSolicitudesComponent } from './../domiciliarios/respuesta-solicitudes/respuesta-solicitudes.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/Solicitud';

@Component({
  selector: 'app-domiciliariosaceptados',
  templateUrl: './domiciliariosaceptados.component.html',
  styleUrls: ['./domiciliariosaceptados.component.css']
})
export class DomiciliariosaceptadosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();
  respuestaSolicitud = new RespuestaSolicitud();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public route: ActivatedRoute, private solicituService : SolicitudesService,
    public dialog: MatDialog ) { }

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
          
              this.respuestaSolicitud.Id=id;
             
              this.respuestaSolicitud.comandname="Rechazar";
              let token = sessionStorage.getItem(environment.TOKEN);
              const helper = new JwtHelperService();
              const decodedToken = helper.decodeToken(token);
              let correo=decodedToken.unique_name;
              this.respuestaSolicitud.correo=correo;
              this.solicituService.RespuestaDomiciliariosAceptados(this.respuestaSolicitud).subscribe(data=>{
                this.refrescar();
              });
            }else{
              
              this.refrescar();
            }
        });
    }
    refrescar(){
      this.solicituService.DomiciliariosAceptados().subscribe(data =>{
        
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort= this.sort;
        this.dataSource.paginator = this.paginator;
       
      });
    }

}
