import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment  } from '../../../environments/environment';
import { AuthenticationService } from '../../_services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  token : any;

  constructor(private http: HttpClient, private authentication: AuthenticationService) {
    this.token = this.authentication.getToken();
   }

   postUser(json): Observable<HttpResponse<Object>> {
    return this.http.post(environment.api+"users/sign-up", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      ), 
    observe:'response'});
   }

   postCircuit(json): Observable<HttpResponse<Object>> {
    return this.http.post(environment.api+"circuits/addCircuit", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      ), 
    observe:'response'});
   }

   postSchool(json): Observable<any>{
    return this.http.post(environment.api+"schools/addSchool", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   postPerson(json): Observable<any>{
    return this.http.post(environment.api+"person/addPerson", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }
   
   postFunction(json): Observable<any>{
    return this.http.post(environment.api+"functions/addFunction", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   postEvent(json): Observable<any>{
    return this.http.post(environment.api+"events/addEvents", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   postNeeds(json): Observable<any>{
    return this.http.post(environment.api+"needs/addNeeds", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   postPlan(json): Observable<any>{
    return this.http.post(environment.api+"plan/addPlan", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   postPhotos(json): Observable<any>{
    return this.http.post(environment.api+"photos/addPhoto", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }
   
   postDepto(json):Observable<any>{
    return this.http.post(environment.api+"dpto/addDeparment", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   postAction(json):Observable<any>{
    return this.http.post(environment.api+"actions/addAction", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
    }

  postEstatus(json):Observable<any>{
    return this.http.post(environment.api+"person/personal", json, 
    {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   postParticipacion(json): Observable<any>{
    return this.http.post(environment.api+`person/enlaces`, json, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   postMatricula(json): Observable<any>{
    return this.http.post(environment.api+`matric/addMatricula`, json, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

}
