import { AddProducto } from './../../../_model/AddProducto';
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
  producto = new AddProducto();
  nombre : string;
  public imagePath;
  imgURL: any;
  public message: string;
  sellersPermitFile: any;
  private extencion : any;
  //base64s
  sellersPermitString: string;
  constructor(private sanitizer: DomSanitizer,private aliadoService : AliadoService,
    private perfilusuarioService: PerfilusuarioService,  private snackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.perfilusuarioService.getUser().subscribe(data => {
      this.usuario= data;
    });
  }
  fileEvent(fileInput : Event){
    let file =(<HTMLInputElement>fileInput.target).files[0];
    this.archivos = file.name;
   
    
  }
  agregarProducto(){

  
    let nombre_producto = ((document.getElementById("nombre_producto") as HTMLInputElement).value);
    let descripcion_producto = ((document.getElementById("descripcion_producto") as HTMLInputElement).value);
    let precio = ((document.getElementById("precio") as HTMLInputElement).value);
    let aux = Number(precio);
    
    this.producto.Nombre_Producto = nombre_producto.toString();
    this.producto.Descripcion_producto = descripcion_producto.toString();
    this.producto.Precio_producto = aux.toString();
    //this.producto.imagen_producto1 = this.archivos;
    this.producto.Imagen_producto = this.sellersPermitString;
    
    this.producto.extension = this.extencion;
    this.producto.Id = this.usuario.id.toString();
    console.log(this.producto);
    
    try{
      //ejecutar servicio
      this.aliadoService.agregarProducto(this.producto).subscribe(data =>{
        
        this.snackBar.open('Producto agregado correctamente', 'successful', {
          duration: 2000,
          
        });
        this.refrescarFormulario();
      });
    }catch(e){
      
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
  preview(event: any): void {
    let files: FileList = event.target.files;

    if(files.length == 0)
      return;

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }
      
      this.picked(event);
  }


  public picked(event) {
        let fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.sellersPermitFile = file;
        this.handleInputChange(file); //turn into base64   
  }

  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    this.extencion = file.type.slice(6);
    let auxestencion = "."+this.extencion ; 
    this.extencion=auxestencion;
   
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    this.sellersPermitString = base64result;
    
  }

  log() { 
    // for debug
    console.log('extencion', this.sellersPermitString);

  }
 

}

