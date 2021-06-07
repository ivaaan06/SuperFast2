import { environment } from './../../../../environments/environment';
import { GuardianService } from './../../../_service/guardian.service';

import { Router } from '@angular/router';
import { LoginService } from './../../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicioadmin',
  templateUrl: './inicioadmin.component.html',
  styleUrls: ['./inicioadmin.component.css']
})
export class InicioadminComponent implements OnInit {

  constructor(private loginService: LoginService,private  router : Router
    ) { }

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
