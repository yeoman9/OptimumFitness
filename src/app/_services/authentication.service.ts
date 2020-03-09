import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { AuthToken } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private authTokenSubject: BehaviorSubject<AuthToken>;
    public authToken: Observable<AuthToken>;

    constructor(private http: HttpClient) {
        this.authTokenSubject = new BehaviorSubject<AuthToken>(
            JSON.parse(localStorage.getItem('authToken')));
        this.authToken = this.authTokenSubject.asObservable();
        console.log("Auth header:"+ this.authTokenValue );
    }

    public get authTokenValue(): AuthToken {
        return this.authTokenSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/token/generate-token`, { username, password })
            .pipe(map(token => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('authToken', JSON.stringify(token));
                this.authTokenSubject.next(token);
                return token;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        console.log("logout called");
        localStorage.removeItem('authToken');
        this.authTokenSubject.next(null);
    }
}