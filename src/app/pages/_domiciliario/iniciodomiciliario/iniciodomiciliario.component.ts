import { environment } from './../../../../environments/environment';
import { Router } from '@angular/router';
import { LoginService } from './../../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-iniciodomiciliario',
  templateUrl: './iniciodomiciliario.component.html',
  styleUrls: ['./iniciodomiciliario.component.css']
})
export class IniciodomiciliarioComponent implements OnInit {

  constructor(private loginService: LoginService, private router :Router) { }

  ngOnInit(): void {
  }
  cerrarSesion(){
    this.loginService.cerrarSesion().subscribe(data=>{
      sessionStorage.setItem(environment.TOKEN, null);
      sessionStorage.removeItem(environment.TOKEN);
      this.router.navigateByUrl('/login');
    
    });
  }
}
