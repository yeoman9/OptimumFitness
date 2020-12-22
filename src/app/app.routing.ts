import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';
import { PaymentAddComponent } from './payment-add/payment-add.component';
import { PaymentListComponent } from './payment-list/payment-list.component';

const routes: Routes = [
    { path: '', 
      component: HomeComponent, canActivate: [AuthGuard],
      children: [
        { path: 'dashboard', 
          component: DashboardComponent, 
          canActivate: [AuthGuard]
        },
        { path: 'payments', 
          canActivate: [AuthGuard],
          children: [
            { path: 'add', 
              component: PaymentAddComponent, 
              canActivate: [AuthGuard]
            },
            { path: 'list/:query', 
              component: PaymentListComponent, 
              canActivate: [AuthGuard]
            }
          ]
        },
        { path: 'attendance', 
          component: AttendanceDetailComponent, 
          canActivate: [AuthGuard]
        },
        { path: 'customers', 
          canActivate: [AuthGuard],
          children: [
            { path: 'add', 
              component: CustomerAddComponent, 
              canActivate: [AuthGuard]
            },
            { path: 'list/:query', 
              component: CustomerListComponent, 
              canActivate: [AuthGuard]
            },
            { path: 'view/:id', 
              component: CustomerDetailComponent, 
              canActivate: [AuthGuard]
            }
          ]
        },
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'attendanceLogin', component: AttendanceComponent },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '/dashboard', canActivate: [AuthGuard] }
];

export const appRoutingModule = RouterModule.forRoot(routes);