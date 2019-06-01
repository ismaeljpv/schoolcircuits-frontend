import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment  } from '../../../environments/environment';
import { AuthenticationService } from '../../_services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DeleteDataService {

  token : any;
  constructor(private http: HttpClient, private authentication: AuthenticationService) {
    this.token = this.authentication.getToken();
   }

   deleteUser(id): Observable<any> {
    return this.http.delete(environment.api+`users/deleteUser/${id}`,
   {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteCircuit(id): Observable<any> {
    return this.http.delete(environment.api+`circuits/deleteCircuit/${id}`,
   {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteSchool(id:any): Observable<any>{
    return this.http.delete(environment.api+`schools/deleteSchool/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deletePerson(id:any): Observable<any>{
    return this.http.delete(environment.api+`person/deletePerson/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteAssigment(id:any): Observable<any>{
    return this.http.delete(environment.api+`functions/deleteFunction/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteEvent(id:any): Observable<any>{
    return this.http.delete(environment.api+`events/deleteEvent/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteNeed(id:any): Observable<any>{
    return this.http.delete(environment.api+`needs/deleteNeed/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteEvidence(id:any): Observable<any>{
    return this.http.delete(environment.api+`photos/deletePhoto/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteDpto(id:any): Observable<any>{
    return this.http.delete(environment.api+`dpto/deleteDeparment/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteAction(id:any):Observable<any>{
    return this.http.delete(environment.api+`actions/deleteAction/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  deleteMatricula(id:any): Observable<any>{
    return this.http.delete(environment.api+`matric/deleteMatricula/${id}`,
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

}
