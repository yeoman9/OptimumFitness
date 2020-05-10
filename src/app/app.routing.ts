import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceDetailComponent } from './attendance-detail/attendance-detail.component';

const routes: Routes = [
    { path: '', 
      component: HomeComponent, canActivate: [AuthGuard],
      children: [
        { path: 'dashboard', 
          component: DashboardComponent, 
          canActivate: [AuthGuard]
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
              component: CustomerViewComponent, 
              canActivate: [AuthGuard]
            }
          ]
        },
      ]
    },
    { path: 'login', component: LoginComponent },
    { path: 'attendanceLogin', component: AttendanceComponent },
    

    // otherwise redirect to home
    { path: '**', redirectTo: '/dashboard' }
];

export const appRoutingModule = RouterModule.forRoot(routes);