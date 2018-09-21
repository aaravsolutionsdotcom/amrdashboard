import { Component, OnInit } from '@angular/core';
import { HttpRequestService } from 'services/http-request.service';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import {
    IeInfoRx, ResponsiveSizeInfoRx, OrientationInfoRx, DeviceStandardInfoRx, DeviceInfoRx,
    UserAgentInfoRx, BrowserInfoRx
} from 'ngx-responsive';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-yeralyreports',
  templateUrl: './yearlyreports.component.html',
  styleUrls: ['./yearlyreports.component.scss']
})
export class YearlyreportsComponent implements OnInit {

  baryearly = [];
  bar = 0;
  display = false;
  //Bar Chart
  barview: any[] = [450, 430];
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
          this.httpreq.getyearlydata().subscribe(yearlydatare => {
            this.baryearly = yearlydatare;
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
