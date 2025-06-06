import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'https://backend.alfa3electricos.com';
  private apiUrls = 'http://192.168.1.18:8081';
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

  registerUser(dataRequest: {
    USERNAME: string;
    PASSWORD: string;
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/registerUser`, dataRequest);
  }

  updateUser(dataRequest: {
    USERNAME: string;
    CUSTOMER_DETAILS: string;
  }): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateUser`, dataRequest);
  }

  createOrder(dataRequest: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createOrder`, dataRequest);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getOrder/${orderId}`);
  }

  updateOrdersWithSubStatus(status: string, body : any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateOrdersWithSubStatus/${status}`, body);
  }

  getOrderByCustomerId(customerId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getOrdersByCustomerId/${customerId}`);
  }

  getOrdersBySubStatus(subStatus: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/getOrdersBySubStatus/${subStatus}`);
  }

  getMercadoLibrePDF(listPdf: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/generateMercadoLibrePDF`, listPdf);

  }
}
