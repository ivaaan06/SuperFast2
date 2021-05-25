import { Usuario } from './../../../../_model/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from './../../../../_model/Producto';
import { AliadoService } from './../../../../_service/aliado.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editaractivos',
  templateUrl: './editaractivos.component.html',
  styleUrls: ['./editaractivos.component.css']
})
export class EditaractivosComponent implements OnInit {
  archivos : string;
  private id :number;
  private ig :string;
  producto = new Producto();
  constructor(private route : ActivatedRoute, private aliadoService : AliadoService,  
    private snackBar : MatSnackBar,private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((Params)=>{
      this.id = Params['id'];
    });
    this.refrescarFormulario();
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
  actualizarProducto(){
    let nombre_producto = ((document.getElementById("nombre_producto") as HTMLInputElement).value);
    let descripcion_producto = ((document.getElementById("descripcion_producto") as HTMLInputElement).value);
    let precio = ((document.getElementById("precio") as HTMLInputElement).value);

    this.producto.nombre_producto = nombre_producto;
    this.producto.descripcion_producto = descripcion_producto;
    let aux = Number(precio);
    this.producto.precio_producto = aux;
    console.log(this.producto.imagen_producto1);
    if(this.archivos == null){
      this.producto.imagen_producto1 = this.ig;
     }else{
       this.producto.imagen_producto1 = this.archivos;
     }


    this.aliadoService.actualizarProducto(this.producto).subscribe(data=>{
      console.log(this.producto.imagen_producto1)
        this.snackBar.open('Producto actualizado correctamente', 'successful', {
          duration: 2000,
          
        });
        this.refrescarFormulario();
        this.router.navigateByUrl('/productos_activos');
        
    });
  }
  refrescarFormulario(){
    this.aliadoService.productoId(this.id).subscribe(data =>{
      this.producto= data;
      this.ig= this.producto.imagen_producto1;
    });
  }
}
