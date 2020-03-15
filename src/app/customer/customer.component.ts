import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CustomerService } from '@app/_services';
import { formatDate } from '@angular/common';

@Component({ templateUrl: 'customer.component.html'})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  success = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    ) { }

  ngOnInit() {
     
    this.customerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile:['',Validators.required],
      dateOfJoin:['',Validators.required],
      lastDate:['',Validators.required],
      pin:['',Validators.required],
      gender:[''],
      months:['']
  });

  this.customerForm.patchValue({gender: 'MALE'});
  }

  // convenience getter for easy access to form fields
  get f() { return this.customerForm.controls; }
  setPin(customerForm){
    customerForm.patchValue({pin: this.f.mobile.value.substring(this.f.mobile.value.length - 4, this.f.mobile.value.length)});
  }

  onMonthSelect(month){    
    if( this.f.dateOfJoin.value != ''){
      var calcDate : Date;
      calcDate = new Date(this.f.dateOfJoin.value);
      var newNum = calcDate.getMonth() + parseInt(month);
      calcDate.setMonth( newNum);
      this.customerForm.patchValue({lastDate: formatDate(new Date(calcDate), 'yyyy-MM-dd', 'en')});
    }
    return;
  }

  onSubmit(customerForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.customerForm.invalid) {
        return;
    }
    this.success='';
    this.error='';
    
    this.customerService.addCustomer(this.customerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.success = data.message;
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });    
                this.loading = true;
}

}
