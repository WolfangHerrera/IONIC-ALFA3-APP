import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private apiUrl = 'http://192.168.1.48:8081';
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
}
