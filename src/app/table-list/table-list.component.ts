import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { HttpRequestService } from '../../../src/services/http-request.service';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import {
    IeInfoRx, ResponsiveSizeInfoRx, OrientationInfoRx, DeviceStandardInfoRx, DeviceInfoRx,
    UserAgentInfoRx, BrowserInfoRx
} from 'ngx-responsive';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs';

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
    barviewxs: any[] = [250, 400];
    barviewsm: any[] = [400, 400];
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
   
    constructor(private httpreq: HttpRequestService,
        private router: Router,
        public ieInfoRx: IeInfoRx,
        public browserInfoRx: BrowserInfoRx,
        public devicesInfoRx: DeviceInfoRx,
        public devicesStandardInfoRx: DeviceStandardInfoRx,
        public orientationInfoRx: OrientationInfoRx,
        public responsiveSizeInfoRx: ResponsiveSizeInfoRx,
        public userAgentInfoRx: UserAgentInfoRx) {
       
    }
    public title = 'Hello NGX-RESPONSIVE';
    private _subscriptions: Subscription[] = [];
    ngOnInit() {
        this.display = true;
        this._subscribe();
        this.ieInfoRx.connect();
        this.browserInfoRx.connect();
        this.devicesInfoRx.connect();
        this.devicesStandardInfoRx.connect();
        this.orientationInfoRx.connect();
        this.responsiveSizeInfoRx.connect();
        this.userAgentInfoRx.connect();
        this.httpreq.getdevices().subscribe(devicesre => {

            console.log('device recent data', devicesre)
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
                        "name": this.devices[i].deviceInfo.deviceName,
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
    public thisUserAgent(userAgent) {
        console.log('userAgent ==========>', userAgent);
    }
    private _subscribe(): void {
        this._subscriptions.push(
            this.ieInfoRx.getIE.subscribe((data) => {
                console.log('this.ieInfoRx.getIE ===>', data);
            }, (err) => {
                console.log('Error', err);
            })
        );
        this._subscriptions.push(
            this.browserInfoRx.getBrowser.subscribe((data) => {
                console.log('this.browserInfoRx.getBrowser ===>', data);
            }, (err) => {
                console.log('Error', err);
            })
        );
        this._subscriptions.push(
            this.devicesInfoRx.getDevice.subscribe((data) => {
                console.log('this.devicesInfoRx.getDevice ===>', data);
            }, (err) => {
                console.log('Error', err);
            })
        );
        this._subscriptions.push(
            this.devicesStandardInfoRx.getStandardDevice.subscribe((data) => {
                console.log('this.devicesStandardInfoRx.subject$ ===>', data);
            }, (err) => {
                console.log('Error', err);
            })
        );
        this._subscriptions.push(
            this.orientationInfoRx.getOrientation.subscribe((data) => {
                console.log('this.orientationInfoRx.getOrientation ===>', data);
            }, (err) => {
                console.log('Error', err);
            })
        );
        this._subscriptions.push(
            this.responsiveSizeInfoRx.getResponsiveSize.subscribe((data) => {
                console.log('this.responsiveSizeInfoRx.getResponsiveSize ===>', data);
            }, (err) => {
                console.log('Error', err);
            })
        );
        this._subscriptions.push(
            this.userAgentInfoRx.getUserAgent.subscribe((data) => {
                console.log('this.userAgentInfoRx.getUserAgent ===>', data);
            }, (err) => {
                console.log('Error', err);
            })
        );
    }
    private _unsubscribe(): void {
        this._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    }
}
