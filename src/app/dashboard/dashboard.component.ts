import { Component, OnInit } from '@angular/core';
import { DashboardService, AuthenticationService } from '@app/_services';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { CustomerCount, PaymentCount, MonthWisePayment } from '@app/_models';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';


import 'chart.js';
import 'chart.piecelabel.js';
import Utils from '@app/_helpers/utils';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  customerCount: CustomerCount;
  paymentCount: PaymentCount;
  monthWisePayments: MonthWisePayment[];
  loading = false;
  error = '';
  success = '';
  constructor(private dashboardService: DashboardService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.authenticationService
    this.dashboardService.getCustomerCount()
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            this.customerCount = data;
            this.doughnutChartData = [[this.customerCount.activeCustomers, this.customerCount.inActiveCustomers, this.customerCount.aboutTodueCCustomers]];
        },
        error => {
            this.error = error;
      });
    
    this.dashboardService.getPaymentCount()
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            this.paymentCount = data;
        },
        error => {
            this.error = error;
      });
      
    this.dashboardService.getMonthWiseCollection( new Date().getFullYear() )
    .pipe(first())
    .subscribe(
        data => {
            this.loading = false;
            this.monthWisePayments = data;
            var i = 1; 
            for (let m of this.monthWisePayments){
              
              this.barChartLabels.push(Utils.MonthsMap.get(m.month));
              this.monthlyData.push(m.total);     
                       
            }
        },
        error => {
            this.error = error;
      });

  }
  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLabels: Label[] = ['Active', 'Due', 'About to Due'];
  doughnutChartData: MultiDataSet = [];
  chartColors: Color[] = [{
    backgroundColor: [
      "#86C1FB",
      "#FFA1B5",
      "#FBFA86"     
  ],
  hoverBackgroundColor: [
    "#36A2EB",  
    "#FF6384",
    "#EBD936"     
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
  
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels : Label[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public monthlyData = [];
  public barChartData = [
    {data: this.monthlyData, label: 'Monthly Collection'}
  ];
  

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
          if(label == 'About to Due'){
            this.router.navigate(["/customers/list/aboutToDue"]);
          }
        }
       }
  }

}
