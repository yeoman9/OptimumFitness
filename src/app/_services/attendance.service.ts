import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private http: HttpClient) { }
  
  login(pin : string) {
    return this.http.post<any>(`${environment.apiUrl}/attendance`,pin);
  }
  
}
