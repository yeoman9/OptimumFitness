import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import { AttendanceService } from '@app/_services';
import { first } from 'rxjs/operators';
import { Customer } from '@app/_models';

@Component({
  selector: 'app-attendance-calendar',
  templateUrl: './attendance-calendar.component.html'
})
export class AttendanceCalendarComponent implements OnInit,OnChanges {

  @ViewChild('calendar',{static: false}) calendarComponent: FullCalendarComponent; // the #calendar in the template
  @Input() customer : Customer;
  calendarPlugins = [dayGridPlugin, bootstrapPlugin ];
  calendarWeekends = true;
  calendarEvents: EventInput[];
  loading = false;
  error = '';
  success = '';
  calendarVisible: boolean = false;

  constructor(private attendanceService: AttendanceService) { }
  
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.customer){
      this.calendarVisible = true;
      this.showCalender(this.customer.id);
    }
     
  }

  ngOnInit() {  
  }
  
  showCalender(id : number){
    this.attendanceService.getAttendanceDetail(id)
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            this.calendarEvents = data;
            this.calendarVisible = true;
            this.error = '';
        },
        error => {
            this.calendarVisible = false;
            this.error = error;
        });
  }
}
