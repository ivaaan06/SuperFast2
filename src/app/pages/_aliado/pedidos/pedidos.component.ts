import { AliadoService } from './../../../_service/aliado.service';
import { Usuario } from './../../../_model/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css']
})
export class PedidosComponent implements OnInit {

  usuario = new Usuario();
  constructor(private perfilusuarioService : PerfilusuarioService,
    private aliadoService : AliadoService) { }

  ngOnInit(): void {
    let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
     
      console.log(decodedToken.nameid);
      this.perfilusuarioService.getUser().subscribe(data => {
        this.usuario= data;
        console.log(data);
      });
      this.aliadoService.pedido_sAliado(this.usuario).subscribe(data2 => {
        console.log(data2);
      })
  }

}
