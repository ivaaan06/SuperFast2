import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private loginservice : LoginService) { }

  ngOnInit(): void {
  }

  cerrarSesion(){ 
    this.loginservice.cerrarSesion();
  }

}
