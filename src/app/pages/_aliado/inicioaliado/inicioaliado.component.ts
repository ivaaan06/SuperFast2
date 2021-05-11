import { LoginService } from './../../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicioaliado',
  templateUrl: './inicioaliado.component.html',
  styleUrls: ['./inicioaliado.component.css']
})
export class InicioaliadoComponent implements OnInit {

  constructor(private loginServicio: LoginService) { }

  ngOnInit(): void {
  }
  cerrarSesion(){
    this.loginServicio.cerrarSesion();
  }
}
