import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment  } from '../../../environments/environment';
import { AuthenticationService } from '../../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  token: any;

  constructor(private http: HttpClient, private authentication: AuthenticationService) { 
    this.token = this.authentication.getToken();
  }

  postContact(json):Observable<any>{
    return this.http.post(environment.api+"users/sendMail", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json'}
      )});
   }

}
