import { LoginService } from './../../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciodomiciliario',
  templateUrl: './iniciodomiciliario.component.html',
  styleUrls: ['./iniciodomiciliario.component.css']
})
export class IniciodomiciliarioComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }
  cerrarSesion(){
    this.loginService.cerrarSesion();
  }
}
