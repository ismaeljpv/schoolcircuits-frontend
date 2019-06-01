import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  url = "https://github.com/typicode/demo/blob/master/db.json";
  
  constructor(private http: HttpClient) { }
}
