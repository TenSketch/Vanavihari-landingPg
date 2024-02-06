import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ChartComponent } from "ng-apexcharts";


import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions!: Partial<ChartOptions> | any;

  constructor(private router: Router) {
    this.chartOptions = {
      series: [20, 15, 3, 2, 5],
      chart: {
        type: "donut",
        height: 400,
        width: 400
      },
      legend: {
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      labels: ["Unassigned", "Assigned", "Completed", "Rejected", "Scheduled calls"],
      responsive: [
        {
          breakpoint: 1000,
          options: {
            chart: {
              // height: 300,
              width:200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
  }

  goToUserVerification() {
   this.router.navigate(['/customer-records']);
  }
  goToCallerDetails() {
    console.log("called details clicked");
   this.router.navigate(['/caller-details']);
  }
  goToCustomerInfo() {
    console.log("clicked");
   this.router.navigate(['/customer-info']);
  }

}
