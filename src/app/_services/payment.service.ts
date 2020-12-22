import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) { }

  addPayment(formData : FormData) {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/payment/add`,formData);
  }
  listPayment(query:string) {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/payment/list`,query);
  }
}
