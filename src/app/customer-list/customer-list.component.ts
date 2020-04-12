import { Component, OnInit } from '@angular/core';
import { Customer } from '@app/_models';
import { FormBuilder } from '@angular/forms';
import { CustomerService, AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import 'datatables.net';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';

@Component({ templateUrl: 'customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];
  loading = false;
  error = '';
  success = '';
  serverUrl : string =environment.apiUrl;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Customer> = new Subject();
  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }
    
  ngOnInit() {
    
    this.customerService.listCustomers()
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            console.log(JSON.stringify(data));
            
            this.customers = data;
            this.dtTrigger.next();
        },
        error => {
            this.error = error;
        });
        
  }

  viewCustomer(id : number){
    this.router.navigate(["/viewCustomer",id]);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
