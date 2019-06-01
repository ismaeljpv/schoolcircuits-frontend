import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment  } from '../../environments/environment';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  tokenKey = "user";

  url = environment.api;
  constructor(private http: HttpClient) { }

  login(json): Observable<HttpResponse<Object>> {
    return this.http.post(this.url+"login", json, {'headers' : new HttpHeaders ({'Content-Type' : 'application/json'}), observe:'response'});
  }

  singOut(){
    localStorage.removeItem(this.tokenKey);
    localStorage.clear();
  }

  saveToken(token:string){
    localStorage.removeItem(this.tokenKey);
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(){
    return localStorage.getItem(this.tokenKey);
  }

  decodeToken(){
    let token = decode(localStorage.getItem(this.tokenKey))
    return token;
  }

  perfil(){
       let token = decode(localStorage.getItem(this.tokenKey))
       let _jsn = {
        "usuario": token.sub,
        "correo": token.correo,
        "perfil": token.perfil,
        "iduser": token.idUsuario,
        "idperson": token.idPersona
       }
     return _jsn;
  }

  
}
