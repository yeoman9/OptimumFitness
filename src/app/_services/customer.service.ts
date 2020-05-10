import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  updateCustomer(formData: FormData) {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/customer/update`,formData);
  }
  constructor(private http: HttpClient) { }
  addCustomer(formData : FormData) {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/customer/add`,formData);
  }
  listCustomers(query:string) {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/customer/list`,query);
  }
  getCustomer(id: number) {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/customer/get`,id);
  }

  searchCustomersByName(searchKey : string) {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/customer/searchByName`,searchKey );
  }
}
