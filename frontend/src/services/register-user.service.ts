// register-user.service.ts

import { Injectable, importProvidersFrom } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class RegisterUserService {
  private apiUrl = 'http://localhost:5000/user/register';

  constructor(private http: HttpClient) {}

  registerUser(userDetails: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post<any>(this.apiUrl, userDetails, { headers });
  }
}
