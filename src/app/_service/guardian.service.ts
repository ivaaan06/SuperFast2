import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate{
  
  email : string;
  password : string;
  constructor(private loginService:LoginService, private router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //verificamos si esta logeado
    let respuesta = this.loginService.estaLogeado();
    let intentos = 0;
    if(respuesta== 1 || respuesta==2){
      if(respuesta==2){
        //expiro el token
      this.refresLogin();
      while(true){
        await this.delay(1500);
        respuesta = this.loginService.estaLogeado();
        if(respuesta==1){
          break;
        }
        intentos++;
        if(intentos == 3){
          //se intenta 3 veces sin resultados
          //borramos datos guardadados
          
          this.loginService.cerrarSesion();
          return false;
        }
      }

    }
      //esta logeado
      //extraemos el rol
      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let rol = decodedToken.role;
      let url = state.url;
      //usuario
      if (url.includes('/productos') && rol == 1)
        return true;
      else if(url.includes('/inicio') && rol == 1)
        return true;
      else if(url.includes('/carrito') && rol == 1)
        return true;
        else if(url.includes('/perfil') && rol == 1)
        return true;
        else if(url.includes('/historial_pedidos') && rol == 1)
        return true;
        else if(url.includes('/historial_en_proceso') && rol == 1)
        return true;
        else if(url.includes('/dtl_pedidos') && rol == 1)
        return true;
        else if(url.includes('/dtl_proceso') && rol == 1)
        return true;
        
        
      
      //admin
      else if(url.includes('/inicioadmin') && rol == 4)
        return true;
      else if(url.includes('/aliados') && rol == 4)
        return true;
      else if(url.includes('/domiciliarios') && rol == 4)
        return true;
        else if(url.includes('/aliadosrechazados') && rol == 4)
        return true;
      else if(url.includes('/domiciliariosrechazados') && rol == 4)
        return true;
        else if(url.includes('/aliadosaceptados') && rol == 4)
        return true;
      else if(url.includes('/domiciliariosaceptados') && rol == 4)
        return true;
        else if(url.includes('/perfil_admin') && rol == 4)
        return true;
      //aliado
      else if(url.includes('/inicioaliado') && rol == 2)
        return true;
        else if(url.includes('/pedido_s') && rol == 2)
        return true;
        else if(url.includes('/agregar_productos') && rol == 2)
        return true;
        else if(url.includes('/pedido_s_terminados') && rol == 2)
        return true;
        else if(url.includes('/productos_activos') && rol == 2)
        return true;
        else if(url.includes('/editar_activos') && rol == 2)
        return true;
        else if(url.includes('/productos_desactivados') && rol == 2)
        return true;
        else if(url.includes('/dtl_alipedidos') && rol == 2)
        return true;
        
    
      
        
      //domiciliario
      else if(url.includes('/iniciodomiciliario') && rol == 3)
        return true;
        else if(url.includes('/mihistorial') && rol == 3)
        return true;
        else if(url.includes('/mispedidos') && rol == 3)
        return true;
        else if(url.includes('/pedidosdisponibles') && rol == 3)
        return true;
        else if(url.includes('/dtl_mihistorial') && rol == 3)
        return true;
        
      
      else {
        //this.router.navigateByUrl('/401Invalid');
        this.router.navigate(['/401Invalid']);
      }
      ////////
    }else{
      //no esta logeada
      this.router.navigateByUrl('/login');
    }
    return false;
  }
  
  private refresLogin(){
    let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
    //let auxcorre = CryptoJS.AES.decrypt(environment.CORREO.trim(), decodedToken.nameid.trim()).toString();
    
    this.loginService.login(atob( sessionStorage.getItem("email")), atob(sessionStorage.getItem("password")),  "1").subscribe(data =>{
      sessionStorage.setItem(environment.TOKEN, data);
    });
  }

  private delay(ms : number){
    //dormir
    return new Promise(resolve => setTimeout(resolve,ms));
  }


  getEmail(email : string){
    this.email=email;
  }
  getPassword(password : string){
    this.password=password;
  }
  setEmail(){
    return this.email;
  }
  setPassword(){
    return this.password;
  }

}
