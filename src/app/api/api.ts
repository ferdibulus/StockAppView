import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { urlEnum } from '../enums/urlEnum';

@Injectable({
  providedIn: 'root'
})
export class Api {
  urlEnum = urlEnum.APIURL;
  constructor(private http: HttpClient) {}

  saveUser(user:any): Observable<any> {
    const url = this.urlEnum + '/users/login';
    return this.http.post<any>(url, user);
  }

  getAllProducts(): Observable<any> {
    const url = this.urlEnum + '/products';
    return this.http.get<any>(url);
  }
}