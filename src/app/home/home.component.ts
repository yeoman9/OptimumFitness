import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService, AuthenticationService } from '@app/_services';
import { Router } from '@angular/router';

@Component({ templateUrl: 'home.component.html',
styleUrls: ['dashboard.css'] })
export class HomeComponent {
    loading = false;
    user: User;

    constructor(private userService: UserService, 
                private authenticationService:AuthenticationService,
                private router: Router) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getUser().pipe(first()).subscribe(data => {
            
            this.loading = false;
            this.user = data;
        });
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}