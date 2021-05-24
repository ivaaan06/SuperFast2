import { RespuestaSolicitud } from './../../../../_model/RespuestaSolicitud';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RevisionComponent>,
    @Inject(MAT_DIALOG_DATA) public RespuestaSolicitud) { }

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
