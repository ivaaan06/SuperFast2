
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-cancelar',
  templateUrl: './cancelar.component.html',
  styleUrls: ['./cancelar.component.css']
})
export class CancelarComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CancelarComponent>,
    @Inject(MAT_DIALOG_DATA) public cancelarSolicitud) { }

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
