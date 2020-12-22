import { Component, OnInit } from '@angular/core';
import { Payment } from '@app/_models';
import { FormBuilder } from '@angular/forms';
import { PaymentService, AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import 'datatables.net';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html'
})
export class PaymentListComponent implements OnInit {
  payments: Payment[];
  query: string = '';
  loading = false;
  error = '';
  success = '';
  imagesUrl : string =environment.apiUrl+'/images';
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Payment> = new Subject();
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router
    ) { }
    
  ngOnInit() {
    
    this.route.params.subscribe(params => {
      this.query = params['query'];
    });
    this.paymentService.listPayment(this.query)
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;            
            this.payments = data;
            this.dtTrigger.next();
        },
        error => {
            this.error = error;
        });
        
  }

  viewCustomer(id : number){
    this.router.navigate(["/customers/view",id]);
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }


}
