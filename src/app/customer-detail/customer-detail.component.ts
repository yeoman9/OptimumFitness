import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, CustomerService } from '@app/_services';
import { Customer } from '@app/_models';
import { first } from 'rxjs/operators';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.css']
})
export class CustomerDetailComponent implements OnInit {
  id: number;
  customer: Customer;
  customerForm: FormGroup;
  imagesUrl : string =environment.apiUrl+'/images';
  submitted = false;
  loading = false;
  error = '';
  success = '';
  docImage: File;
  avatar: File;
  avatarUrl: any;
  docImageUrl: any;
  
  constructor( 
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      id:[],
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      mobile:['',[Validators.required,
          Validators.pattern(/^(\d{10}$)/)]],
      dateOfJoin:['',Validators.required],
      lastDate:['',Validators.required],
      pin:['',Validators.required],
      gender:[''],
      months:[''],
      kycType:[''],
      docNumber:[''],
      avatar:[''],
      docImage:['']
  });

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.customerService.getCustomer(this.id)
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            this.customer = data;
            this.customerForm.patchValue(this.customer);
            if( this.customer.avatar !==null){
              this.avatarUrl = this.imagesUrl + "/" + this.customer.avatar;
            }
            if( this.customer.docImage !==null){
              this.docImageUrl = this.imagesUrl + "/" + this.customer.docImage;
            }
        },
        error => {
            this.error = error;
        });

  }
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
  uploadDocImage(fileInput: any) {
    this.docImage = <File>fileInput.target.files[0];
    var reader = this.preview(this.docImage,this.docImageUrl);
    reader.onload = (_event) => { 
      this.docImageUrl = reader.result; 
    }
  }
  uploadAvatar(fileInput: any) {
    this.avatar = <File>fileInput.target.files[0];
    var reader = this.preview(this.avatar,this.avatarUrl);
    reader.onload = (_event) => { 
      this.avatarUrl = reader.result; 
    }
  }
  preview(image: File, imageUrl: any) {
    var mimeType = image.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    var reader = new FileReader();      
    reader.readAsDataURL(image); 
    return reader;
  }
  onSubmit(customerForm) {
    this.submitted = true;
    this.success='';
    this.error='';
    // stop here if form is invalid
    if (this.customerForm.invalid) {
        return;
    }
    if(this.docImageUrl && !(this.f.kycType.value || this.f.docNumber.value)){
      this.f.kycType.setErrors(Validators.required);
      this.f.docNumber.setErrors(Validators.required);
      return;
    }

    
    const formData = new FormData();

    Object.keys(this.f).forEach(key => {
      if(this.f[key].value){
        if(key != 'avatar' && key !='docImage' ){
          formData.append(key, this.f[key].value);
        }          
      }
    });
    if(this.docImage instanceof File){
      formData.append("docImage", this.docImage);
    }
    if(this.avatar instanceof File){
      formData.append("avatar", this.avatar);
    }
    this.customerService.updateCustomer(formData)
            .pipe(first())
            .subscribe(
                data => {
                    this.submitted = false;
                    this.loading = false;
                    this.success = data.message;                    
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });    
                this.loading = true;
  }
  viewAttendance(id : number){
    
  }
  onSelectFile($event){

  }
  getAvatar(avatar: string){
    return this.imagesUrl + '/' + avatar;
  }
  
}
