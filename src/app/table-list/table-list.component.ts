import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { HttpRequestService } from '../../../src/services/http-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

    public lineChartGradientsNumbersData: Array<any>;
    public lineChartGradientsNumbersLabels: Array<any>;
    public lineChartGradientsNumbersColors: Array<any>;
    public lineChartGradientsNumbersOptions: Array<any>;
    public lineChartGradientsNumbersType;
    public gradientFill;
    public canvas: any;
    public ctx;
    devices = [];
    constructor(private httpreq: HttpRequestService, private router: Router) {
        this.httpreq.getdevices().subscribe(devicesre => {
            this.devices = devicesre;
        },
        err => {
                this.router.navigateByUrl('');
        });
    }

    ngOnInit() {
        
        this.canvas = document.getElementById("barChartSimpleGradientsNumbers");
        this.ctx = this.canvas.getContext("2d");
        this.gradientFill = this.ctx.createLinearGradient(0, 200, 0, 50);
        this.gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        this.gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");

        this.lineChartGradientsNumbersType = 'bar';
      this.lineChartGradientsNumbersData = [
        {
            label: "Active Countries",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 1,
            data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
        }
    ];;

    this.lineChartGradientsNumbersLabels = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.lineChartGradientsNumbersColors = [
        {
            backgroundColor: this.gradientFill,
            borderColor: "#2CA8FF",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#2CA8FF",
        }
    ];
  }
    public chartHovered(e: any): void {
        console.log(e);
    }
    public chartClicked(e: any): void {
        console.log(e);
    }

    //Bar Chart
    barview: any[] = [550, 400];
    // options
    barshowXAxis = true;
    barshowYAxis = true;
    bargradient = false;
    barshowLegend = false;
    //barshowXAxisLabel = true;
   // barxAxisLabel = 'Country';
    barshowYAxisLabel = true;
    baryAxisLabel = 'kw';

    barcolorScheme = {
        //domain: ['rgb(0, 157, 160)', 'rgb(255, 88, 107)', 'rgb(255, 141, 96)']
        domain: ['#ff6464', '#3e3939', '#00818a','#00587a']
    };

    barsingle = [
        {
            "name": "meter1",
            "value": 200
        },
        {
            "name": "meter2",
            "value": 100
        },
        {
            "name": "meter3",
            "value": 50
        },
        {
            "name": "meter4",
            "value": 250
        },
        {
            "name": "meter5",
            "value": 150
        }
    ];

    barmulti = [
        {
            "name": "Germany",
            "series": [
                {
                    "name": "2010",
                    "value": 7300000
                },
                {
                    "name": "2011",
                    "value": 8940000
                }
            ]
        },

        {
            "name": "USA",
            "series": [
                {
                    "name": "2010",
                    "value": 7870000
                },
                {
                    "name": "2011",
                    "value": 8270000
                }
            ]
        },

        {
            "name": "France",
            "series": [
                {
                    "name": "2010",
                    "value": 5000002
                },
                {
                    "name": "2011",
                    "value": 5800000
                }
            ]
        }
    ];
}
