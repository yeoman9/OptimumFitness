import { Component, OnInit, ViewChild, EventEmitter, Output, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService, CustomerService } from '@app/_services';
import { Customer } from '@app/_models';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.css']
})
export class AttendanceDetailComponent implements OnInit {

  @ViewChild('search',{static: false}) search : ElementRef;
  customerList : Customer[];
  imagesUrl : string =environment.apiUrl+'/images';
  id: number;
  loading = false;
  error = '';
  success = ''; 
  selectedCustomer : Customer; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService) { }

  ngOnInit() {
    
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
  showAtteandance(customer : Customer){
    this.customerList = [];    
    this.selectedCustomer = customer;
    this.search.nativeElement.value = customer.name;
    //this.router.navigate(["/attendance/detail",customer.id]);
  }
}
