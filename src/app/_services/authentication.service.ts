import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { CurrentUser } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<CurrentUser>;
    public currentUser: Observable<CurrentUser>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<CurrentUser>(
            JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): CurrentUser {
        return this.currentUserSubject.value;
    }

    public get isAdmin(){
        var authorities = this.currentUserValue?.authorities;
        if(authorities != undefined && authorities !=null){
            for (let authority of authorities) {
                if (authority.authority == 'ADMIN'){
                    return true;
                }
            }
            return false;
        }
        return false;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/token/generate-token`, { username, password })
            .pipe(map(currentUser => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(currentUser));
                this.currentUserSubject.next(currentUser);
                return currentUser;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}