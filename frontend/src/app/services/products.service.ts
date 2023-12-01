import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private baseUrl = 'http://localhost:5000/product';

  constructor(private http: HttpClient) {}

  createProduct(productData: any): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.post(url, productData, { headers });
  }

  getAllProducts(): Observable<any> {
    const url = `${this.baseUrl}`;
    return this.http.get(url);
  }

  getProductById(productId: string): Observable<any> {
    const url = `${this.baseUrl}/${productId}`;
    return this.http.get(url);
  }

  updateProduct(productId: string, productData: any): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/${productId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'token': token,
    });

    return this.http.put(url, productData, { headers });
  }

  deleteProduct(productId: string): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/${productId}`;
    const headers = new HttpHeaders({
      'token': token,
    });

    return this.http.delete(url, { headers });
  }

  categoryProducts(categoryId: string): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/category/${categoryId}`;
    return this.http.get(url);
  }


}
