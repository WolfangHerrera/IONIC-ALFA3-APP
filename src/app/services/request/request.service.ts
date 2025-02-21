import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'https://alfa3-flask-fd769661555f.herokuapp.com';
  constructor(private http: HttpClient) { }

  getItemProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getItems`);
  }

  loginUser(dataRequest: {
    USERNAME: string;
    PASSWORD: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/loginUser`, dataRequest);
  }

  createOrder(dataRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createOrder`, dataRequest);
  }

  getOrderById(queryParam: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getOrder/${queryParam}`);
  }
}
