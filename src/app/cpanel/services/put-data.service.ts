import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment  } from '../../../environments/environment';
import { AuthenticationService } from '../../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PutDataService {
  token : any;
  constructor(private http: HttpClient, private authentication: AuthenticationService) {
    this.token = this.authentication.getToken();
   }

   putUser(id, json): Observable<any> {
     return this.http.put(environment.api+`users/updateUser/${id}`, json, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   putCircuit(id, json): Observable<any>{
    return this.http.put(environment.api+`circuits/updateCircuit/${id}`, json, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   putSchool(id, json):Observable<any>{
    return this.http.put(environment.api+`schools/updateSchool/${id}`, json, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   putPerson(id, json): Observable<any>{
    return this.http.put(environment.api+`person/updatePerson/${id}`, json, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   putEvent(id, json):Observable<any>{
    return this.http.put(environment.api+`events/updateEvent/${id}`, json, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   InactivatePlan(id, json):Observable<any>{
    return this.http.put(environment.api+`plan/inactivate/${id}`,json,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   putPlan(id, json):Observable<any>{
    return this.http.put(environment.api+`plan/updatePlan/${id}`,json,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   putDpto(id, json): Observable<any>{
    return this.http.put(environment.api+`dpto/updateDeparment/${id}`,json,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   putAction(id, json): Observable<any>{
    return this.http.put(environment.api+`actions/updateAction/${id}`,json,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }

   putMatricula(id, json): Observable<any>{
    return this.http.put(environment.api+`matric/updateMatricula/${id}`,json,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
   }
}
