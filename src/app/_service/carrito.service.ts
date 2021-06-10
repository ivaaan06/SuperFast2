import { RespuestaPedido } from './../_model/RespuestaPedido';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { Auxiliar } from "../_model/Auxiliar";
import { DetallePedido } from "../_model/DetallePedido";
import { Pedidos_s } from "../_model/Pedido_s";
import { Producto } from "../_model/Producto";
import { RespuestaSolicitud } from "../_model/RespuestaSolicitud";
import { TrackHttpError } from "../_model/TrackHttpError";
import { PerfilusuarioService } from "./perfilusuario.service";
@Injectable({
    providedIn: 'root'
  })


export class CarritoService{
    private url: string = environment.HOST+'/api/Carrito';
    private url2: string = environment.HOST+'/api/Inicio/AgregarPedidoCarrito';
    private url3: string=environment.HOST+'api/Carrito/GetLmostrarpreciototal20?idusuario={idusuario}';
    auxiliar = new Auxiliar();
    
    constructor(private http: HttpClient,private perfilusuarioService :PerfilusuarioService) {

     }

    subTotalProduct(){
      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let nameid=decodedToken.nameid;
      this.auxiliar.Id=nameid;
      return this.http.get<any>(environment.HOST+'/api/Carrito/GetLmostrarpreciototal20?idusuario='+nameid);
    } 
    priceDomicilio(){
      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let nameid=decodedToken.nameid;
      this.auxiliar.Id=nameid;
      const filter = `${environment.HOST}/api/Carrito/GetLmostrarpreciodomicilio?idusuario=${nameid}`;
      return this.http.get<any>(filter)
      
    }
    delteProduct(respuesta : RespuestaPedido) {
      return this.http.put(environment.HOST+'/api/Carrito/PutLGV_pedidocarrito', respuesta);
      //return this.http.put(this.url+'/api/Carrito/PutLGV_pedidocarrito',Id_pedido&&comandname);
    }
    
    verProduct(){

      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let nameid=decodedToken.nameid;
      this.auxiliar.Id=nameid;
      return this.http.post<Pedidos_s[]>(environment.HOST+'/api/comunicacion/PostObtenerPedidoUsuario', this.auxiliar);
        //const filter = `${environment.HOST}/api/Inicio/GetDL_Productos1?idsesion=${nameid}`;
        
    }
    verTotal(){
      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let nameid=decodedToken.nameid;
      this.auxiliar.Id=nameid;
      return this.http.get<any>(environment.HOST+'/api/Carrito/GetLmostrarpreciototal20?idusuario='+nameid);
    }
    verTotDomicilio(){
      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let nameid=decodedToken.nameid;
      this.auxiliar.Id=nameid;
      return this.http.get<any>(environment.HOST+'/api/Carrito/GetLmostrarpreciodomicilio?idusuario='+nameid);
    }
    private handleHttpError(
        error:HttpErrorResponse
      ):Observable<TrackHttpError>{
    
        let dataError = new TrackHttpError();
        dataError.errorNumber = error.status;
        dataError.message = error.statusText;
        dataError.friendlyMessage = 'A ocurrido un error.';
        return throwError(dataError);
      }
    
   
}