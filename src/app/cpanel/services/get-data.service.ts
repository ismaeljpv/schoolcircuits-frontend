import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment  } from '../../../environments/environment';
import { AuthenticationService } from '../../_services/authentication.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  token : any;
  private subject = new Subject<any>();

  constructor(private http: HttpClient, private authentication: AuthenticationService) { 
    this.token = this.authentication.getToken();
  }

  // USUARIOS
  getSupervisores(): Observable<HttpResponse<Object>> {
    return this.http.get(environment.api+"person/getSupervisores", {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )
      , observe:'response'});
  }

  getSupervisores2(): Observable<HttpResponse<Object>> {
    return this.http.get(environment.api+"person/getSupervisores2", {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )
      , observe:'response'});
  }

  getUsers(): Observable<HttpResponse<Object>> {
    return this.http.get(environment.api+"users/getAllInfo", {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )
      , observe:'response'});
  }

  getUser(id:any): Observable<HttpResponse<Object>> {
    return this.http.get(environment.api+`users/getUser/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )
      , observe:'response'});
  }

  getOnlyUser(id:any): Observable<HttpResponse<Object>> {
    return this.http.get(environment.api+`users/getOnlyUser/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )
      , observe:'response'});
  }

  sendUserId(message : any){
    this.subject.next({text : message});
  }

  getUserId(): Observable<any>{
    return this.subject.asObservable();
  }

  //CIRCUITOS
  getFullCircuits(): Observable<any>{
    return this.http.get(environment.api+`circuits/getFullCircuits`, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  getCircuit(id:any): Observable<any>{
    return this.http.get(environment.api+`circuits/getCircuit/${id}`, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  getCircuitsDto(): Observable<any>{
    return this.http.get(environment.api+`circuits/getCircuits`, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }


  sendCircuitId(message : any){
    this.subject.next({text : message});
  }

  getCircuitId(): Observable<any>{
    return this.subject.asObservable();
  }

  //SCHOOLS
  getSchoolsInfo(): Observable<any>{
    return this.http.get(environment.api+`schools/getAllInfo`, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  getSchool(id:any): Observable<any>{
    return this.http.get(environment.api+`schools/getSchool/${id}`, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  getFullSchool(id: any): Observable<any>{
    return this.http.get(environment.api+`schools/getFullSchool/${id}`, 
    {'headers' : new HttpHeaders ({'Content-Type' : 'application/json', 'Authorization': `${this.token}`})});
  }

  sendSchoolId(message : any){
    this.subject.next({text : message});
  }

  getSchoolId(): Observable<any>{
    return this.subject.asObservable();
  }

  //PERSONS

  getPersons(): Observable<HttpResponse<Object>> {
    return this.http.get(environment.api+"person/getAll", {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )
      , observe:'response'});
  }

   getFullPerson(id: any): Observable<any>{
    return this.http.get(environment.api+`person/getFullPerson/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

  sendPersonId(message : any){
    this.subject.next({text : message});
  }

  getPersonId(): Observable<any>{
    return this.subject.asObservable();
  }

  getFunction(id:any): Observable<any>{
    return this.http.get(environment.api+`functions/getFunction/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }



  // Events
  getEvents(): Observable<any> {
    return this.http.get(environment.api+"events/findEvents", {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getEvent(id:any): Observable<any>{
    return this.http.get(environment.api+`events/findEvent/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  // Needs
  getNeed(id:any): Observable<any>{
    return this.http.get(environment.api+`needs/findBySchool/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  //Plans

  getPlans(): Observable<any>{
    return this.http.get(environment.api+`plan/findAll`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getPlan(id: any): Observable<any>{
    return this.http.get(environment.api+`plan/find/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  //Evidence
  getEvidences(id:any): Observable<any>{
    return this.http.get(environment.api+`photos/getEvidence/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  //Deparments
  getDepartments(id:any):Observable<any>{
    return this.http.get(environment.api+`dpto/getDeparments/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getOneDeparment(id:any):Observable<any>{
    return this.http.get(environment.api+`dpto/findDeparment/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getActions(id:any): Observable<any>{
    return this.http.get(environment.api+`actions/findActions/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getAction(id:any): Observable<any>{
    return this.http.get(environment.api+`actions/getAction/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getFullPlan(id:any): Observable<any>{
    return this.http.get(environment.api+`plan/getFullPlan/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getAllSchoolInfo(id:any): Observable<any>{
    return this.http.get(environment.api+`schools/getAllSchoolInfo/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getAllCircuitInfo(id:any): Observable<any>{
    return this.http.get(environment.api+`circuits/getAllSchools/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getDirectores(id:any): Observable<any>{
    return this.http.get(environment.api+`person/directores/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getFullPersonal(id:any): Observable<any>{
    return this.http.get(environment.api+`person/allPersonal/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

  getMatriculas():Observable<any>{
    return this.http.get(environment.api+`matric/getMatriculas`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getOneMatric(id:any):Observable<any>{
    return this.http.get(environment.api+`matric/getMatricula/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

  getMatriculasPlantel(id:any): Observable<any>{
    return this.http.get(environment.api+`matric/getMatriculasPlantel/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
  }

   getMatriculasByCircuit(id:any): Observable<any>{ 
    return this.http.get(environment.api+`matric/getMatriculasCircuit/${id}`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }

   getStadistics():Observable<any>{
    return this.http.get(environment.api+`actions/getStadistics`, {'headers' : 
    new HttpHeaders (
      {'Content-Type' : 'application/json', 'Authorization': `${this.token}`}
      )});
   }
  
}
