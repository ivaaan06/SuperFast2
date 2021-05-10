import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate{

  constructor(private loginService:LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    //verificamos si esta logeado
    let respuesta = this.loginService.estaLogeado();
    if(respuesta== 1){
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
      
      //admin
      else if(url.includes('/inicioadmin') && rol == 4)
        return true;
      
      //aliado
      else if(url.includes('/inicioaliado') && rol == 2)
        return true;
      
      //domiciliario
      else if(url.includes('/iniciodomiciliario') && rol == 3)
        return true;
      
      
      else {
        //this.router.navigateByUrl('/401Invalid');
        this.router.navigate(['/401Invalid']);
      }
      ////////
    }else if(respuesta == 2){
      //expiro el token

    }else{
      //no esta logeada
      this.router.navigateByUrl('/login');
    }
    return false;
  }
}
