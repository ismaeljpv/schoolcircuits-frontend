import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment  } from '../../../environments/environment';
import { AuthenticationService } from '../../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  token : any;
  private subject = new Subject<any>();

  constructor(private http: HttpClient, private authentication: AuthenticationService) { 
    this.token = this.authentication.getToken();
  }

  getBoardEvents(): Observable<any>{
    return this.http.get(environment.api+`events/findEvents`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json'}
      )});
  }
}
