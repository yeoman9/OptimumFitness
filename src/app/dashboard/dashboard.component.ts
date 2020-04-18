import { Component, OnInit } from '@angular/core';
import { DashboardService, AuthenticationService } from '@app/_services';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Dashboard } from '@app/_models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard;
  loading = false;
  error = '';
  success = '';
  constructor(private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.dashboardService.getData()
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            console.log(JSON.stringify(data));            
            this.dashboard = data;
        },
        error => {
            this.error = error;
        });
  }

}
