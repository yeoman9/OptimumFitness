import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '@app/_services';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("intercept :")
        // add authorization header with jwt token if available
        let authToken = this.authenticationService.authTokenValue;
        if (authToken && authToken.token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${authToken.token}`
                }
            });
        }

        return next.handle(request);
    }
}