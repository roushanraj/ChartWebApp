import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { HttpClient } from '@angular/common/http';
import LinearGradient from 'zrender/lib/graphic/LinearGradient';




@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit{
  options: any;
  names: string[]=[];
  marks: number[]=[];
  constructor(private httpclient: HttpClient,private changedetect: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getResult();
    console.log(this.names);
    const dataAxis = this.names;
    const data = this.marks;
    const yMax = 100;
    const dataShadow = [];

    for (let i = 0; i < data.length; i++) {
      dataShadow.push(yMax);
    }

    this.options = {
      title: {
        text: 'Student\'s marks Distribution in 8th standard',
      },
      xAxis: {
        data: dataAxis,
        axisLabel: {
          interval:0,
          rotate: 30,
          inside: false,
          color: '#000',
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        z: 10,
      },
      yAxis: {
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          textStyle: {
            color: '#999',
          },
        },
      },
      dataZoom: [
        {
          type: 'inside',
        },
      ],
      series: [
        {
          // For shadow
          type: 'bar',
          itemStyle: {
            color: 'rgba(0,0,0,0.05)'
          },
          barGap: '-100%',
          barCategoryGap: '40%',
          data: dataShadow,
          animation: false,
        },
        {
          type: 'bar',
          itemStyle: {
            color: new LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#be0e0e' },
              { offset: 0.5, color: '#f68484' },
              { offset: 1, color: '#be0e0e' },
            ]),
          },
          emphasis: {
            itemStyle: {
              color: new LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' },
              ]),
            }
          },
          data,
        },
      ],
    };
    this.changedetect.detectChanges();
  }
  onChartEvent(event: any, type: string) {
    console.log('chart event:', type, event);
  }


  getResult(){
    this.httpclient.get<Result[]>('http://localhost:9876/result').subscribe(
      (data: any) => {
        for(let item of data){
          this.names.push(item.name);
          this.marks.push(item.percentage);
        }
      
      }
    );
  }
  

}

export class Result {
  constructor(
    public name: string,
    public rollNo: number,
    public standard: number,
    public percentage: number
  ){}
}

