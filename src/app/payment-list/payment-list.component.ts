import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Payment } from '@app/_models';
import { PaymentService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';
import 'datatables.net';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.css']
})
export class PaymentListComponent implements OnInit {
  
  payments: Payment[];
  selectedPayment: Payment;
  query: string = '';
  loading = false;
  error = '';
  success = '';
  imagesUrl : string =environment.apiUrl+'/images';
  dtOptions: DataTables.Settings = {
    columnDefs: [
      { orderable: true, type: 'date', orderDataType:'desc', targets: 0 },
      { orderable: false, targets: '_all' },
  ],
  order:[[0, 'desc']]
};
  dtTrigger: Subject<Payment> = new Subject();
  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute,
    private router: Router,
    private cdRef:ChangeDetectorRef
    ) {

    route.params.subscribe(params => {

      var datatable = $('#paymentList').DataTable();
      //datatable reloading 
      datatable.destroy();
      this.query = params['query'];

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
    });

  }
    
ngOnInit() {  }
  
printPayment(payment : Payment){
  
    this.selectedPayment = payment;
    this.cdRef.detectChanges();
    
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
  }
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
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

 btnClick(id){
  this.router.navigate(["/payments/list/"+id]);
 }
}
