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
  docImage: File;
  avatar: File;
  avatarUrl: any;
  docImageUrl: any;
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
      months:[''],
      kycType:[''],
      docNumber:[''],
      avatar:[''],
      docImage:['']
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
    // stop here if form is invalid
    if (this.customerForm.invalid) {
        return;
    }
    this.success='';
    this.error='';
    
    const formData = new FormData();

    Object.keys(this.f).forEach(key => {
      if(this.f[key].value){
        formData.append(key, this.f[key].value);
      }
    });
    if(this.docImage){
      formData.append("docImage", this.docImage);
    }
    if(this.avatar){
      formData.append("avatar", this.avatar);
    }
    
    
    this.customerService.addCustomer(formData)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    this.success = data.message;                    
                    this.resetForm();
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });    
                this.loading = true;
  }
  resetForm() {
    this.customerForm.reset();
    Object.keys(this.customerForm.controls).forEach(key => {
      this.customerForm.get(key).setErrors(null) ;
    });
    this.docImageUrl = null;
    this.avatarUrl = null;
  }
}
