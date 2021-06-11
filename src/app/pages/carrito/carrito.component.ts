import { AddCarrito } from './../../_model/AddCarrito';
import { ComprasCarrito } from './../../_model/CompraCarrito';
import { ConsultaService } from './../../_service/consulta.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RespuestaPedido } from './../../_model/RespuestaPedido';
import { MatDialog } from '@angular/material/dialog';
import { CancelarComponent } from './cancelar/cancelar.component';
import { DetalleService } from './../../_service/detalle.service';
import { DetallePedido } from './../../_model/DetallePedido';
import { CarritoService } from './../../_service/carrito.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { Pedidos_s } from 'src/app/_model/Pedido_s';
import { take } from 'rxjs/operators';
import { TrackHttpError } from 'src/app/_model/TrackHttpError';
import { PerfilusuarioService } from 'src/app/_service/perfilusuario.service';
import { Producto } from 'src/app/_model/Producto';
import { Usuario } from 'src/app/_model/Usuario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { RespuestaSolicitud } from 'src/app/_model/RespuestaSolicitud';
import { JwtHelperService } from '@auth0/angular-jwt';


@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CarritoComponent implements OnInit {
  displayedColumns: string[] = ['id_pedido', 'fecha',
  'comentario_cliente' , 'comentario_aliado', 'nombre_estado_ped', 'nombre_estado_domicilio', 'nombre_aliado', 'compras', 'cancelar'];
  dataSource = new MatTableDataSource<Pedidos_s>();
  usr = new Usuario() ;
  aux: number;
  auxtotal: number;
  auxtotDomicilio: any;
  datosUsr = new Pedidos_s();
  detallePedido = Array<DetallePedido>();
  respuetaPedido = new RespuestaPedido();
  comprarPedido = new ComprasCarrito();
  addcarrito = new AddCarrito();
  datos: Pedidos_s[] = [];
  public aux1: number;
  public aux2: number;
  public totalCompra: number;
  detallepedido: DetallePedido[];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  public barraProgreso = new Subject<string>();
  private idQuery: 1;
  private   pedidoDetal: number;
  respuesta = new RespuestaSolicitud();

  constructor(private carritoService: CarritoService,
              private perfilusuarioService: PerfilusuarioService,
              private snackBar: MatSnackBar,
              private consultaservice: ConsultaService,
              private http: HttpClient, private detalleService: DetalleService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usr = data;
     });
    this.Total();
    this.totalDomicilio();

    this.carritoService.verProduct().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      const subtotalprocutos = ((document.getElementById('subTotal') as HTMLInputElement).value);
      const totaldomiciliario = ((document.getElementById('totDomicilio') as HTMLInputElement).value);
      this.aux1 = Number(subtotalprocutos);
      this.aux2 = Number(totaldomiciliario);
      const auxtotCompra = (this.aux2 + this.aux1);
    });

  }

  Total(){
    this.carritoService.verTotal().subscribe(data => {
      this.auxtotal = data;
      this.aux1 = this.auxtotal;
      this.totalCompra = (Number(this.aux1) + Number(this.aux2));
    });
  }
  totalDomicilio(){
   this.carritoService.verTotDomicilio().subscribe(data => {
    this.auxtotDomicilio = data;
    this.aux2 = this.auxtotDomicilio;
   });
  }

  verDetalle(detalle: DetallePedido[]){
    this.detallePedido = detalle;
    this.detalleService.getDetalle(this.detallePedido);
  }
  cancelarPedido(id_pedido: number){
    const dialogRef = this.dialog.open(CancelarComponent, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.opcion == 'Aceptar') {
            this.respuetaPedido.Id_pedido = id_pedido;
            this.respuetaPedido.comandname = 'Cancelar';
            this.carritoService.delteProduct(this.respuetaPedido).subscribe(data => {
              this.refrescar();
              });
          }else{
            this.refrescar();
          }
      });
  }

  compraPedido(){
    const direccionCliente = ((document.getElementById('dirUsuario') as HTMLInputElement).value);
    const iddelpedido = ((document.getElementById('id_pedido') as HTMLInputElement).value);
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usr = data;
     });
    const token = sessionStorage.getItem(environment.TOKEN);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    const nameid = decodedToken.nameid;
    this.comprarPedido.idusuario = nameid.toString();
    this.comprarPedido.Telefono_cliente = this.usr.telefono;
    this.comprarPedido.Detpedido_id = iddelpedido;
    this.comprarPedido.Direccion_cliente = direccionCliente;
    this.comprarPedido.Id_pedido = iddelpedido;
    this.comprarPedido.Estado_pedido = "0";
    this.comprarPedido.Valor_total = this.totalCompra.toString();
    
    this.carritoService.compraCarrito(this.comprarPedido).subscribe(data => {
     this.snackBar.open('Pedido/s enviado/s', '', {
          duration: 2000,
        });
        this.refrescar();
    });
  }


  refrescar(){
    this.carritoService.verProduct().subscribe(data =>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    this.Total();
    this.totalDomicilio();
  }

}
