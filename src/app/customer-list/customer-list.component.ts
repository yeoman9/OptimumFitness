import { Component, OnInit } from '@angular/core';
import { Customer } from '@app/_models';
import { FormBuilder } from '@angular/forms';
import { CustomerService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import 'datatables.net';

@Component({ templateUrl: 'customer-list.component.html',
})
export class CustomerListComponent implements OnInit {
  customers: Customer[];
  loading = false;
  error = '';
  success = '';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Customer> = new Subject();
  constructor(private formBuilder: FormBuilder,
    private customerService: CustomerService) { }
    
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

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
