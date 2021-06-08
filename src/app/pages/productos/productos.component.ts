import { LoginService } from './../../_service/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../_model/Producto';
import { filter, take } from 'rxjs/operators';
import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { TrackHttpError } from 'src/app/_model/TrackHttpError';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { DetallePedido } from 'src/app/_model/DetallePedido';
import { PerfilusuarioService } from 'src/app/_service/perfilusuario.service';
import { Usuario } from 'src/app/_model/Usuario';
import { Pedidos_s } from 'src/app/_model/Pedido_s';
import { stringify } from '@angular/compiler/src/util';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Auxiliar } from 'src/app/_model/Auxiliar';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { CarritoService } from 'src/app/_service/carrito.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre_producto', 'descripcion_producto','estado_producto','id_aliado','nombre_aliado','cantidad','imagen_producto1','precio_producto'];
  dataSource = new MatTableDataSource<Producto>();
  datos: Producto[] = [];
  private ValorMinimo: number;
  private ValorMaximo: number;
  private query: string;
  private usuario = new Usuario();
  private pedidoS= new Pedidos_s();
  private productots=new Producto();
  private compraDet=new DetallePedido();
  private detallePedido2 = Array<DetallePedido>();
  private cantida:number;
  private descPedido:string;
  private numPedido :number; 
  auxiliar = new Auxiliar();

  constructor(private consultaservice: ConsultaService, 
              private route: ActivatedRoute,
              private router: Router,
              private _snackBar: MatSnackBar,
              private perfilusuarioService: PerfilusuarioService,
              private carritoService: CarritoService) {
              this.onUrlChanged();
              }

  ngOnInit(): void {
    this.consultaservice.numeroPedidos().subscribe(canPedi =>{
      console.log('Numero Pedidos-> ',canPedi);
    });
    //iniciar variables
    this.consultaservice.retornar().subscribe(data => {
     this.dataSource = new MatTableDataSource(data);
     this.datos=data;
     console.log(data);
    });
    this.getCharactersByMinMax();
    this.getCharactersByQuery();
  }
   
  minimo = new FormControl('', [Validators.min(1), Validators.max(1000000)]);
  getErrorMessage() {
    if (this.minimo.hasError('min')) {
      return 'Debes ingresar un valor mas grande';
    }
    if (this.minimo.hasError('max')) {
      return 'Excede el rango de precios';
    }
    
  }

  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.datos = [];
        this.getCharactersByQuery();
      });
  }

  private getCharactersByQuery(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      this.query = params['busqueda'];
      this.getDataFromService();
    });
  }

  private getDataFromService(): void {
    this.consultaservice
    .searchCharacters(this.query)
    .pipe(take(1))
    .subscribe((res: any) => {
      console.log('Response->',res);
      if(res == ""){
        this.consultaservice.retornar().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.datos=data;
         });         
      }else{
        this.dataSource = new MatTableDataSource(res);
        this.datos=res;
      }
      
      if(res.length < 1 && this.query != undefined){
        this.openSnackBar("No se encontro '"+this.query+"' en los productos",'');
      }

      }, (error:TrackHttpError) => console.log((error.friendlyMessage)));
  }
  private getCharactersByMinMax(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params: ParamMap) => {
      this.ValorMinimo= params['ValorMinimo'];
      this.ValorMaximo= params['ValorMaximo'];
      this.getDataFromService2();
    });
  }

  private getDataFromService2(): void {
    this.consultaservice
    .filtroPrecio(this.ValorMinimo)
    .pipe(take(1))
    .subscribe((res: any) => {
      console.log('Response->',res);
      if(res == ""){
        this.consultaservice.retornar().subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.datos=data;
         });         
      }else{
        this.dataSource = new MatTableDataSource(res);
        this.datos=res;
      }

      }, (error:TrackHttpError) => console.log((error.friendlyMessage)));
  } 

  //private imagen():void{
    //let imag =((document.getElementById("nombreimagen")as HTMLImageElement).src)
  //}

  enBusqueda(value : string){
    console.log(value)
    if(value){
      this.router.navigate(['/productos'],{
        queryParams:{ValorMinimo:value}
      })
    }
    
    
  }

  enviarPedido(){

    this.perfilusuarioService.getUser().subscribe(data =>{
      this.usuario = data;
    });
    let today = new Date(Date.parse("2012-01-26T13:51:50.417-07:00"));
    //id_pedido','fecha','comentario_cliente' ,'comentario_aliado','nombre_estado_ped','nombre_estado_domicilio','nombre_aliado','compras','cancelar'
    this.pedidoS.cliente_id = this.usuario.id;
    this.pedidoS.fecha = today;
    this.pedidoS.estado_id = 1;
    this.pedidoS.valor_total = 10;
    this.pedidoS.comentario_cliente = "";
    this.pedidoS.comentario_aliado = "";
    this.pedidoS.nombre_estado_ped = "pendiente de procesar";
    this.pedidoS.nombre_estado_domicilio = "pendiente de procesar";  
    this.pedidoS.estado_pedido= 1;
    this.pedidoS.estado_domicilio_id= 1;

    this.pedidoS.compras = this.detallePedido2;
    this.pedidoS.detnombrecliente=this.usuario.nombre;
    this.pedidoS.nombre_cliente=this.usuario.nombre;
    this.pedidoS.direccion_cliente=this.usuario.direccion;
    this.pedidoS.telefono_cliente=this.usuario.telefono;

    this.consultaservice.enviarPedido().subscribe(data =>{
      console.log("Datos enviados=>" , data);
    });
  }
  cantidaIngresada(cant: number){
    this.cantida=cant;
  }
  descripcionIngresada(description: string){
    this.descPedido=description;
  }
  enviarCompra(detalle: Producto){
    //id_aliado:number,precio_producto:number,id:number,
    let token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    let nameid=decodedToken.nameid;
    this.auxiliar.Id=nameid;
    const tiempoTranscurrido = Date.now();
    const hoy = new Date(tiempoTranscurrido);
    //id_pedido','fecha','comentario_cliente' ,'comentario_aliado','nombre_estado_ped','nombre_estado_domicilio','nombre_aliado','compras','cancelar'
    this.pedidoS.id_pedido = 1;
    this.pedidoS.cliente_id = nameid;
    this.pedidoS.fecha = hoy.toISOString();
    this.pedidoS.estado_id=1;
    this.pedidoS.valor_total=0;
    this.pedidoS.domiciliario_id=1;
    this.pedidoS.comentario_cliente= this.descPedido;
    this.pedidoS.comentario_aliado=null;
    this.pedidoS.aliado_id = detalle.id_aliado;
    this.pedidoS.estado_pedido=1;
    this.pedidoS.estado_domicilio_id=1;
    this.pedidoS.compras=[this.detallePedido2];
    this.pedidoS.compras1=null;
    this.pedidoS.nombre_estado_ped = "pendiente de procesar";
    this.pedidoS.nombre_estado_domicilio = "pendiente de procesar";
    this.pedidoS.det_valor_unitario = detalle.precio_producto;
    this.pedidoS.det_cantidad = this.cantida;
    this.pedidoS.nombre_aliado=detalle.nombre_aliado;
    this.pedidoS.detnombrecliente="";
    this.pedidoS.direccion_aliado="";
    

    this.perfilusuarioService.getUser().subscribe(data => {
      //this.usuario= data;
      this.pedidoS.direccion_cliente= data.direccion;
      this.pedidoS.telefono_cliente= data.telefono;
      this.pedidoS.nombre_cliente=data.nombre;
      this.compraDet.direccion_cliente= data.direccion;
      this.compraDet.telefono_cliente= data.telefono;
      //console.log(data);
    });

    //cadena COMPRAS
    this.compraDet.cantidad = this.cantida;
    this.compraDet.compras1=null;
    this.compraDet.descripcion= this.descPedido;
    this.compraDet.especprodaliado=detalle.descripcion_producto;
    this.compraDet.id_dpedido =2;
    this.compraDet.idpedido=0;
    //this.compraDet.imagen_producto1="";
    this.compraDet.nombre_aliado=detalle.nombre_aliado;
    this.compraDet.nombreprodet=detalle.nombre_producto;
    this.compraDet.pedido_id = this.pedidoS.id_pedido;
    this.compraDet.producto_id=detalle.id;
    this.compraDet.v_total = this.pedidoS.det_valor_unitario*this.cantida;
    this.compraDet.v_unitario=this.pedidoS.det_valor_unitario;
    this.detallePedido2.push(this.compraDet);
    /*detalle.det_cantidad=this.cantida;
    detalle.comentario_cliente=this.descPedido;
    this.detallePedido2.push(detalle);    
    console.log('Detalle ->',this.detallePedido2);
    
    cantidad: 5
    compras1: null
    descripcion: "canon"
    direccion_cliente: "crr 3 4"
    especprodaliado: "prueba"
    id_dpedido: 199
    idpedido: 0
    imagen_producto1: "~\\AliadoAppi\\imagenesproducto\\cam_domo_hik_2mpx.jpg"
    nombre_aliado: null
    nombreprodet: "camara"
    pedido_id: 189
    producto_id: 30
    telefono_cliente: "2345678"
    v_total: 1000000
    v_unitario: 200000"*/
    console.log('Detalle ->',this.pedidoS);
    console.log('Detallepedido2 ->',this.detallePedido2);
    this.consultaservice.enviarPedido().subscribe(envio =>{
      console.log('se envio->',envio);
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
        duration: 3000
    });
  }
}
