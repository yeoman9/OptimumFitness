import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private http: HttpClient) { }
  
  getData() {
    return this.http.post<any>(`${environment.apiUrl}/apis/v1/dashboard/data`,{});
  }
  
}