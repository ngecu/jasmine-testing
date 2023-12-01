import { Injectable } from '@angular/core';
import { Category } from '../interfaces/category';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = 'http://localhost:5000/category';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.get(url, { headers });
  }

  createCategory(category: Category): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = 'http://localhost:5000/category';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.post(url, category, { headers });
  }

  getOneCategory(user_id: string): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `http://localhost:5000/category/${user_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.get(url, { headers });
  }

  deleteCategory(user_id: string): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `http://localhost:5000/category/${user_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.delete(url, { headers });
  }
}