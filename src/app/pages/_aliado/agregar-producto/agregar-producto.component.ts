import { MatSnackBar } from '@angular/material/snack-bar';
import { PerfilusuarioService } from './../../../_service/perfilusuario.service';
import { Usuario } from './../../../_model/Usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';
import { Producto } from './../../../_model/Producto';
import { AliadoService } from './../../../_service/aliado.service';
import { async } from '@angular/core/testing';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  public archivos: string ;
  public previsualizacion: string;
  usuario = new Usuario();
  producto = new Producto();
  nombre : string;
  constructor(private sanitizer: DomSanitizer,private aliadoService : AliadoService,
    private perfilusuarioService: PerfilusuarioService,  private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usuario= data;
      console.log(data);
    });
  }
  fileEvent(fileInput : Event){
    let file =(<HTMLInputElement>fileInput.target).files[0];
    this.archivos = file.name;
   
    /*const imagen = event.target.files[0];
    this.extraerBase64(imagen).then((imagen : any)=>{
      this.previsualizacion = imagen.base;
      console.log(imagen)
    });
    this.archivos.push(imagen);*/
  }
  agregarProducto(){

    console.log(this.archivos);
    let nombre_producto = ((document.getElementById("nombre_producto") as HTMLInputElement).value);
    let descripcion_producto = ((document.getElementById("descripcion_producto") as HTMLInputElement).value);
    let precio = ((document.getElementById("precio") as HTMLInputElement).value);
    let aux = Number(precio);
    this.producto.id = null;
    this.producto.actividad_comercial = null;
    this.producto.nombre_producto = nombre_producto;
    this.producto.descripcion_producto = descripcion_producto;
    this.producto.precio_producto = aux;
    this.producto.imagen_producto1 = this.archivos;
    this.producto.id_aliado = this.usuario.id;
    this.producto.nombre_aliado= this.usuario.nombre;
    this.producto.estado_producto =1;
    this.refrescarFormulario();
    try{
      //ejecutar servicio
      this.aliadoService.agregarProducto(this.producto).subscribe(data =>{
        this.snackBar.open('Producto agregado correctamente', 'successful', {
          duration: 2000,
          
        });
        
      });
    }catch(e){
      console.log('ERROR', e);
    }
  }
  extraerBase64 = async ($event:any) => new Promise((resolve, reject) =>{
    try{
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () =>{
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          
          base: null
        });
      }
    }catch(e){
      return null;
    }
  })


  refrescarFormulario(){
    this.nombre="";
  }
}