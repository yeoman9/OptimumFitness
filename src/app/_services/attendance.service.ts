import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private http: HttpClient) { }
  
  login(pin : string) {
    return this.http.post<any>(`${environment.apiUrl}/attendance`,pin);
  }

  getAttendanceDetail(id : number){
    return this.http.post<any>(`${environment.apiUrl}/attendance/detail`,id);
  }
  
}
