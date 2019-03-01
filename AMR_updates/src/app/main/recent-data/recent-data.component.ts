import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { first } from 'rxjs/operators';
import { FormBuilder } from '@angular/forms';
import { MessagesService } from 'app/messages.service';
import { RecentDataService } from './recent-data.service';
import { Router } from '@angular/router';
import { AppService } from 'app/app.service';

@Component({
  selector: 'recent-data',
  templateUrl: './recent-data.component.html',
  styleUrls: ['./recent-data.component.scss']
})

export class RecentDataComponent implements OnInit {
  domainColor = ['#ff6464', '#3e3939', '#00818a', '#00587a'];
  backColor = [];
  valueMap = new Map();
  chart = true;
  showReport = false;
  labels: any[] = [];
  dataSet: any[] = [];
  barChart = new Chart('barChart', {
  });

  constructor(private recentDataService: RecentDataService,
    private _formBuilder: FormBuilder,
    private messageService: MessagesService,
    public router: Router,
    public appService: AppService) { }

  ngOnInit(): void {
    this.appService.loading = true;
    this.getReports();
  }

  getReports(): void {

    this.recentDataService.getrecentdata()
      .pipe(first())
      .subscribe(
        data => {

          if (data === undefined) {
            this.messageService.showMessage(data);
            this.barChart.destroy();
            this.showReport = false;
          } else {
            this.chart = true;
            this.showReport = true;

            let dataList = <any>[];
            let k = 0;
            data.forEach(element => {
              this.labels.push(element.name);
              dataList.push(element.value);
              this.backColor.push(this.domainColor[k]);
              if (k == 3) {
                k = 0;
              } else {
                k++;
              }
            });

            let chartData = {
              labels: this.labels,
              datasets: [
                {
                  label: "Reading Data",
                  backgroundColor: this.backColor,
                  borderColor: "rgba(255,99,132,1)",
                  borderWidth: 2,
                  hoverBackgroundColor: "rgba(255,99,132,0.4)",
                  hoverBorderColor: "rgba(255,99,132,1)",
                  data: dataList,
                }
              ]
            };

            let chartOptions = {
              responsive: true,
              legend: {
                display: true,
                position: 'top',
                labels: {
                  boxWidth: 40
                }
              },
              scales: {
                xAxes: [{
                  barPercentage: 0.7,
                  gridLines: {
                    display: false
                  }
                }],
                yAxes: [{
                  scaleLabel: {
                    display: true,
                    labelString: 'Kw',
                    fontSize: 15,
                    fontColor: '#666'
                  }
                }]
              }
            };

            this.barChart.destroy();
            this.barChart = new Chart('barChart', {
              type: 'bar',
              data: chartData,
              options: chartOptions
            });
          }
          this.appService.loading = false;
        },
        error => {
          this.appService.loading = false;
          console.error('Something went wrong, Please try again.');
          if (error.error.error === 'You must log in!') {
            this.router.navigate(['./login']);
          }
        });
  }

}
