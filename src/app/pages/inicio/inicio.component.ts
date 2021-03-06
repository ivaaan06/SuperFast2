import { environment } from './../../../environments/environment';
import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private loginservice : LoginService,
              private router:Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(){ 

    this.loginservice.cerrarSesion().subscribe(data =>{
      sessionStorage.setItem(environment.TOKEN, null);
      sessionStorage.removeItem(environment.TOKEN);
      this.router.navigateByUrl('/login');
    });

  }

  onSearch(value : string){
    
    if(value){
      this.router.navigate(['/productos'],{
        queryParams:{busqueda:value}
      })
    }
    
    if(value == ""){
      this.router.navigate(['/productos']);
    }
    
  }

}
