import { ActivatedRoute, Params } from '@angular/router';
import { RespuestaSolicitud } from './../../../../_model/RespuestaSolicitud';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-respuesta-solicitudes',
  templateUrl: './respuesta-solicitudes.component.html',
  styleUrls: ['./respuesta-solicitudes.component.css']
})
export class RespuestaSolicitudesComponent implements OnInit {
  
  aux: string;
  
  constructor(public dialogRef: MatDialogRef<RespuestaSolicitudesComponent>,
    @Inject(MAT_DIALOG_DATA) public RespuestaSolicitud,
    private route : ActivatedRoute) { }

  ngOnInit(): void {
    
  }

  aceptar(): void{
    this.dialogRef.close({
      opcion:"Aceptar"
    });
  }
  cancelar(){
    this.dialogRef.close({
      opcion:"Cancelar"
    });
    
  }
}
