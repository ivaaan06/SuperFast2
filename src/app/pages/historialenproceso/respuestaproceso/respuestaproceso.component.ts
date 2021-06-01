import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-respuestaproceso',
  templateUrl: './respuestaproceso.component.html',
  styleUrls: ['./respuestaproceso.component.css']
})
export class RespuestaprocesoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RespuestaprocesoComponent>,
    @Inject(MAT_DIALOG_DATA) public RespuestaProceso) { }

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
