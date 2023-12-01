import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'http://localhost:5000/order';

  constructor(private http: HttpClient) {}

  addOrderItems(orderData: any): Observable<any> {
    const url = `${this.baseUrl}/`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http.post(url, orderData, { headers });
  }

  getOrders(): Observable<any> {
    const url = `${this.baseUrl}/`;
    let token = localStorage.getItem('token') as string;
    const headers = new HttpHeaders({
      'token': token,
    });

    return this.http.get(url, { headers });
  }

  getMyOrders(user_id: string): Observable<any> {
    let token = localStorage.getItem('token') as string;
    const url = `${this.baseUrl}/myorders/${user_id}`;
    const headers = new HttpHeaders({
      'token': token,
      'Content-Type': 'application/json', 
    });

    return this.http.get(url, { headers });
  }

  getOrderById(orderId: string): Observable<any> {
    let token = localStorage.getItem('token') as string;

    const url = `${this.baseUrl}/${orderId}`;
    const headers = new HttpHeaders({
      'token': token,
    });

    return this.http.get(url, { headers });
  }

}
