import { Component, OnInit } from '@angular/core';
import { DashboardService, AuthenticationService } from '@app/_services';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Dashboard } from '@app/_models';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';
import 'chart.js';
import 'chart.piecelabel.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  dashboard: Dashboard;
  loading = false;
  error = '';
  success = '';
  constructor(private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.dashboardService.getData()
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            this.dashboard = data;
            this.doughnutChartData = [[this.dashboard.activeCustomers, this.dashboard.inActiveCustomers]];
        },
        error => {
            this.error = error;
        });
  }
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLabels: Label[] = ['Active', 'Due'];
  doughnutChartData: MultiDataSet = [];
  chartColors: Color[] = [{
    backgroundColor: [
      "#86C1FB",
      "#FFA1B5"      
  ],
  hoverBackgroundColor: [
    "#36A2EB",  
    "#FF6384"      
  ]}

  ];
  chartOptions: any = {
    pieceLabel: {
      render: function (args) {
        const label = args.label,
              value = args.value;
        return value;
      }
    }
  }
  
  

  chartClicked(e){
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
        if ( activePoints.length > 0) {
          // get the internal index of slice in pie chart
          const clickedElementIndex = activePoints[0]._index;
          const label = chart.data.labels[clickedElementIndex];
          // get value by index
          const value = chart.data.datasets[0].data[clickedElementIndex];
          console.log(clickedElementIndex, label, value)
          if(label == 'Active'){
            this.router.navigate(["/customers/list/active"]);
          }
          if(label == 'Due'){
            this.router.navigate(["/customers/list/due"]);
          }
        }
       }
  }

}
