import { Producto2 } from './../../../../_model/Productos2';
import { Usuario } from './../../../../_model/Usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Producto } from './../../../../_model/Producto';
import { AliadoService } from './../../../../_service/aliado.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AddProducto } from 'src/app/_model/AddProducto';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-editaractivos',
  templateUrl: './editaractivos.component.html',
  styleUrls: ['./editaractivos.component.css']
})
export class EditaractivosComponent implements OnInit {
  archivos : string;
  private id :number;
  private ig :string;
  public imagePath;
  imgURL: any;
  public message: string;
  sellersPermitFile: any;
  actualizar = new AddProducto();
  //base64s
  sellersPermitString: string;
  private extencion : any;
  private ext : any;
  producto = new Producto2();
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
   
    
  }
  actualizarProducto(){
    let nombre_producto = ((document.getElementById("nombre_producto") as HTMLInputElement).value);
    let descripcion_producto = ((document.getElementById("descripcion_producto") as HTMLInputElement).value);
    let precio = ((document.getElementById("precio") as HTMLInputElement).value);
    if (nombre_producto == "" || descripcion_producto == "" || precio == "" ){
      this.snackBar.open('No se permiten campos vacios', 'Advertencia', {
        duration: 2000,

      });
      this.refrescarFormulario();
    }else{
      this.actualizar.Nombre_Producto = nombre_producto.toString();
      this.actualizar.Descripcion_producto = descripcion_producto.toString();
      this.actualizar.Precio_producto = precio.toString();
        this.actualizar.Imagen_producto =btoa(this.ig);
        this.actualizar.extension = this.ext;
      if(this.imgURL != null){
        this.actualizar.Imagen_producto = this.sellersPermitString;
        this.actualizar.extension = this.extencion;
      }
        
      
      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let nameid=decodedToken.nameid;
      this.actualizar.Id=nameid;
      this.actualizar.id_producto=this.id;
    
      this.aliadoService.actualizarProducto(this.actualizar).subscribe(data=>{
        
          this.snackBar.open('Producto actualizado correctamente', 'successful', {
            duration: 2000,
            
          });
          this.refrescarFormulario();
          this.router.navigateByUrl('/productos_activos');
          
      });
    }
  }
  refrescarFormulario(){
    this.aliadoService.productoId(this.id).subscribe(data =>{
      this.producto = data;
      let posiciones = this.producto.imagen_producto1.split(".");
      this.ext= posiciones[1];
      this.ig= this.producto.imagen_producto1;
    });
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

 

}


