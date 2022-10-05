import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Api {

  constructor(private http: HttpClient) {}

  saveUser(user:any): Observable<any> {
    const url = 'http://92.205.30.150:8181/users/login';
    return this.http.post<any>(url, user);
  }

  getAllProducts(): Observable<any> {
    const url = 'http://92.205.30.150:8181/products';
    return this.http.get<any>(url);
  }
}