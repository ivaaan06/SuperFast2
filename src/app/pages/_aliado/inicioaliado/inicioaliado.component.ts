import { Router } from '@angular/router';

import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { environment } from './../../../../environments/environment';
import { Usuario } from './../../../_model/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LoginService } from './../../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicioaliado',
  templateUrl: './inicioaliado.component.html',
  styleUrls: ['./inicioaliado.component.css']
})
export class InicioaliadoComponent implements OnInit {
  usuario = new Usuario() ;
  constructor(private loginServicio: LoginService,
              private perfilusuarioService : PerfilusuarioService,
              private router : Router
              ) { }

  ngOnInit(): void {
 
  }
  cerrarSesion(){
    this.loginServicio.cerrarSesion().subscribe(data=>{
      sessionStorage.setItem(environment.TOKEN, null);
      sessionStorage.removeItem(environment.TOKEN);
      this.router.navigateByUrl('/login');
    });
  }
}
