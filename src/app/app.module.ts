import { NgModule } from '@angular/core';
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
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';;
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AttendanceCalendarComponent } from './attendance-detail/attendance-calendar/attendance-calendar.component';
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        appRoutingModule,
        DataTablesModule,
        FullCalendarModule
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        CustomerAddComponent ,
        CustomerListComponent ,
        CustomerViewComponent ,
        DashboardComponent ,
        AttendanceComponent,
        AttendanceDetailComponent,
        AttendanceCalendarComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }