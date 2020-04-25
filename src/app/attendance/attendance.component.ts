import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs/internal/operators/first';
import { AttendanceService } from '@app/_services/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['attendance.css']
})
export class AttendanceComponent implements OnInit {
  attendanceForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  success: '';
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private attendanceService: AttendanceService) { }

  ngOnInit() {
    this.attendanceForm = this.formBuilder.group({
      pin: ['', Validators.required]
  });


  }

  // convenience getter for easy access to form fields
  get f() { return this.attendanceForm.controls; }

  onSubmit() {
      this.submitted = true;
      this.error = '';
      this.success = '';
      // stop here if form is invalid
      if (this.attendanceForm.invalid) {
          return;
      }

      this.loading = true;
      this.attendanceService.login(this.f.pin.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.submitted = false;
                  this.success = data.message;
                  this.resetForm();
              },
              error => {
                  this.error = error; 
                  this.resetForm();                 
              });
      this.loading = false;
     
  }
  resetForm() {
    this.attendanceForm.reset();
  }

}
