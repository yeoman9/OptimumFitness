import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { PaymentService , CustomerService } from '@app/_services';
import { Customer } from '@app/_models';
import { environment } from '@environments/environment';
import { formatDate } from '@angular/common';
import { WindowScrollController } from '@fullcalendar/core';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.css']
})
export class PaymentAddComponent implements OnInit {

  @ViewChild('search',{static: false}) search : ElementRef;
  customerList : Customer[];
  imagesUrl : string =environment.apiUrl+'/images';
  id: number;
  paymentForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  success = '';
  
  selectedCustomer : Customer; 
  currentDate = new Date();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private paymentSevice: PaymentService) { }

  ngOnInit() {
    this.paymentForm = this.formBuilder.group({
      paymentFrom:['',Validators.required],
      paymentTo:['',Validators.required],
      amount:['',Validators.required],
      mode:['',Validators.required],
      months:['']
  });
    
  }
  onSearch(searchKey : string){
    if(searchKey === null || searchKey === ""){
      this.customerList = [];

    }
    else if(searchKey.length > 2){
      this.customerService.searchCustomersByName(searchKey)
      .pipe(first())
      .subscribe(
        data => {
            this.loading = false;
            this.customerList = data;
            this.error = '';
        },
        error => {
            this.error = error;
        });
    }
  }
  showCustomer(customer : Customer){
    this.customerList = [];    
    this.selectedCustomer = customer;
    this.search.nativeElement.value = customer.name;
  }
  viewPayments(id : number){
    this.router.navigate(["/payments/list",id]);
  }
  onSubmit(paymentForm) {
    this.submitted = true;
    this.success='';
    this.error='';
    // stop here if form is invalid
    if (this.paymentForm.invalid) {
        return;
    }  
    const formData = new FormData();

    Object.keys(this.f).forEach(key => {
      if(this.f[key].value){
        formData.append(key, this.f[key].value);
      }
    });

    if(this.selectedCustomer != null){
      formData.append("customerId", ""+this.selectedCustomer.id);
    }
    
    this.paymentSevice.addPayment(formData)
            .pipe(first())
            .subscribe(
                data => {
                    this.submitted = false;
                    this.loading = false;
                    this.success = data.message;                    
                    //this.resetForm();

                    let printContents, popupWin;
                    printContents = document.getElementById('print-section').innerHTML;
                    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
                    popupWin.document.open();
                    popupWin.document.write(`
                      <html style="border-style: dotted">
                        <head>
                          <title></title>
                          <style>
                          @page { size: auto;  margin: 7mm; }
                          </style>
                        </head>
                        <body onload="window.print();window.close()">${printContents}</body>
                      </html>`
                    );
                    popupWin.document.close();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });    
                this.loading = true;              
  }
  
  // convenience getter for easy access to form fields
  get f() { return this.paymentForm.controls; }
  
  onMonthSelect(month){    
    if( this.f.paymentFrom.value != ''){
      var calcDate : Date;
      calcDate = new Date(this.f.paymentFrom.value);
      var newNum = calcDate.getMonth() + parseInt(month);
      calcDate.setMonth( newNum);
      calcDate.setDate(calcDate.getDate() - 1);
      this.paymentForm.patchValue({paymentTo: formatDate(new Date(calcDate), 'yyyy-MM-dd', 'en')});
    }
    return;
  }
    
   convertNumberToWords(data) {
   debugger
    var words = new Array();
    words[0] = '';
    words[1] = 'One';
    words[2] = 'Two';
    words[3] = 'Three';
    words[4] = 'Four';
    words[5] = 'Five';
    words[6] = 'Six';
    words[7] = 'Seven';
    words[8] = 'Eight';
    words[9] = 'Nine';
    words[10] = 'Ten';
    words[11] = 'Eleven';
    words[12] = 'Twelve';
    words[13] = 'Thirteen';
    words[14] = 'Fourteen';
    words[15] = 'Fifteen';
    words[16] = 'Sixteen';
    words[17] = 'Seventeen';
    words[18] = 'Eighteen';
    words[19] = 'Nineteen';
    words[20] = 'Twenty';
    words[30] = 'Thirty';
    words[40] = 'Forty';
    words[50] = 'Fifty';
    words[60] = 'Sixty';
    words[70] = 'Seventy';
    words[80] = 'Eighty';
    words[90] = 'Ninety';
    var amount = data;
    var atemp = amount.split(".");
    var number = atemp[0].split(",").join("");
    var n_length = number.length;
    var words_string = "";
    var value = 0;

    if (n_length <= 9) {
        var n_array = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
        var received_n_array = new Array();
        for (var i = 0; i < n_length; i++) {
            received_n_array[i] = number.substr(i, 1);
        }
        for (var i = 9 - n_length, j = 0; i < 9; i++, j++) {
            n_array[i] = received_n_array[j];
        }
        for (var i = 0, j = 1; i < 9; i++, j++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                if (n_array[i] == 1) {
                    n_array[j] = 10 + n_array[j];
                    n_array[i] = 0;
                }
            }
        }
        for (var i = 0; i < 9; i++) {
            if (i == 0 || i == 2 || i == 4 || i == 7) {
                value = n_array[i] * 10;
            } else {
                value = n_array[i];
            }
            if (value != 0) {
                words_string += words[value] + " ";
            }
            if ((i == 1 && value != 0) || (i == 0 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Crores ";
            }
            if ((i == 3 && value != 0) || (i == 2 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Lakhs ";
            }
            if ((i == 5 && value != 0) || (i == 4 && value != 0 && n_array[i + 1] == 0)) {
                words_string += "Thousand ";
            }
            if (i == 6 && value != 0 && (n_array[i + 1] != 0 && n_array[i + 2] != 0)) {
                words_string += "Hundred and ";
            } else if (i == 6 && value != 0) {
                words_string += "Hundred ";
            }
        }
        words_string = words_string.split("  ").join(" ");
    }
    return words_string;
}
 

}
