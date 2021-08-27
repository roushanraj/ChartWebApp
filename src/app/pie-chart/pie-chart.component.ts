import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent } from 'ng-apexcharts';


//import { NzMessageService } from 'ng-zorro-antd/message';
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
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit{

  expense: number[]=[];
  aspect: string[]=[];

  @ViewChild("chart") chart:any| ChartComponent;
  public chartOptions: Partial<ChartOptions> |any;

  ngOnInit(): void {
    this.getExpense();
  }
  constructor(private httpclient: HttpClient,private changedetect: ChangeDetectorRef) {
    this.chartOptions = {
      series: this.expense,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: this.aspect,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  getExpense(){
    this.httpclient.get<Expense[]>('http://localhost:9876/budget').subscribe(
      (data: any) => {
        for(let item of data){
          console.log(data);
          this.expense.push(item.expense);
          this.aspect.push(item.aspect);
        }
      
      }
    );
  }

}

export class Expense {
  constructor(
    public id: number,
    public expense: number,
    public aspect: string,
   
  ){}
}