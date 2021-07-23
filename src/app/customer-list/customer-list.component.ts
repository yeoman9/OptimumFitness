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
  query: string = '';
  loading = false;
  error = '';
  success = '';
  imagesUrl : string =environment.apiUrl+'/images';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Customer> = new Subject();
  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router
    ) { 
        route.params.subscribe(params => {
        // put the code from `ngOnInit` here
        var datatable = $('#dtBasicExample').DataTable();
              
              //datatable reloading 
                datatable.destroy();
        this.query = params['query'];
        this.customerService.listCustomers(this.query)
        .pipe(first())
        .subscribe(
            data => {
                this.loading = false;            
                this.customers = data;
                this.dtTrigger.next();
            },
            error => {
                this.error = error;
            });
          });
    }
    
  ngOnInit() { }

  viewCustomer(id : number){
    this.router.navigate(["/customers/view",id]);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
  btnClick(id){
    this.router.navigate(["/customers/list/"+id]);
  }

}
