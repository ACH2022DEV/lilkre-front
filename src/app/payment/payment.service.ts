import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = "http://localhost:8080/lilkre-back/api/v1/payment";
  constructor(private http: HttpClient) { }

  makePayment(amount: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/makePayment?amount=${amount}`, { headers: headers });
  }

  verifierPayment(id: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/verifyPayment/${id}`,  { headers: headers });
  }


}
