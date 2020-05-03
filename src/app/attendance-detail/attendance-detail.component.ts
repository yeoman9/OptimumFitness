import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { AttendanceService } from '@app/_services/attendance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-attendance-detail',
  templateUrl: './attendance-detail.component.html',
  styleUrls: ['./attendance-detail.css']
})
export class AttendanceDetailComponent implements OnInit {

  //@ViewChild('calendar',{static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template

  calendarPlugins = [dayGridPlugin];
  calendarWeekends = true;
  calendarEvents: EventInput[];
  id: number;
  loading = false;
  error = '';
  success = '';
  calendarVisible: boolean = false;

  constructor(private attendanceService: AttendanceService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log("id updated : "+this.id)
    });

    this.attendanceService.getAttendanceDetail(this.id)
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            this.calendarEvents = data;
            this.calendarVisible = true;
        },
        error => {
            this.calendarVisible = false;
            this.error = error;
        });
  }
}
