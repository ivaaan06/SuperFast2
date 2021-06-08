import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/_model/Usuario';
import { RegistroService } from 'src/app/_service/registro.service';
@Component({
  selector: 'app-pagregistrar',
  templateUrl: './pagRegistros.component.html',
  styleUrls: ['./pagRegistros.component.css']

})
export class PagRegistroComponent implements OnInit{
    
    
    constructor(
       ){

    }

    ngOnInit(): void {
    }

   

}