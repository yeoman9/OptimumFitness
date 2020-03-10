import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CustomerService } from '@app/_services';

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
      doj:['',Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.customerForm.controls; }

  onSubmit(customerForm) {
    this.submitted = true;
    // stop here if form is invalid
    if (this.customerForm.invalid) {
        return;
    }
    
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
