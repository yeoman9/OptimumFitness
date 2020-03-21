import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  addCustomer(formData : JSON) {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/customer/add`,formData);
  }
  listCustomers() {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/customer/list`,{});
  }
}
