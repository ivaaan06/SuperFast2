import { LoginService } from './../../_service/login.service';
import { MatTableDataSource } from '@angular/material/table';
import { Producto } from './../../_model/Producto';
import { filter, take } from 'rxjs/operators';
import { ConsultaService } from './../../_service/consulta.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, ParamMap, Router } from '@angular/router';
import { TrackHttpError } from 'src/app/_model/TrackHttpError';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nombre_producto', 'descripcion_producto','estado_producto','id_aliado','nombre_aliado','cantidad','imagen_producto1'];
  dataSource = new MatTableDataSource<Producto>();
  datos: Producto[] = [];
  
  private pageNum = 1;
  private query: string;  

  constructor(private consultaservice: ConsultaService, 
              private route: ActivatedRoute,
              private router: Router) {
              this.onUrlChanged();
              }

  ngOnInit(): void {

    //iniciar variables
    this.consultaservice.retornar().subscribe(data => {
     this.dataSource = new MatTableDataSource(data);
     this.datos=data;
    });

    this.getCharactersByQuery();
  }

  applyFilter(filtro: string){
    this.dataSource.filter = filtro.trim();
  }

   
  private onUrlChanged(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.datos = [];
        this.pageNum = 1;
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
      
      }, (error:TrackHttpError) => console.log((error.friendlyMessage)));
  } 
}
