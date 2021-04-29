import { Component, OnInit } from '@angular/core';
import { LoginService } from './../../_service/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  correo: string;
  contrasenia: string;
  constructor(/*private loginservice : LoginService*/) { }

  ngOnInit(): void {
  }
  navegarHaciaIniciousuario(){
    //this.loginservice.login(this.correo,this.contrasenia).subscribe(data => {
      //console.log(data);
    //});
  }

}
