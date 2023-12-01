import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { userLogin } from '../interfaces/userLogin';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<any> {
    const url = 'http://localhost:5000/user/register';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, user, { headers });
  }

  login(userLogins: userLogin): Observable<any> {
    const url = 'http://localhost:5000/user/login';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, userLogins, { headers });
  }

  resetPassword(email: string, newPassword: string): Observable<any> {
    const resetData = {
      email: email,
      new_password: newPassword,
    };

    try {
      let token = localStorage.getItem('token') as string;

      const url = 'http://localhost:5000/user/resetPassword';
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'token': token,
      });

      return this.http.post(url, resetData, { headers });
    } catch (error) {
      console.error('Error during password reset:', error);
      throw error;
    }
  }


}