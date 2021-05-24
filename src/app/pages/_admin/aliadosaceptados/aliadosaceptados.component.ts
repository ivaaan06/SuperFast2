import { environment } from './../../../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RespuestaSolicitud } from './../../../_model/RespuestaSolicitud';
import { RespuestaSolicitudesComponent } from './../domiciliarios/respuesta-solicitudes/respuesta-solicitudes.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SolicitudesService } from './../../../_service/solicitudes.service';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Solicitud } from 'src/app/_model/Solicitud';

@Component({
  selector: 'app-aliadosaceptados',
  templateUrl: './aliadosaceptados.component.html',
  styleUrls: ['./aliadosaceptados.component.css']
})
export class AliadosaceptadosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'apellido', 'correo', 'telefono', 'documento', 'imagenperfil', 'hojavida', 'tipovehiculo', 'acciones'];
  dataSource = new MatTableDataSource<Solicitud>();
  respuestaSolicitud = new RespuestaSolicitud();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public route: ActivatedRoute, private solicituService : SolicitudesService,
    public dialog: MatDialog  ) { }

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
            this.respuestaSolicitud.Hoja_vida=hojavida;
            this.respuestaSolicitud.comandname="Rechazar";
            let token = sessionStorage.getItem(environment.TOKEN);
            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(token);
            let correo=decodedToken.unique_name;
            this.respuestaSolicitud.Lcorreo=correo;
            this.solicituService.RespuestaAliadosAceptados(this.respuestaSolicitud).subscribe(data=>{
              this.refrescar();
            });
          }else{
            console.log("cancelar")
            this.refrescar();
          }
      });
  }
  refrescar(){
    this.solicituService.AliadosAceptados().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort= this.sort;
      this.dataSource.paginator = this.paginator;
     
    });
  }
}
