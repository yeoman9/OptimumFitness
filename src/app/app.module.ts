﻿import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {DataTablesModule} from 'angular-datatables';

import { AppComponent } from './app.component';
import { appRoutingModule } from './app.routing';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';;
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ChartsModule } from 'ng2-charts';
import { AttendanceCalendarComponent } from './attendance-detail/attendance-calendar/attendance-calendar.component';;
import { PaymentAddComponent } from './payment-add/payment-add.component';;
import { PaymentListComponent } from './payment-list/payment-list.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        DataTablesModule,
        ChartsModule,
        FullCalendarModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        CustomerAddComponent ,
        CustomerListComponent ,
        CustomerDetailComponent ,
        DashboardComponent ,
        AttendanceComponent,
        AttendanceDetailComponent,
        AttendanceCalendarComponent,
        PaymentAddComponent,
        PaymentListComponent  
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }