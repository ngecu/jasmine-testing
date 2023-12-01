import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:5000/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/allUsers`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.get(url, { headers });
  }

  checkDetails(): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/check_user_details`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.get(url, { headers });
  }

  getOneUser(user_id: string): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/${user_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.get(url, { headers });
  }

  deleteUser(user_id: string): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/${user_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.delete(url, { headers });
  }

}
   