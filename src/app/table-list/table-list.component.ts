import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { HttpRequestService } from '../../../src/services/http-request.service';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

    devices = [];
    deviceslatest = [];
    actualbardata = [];
    bardummy = [];
    bar = 0;
    display = false;
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
        domain: ['#ff6464', '#3e3939', '#00818a', '#00587a']
    };
   
    constructor(private httpreq: HttpRequestService, private router: Router) {
       
    }

    ngOnInit() {
        this.display = true;
        this.httpreq.getdevices().subscribe(devicesre => {
            
            this.devices = devicesre;
            //sorting the devices in decesnding order
            this.devices.sort((a, b) => new Date(b.utilityData.lastUpdate).getTime() - new Date(a.utilityData.lastUpdate).getTime());

            var meterid = 0;
            for (let i = 0; i < this.devices.length; i++) {
                var k = 0;
                for (let j = 0; j < this.deviceslatest.length; j++) {
                    if (this.devices[i].deviceInfo.deviceName === this.deviceslatest[j].deviceName) {
                        k++;
                    }
                }
                if (k === 0) {
                    meterid++;
                    this.deviceslatest.push({
                        "deviceName": this.devices[i].deviceInfo.deviceName,
                    });

                    this.actualbardata.push({
                        "name": "meter" + meterid,
                        "value": Number(this.devices[i].utilityData.lastunits)
                    })
                }
            }
            this.bardummy = this.actualbardata;
            this.display = false;
        },
        err => {
                this.router.navigateByUrl('');
        });

    }
}
