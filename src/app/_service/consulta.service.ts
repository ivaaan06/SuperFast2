import { Producto } from './../_model/Producto';

import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ConsultaService {
  private url: string = environment.HOST+'/api/comunicacion';

  private url2: string = `${environment.HOST}'/api/comunicacion`;
  constructor(private http: HttpClient) { }

  retornar() {
    return this.http.get<Producto[]>(`${this.url}/GetMostrarProductoInicio`);
  }
}
