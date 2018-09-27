import { Component, OnInit } from '@angular/core'; 
import { Validators, FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { HttpRequestService } from '../../services/http-request.service';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import {
  IeInfoRx, ResponsiveSizeInfoRx, OrientationInfoRx, DeviceStandardInfoRx, DeviceInfoRx,
  UserAgentInfoRx, BrowserInfoRx
} from 'ngx-responsive';
import { Observable, Subscription } from 'rxjs';
import { Devices } from '../dashboard/devicesschema';

@Component({
  selector: 'app-dailyreports',
  templateUrl: './dailyreports.component.html',
  styleUrls: ['./dailyreports.component.scss']
})
export class DailyreportsComponent implements OnInit {
  bardaily = [];
  barDaily = [];
  barWhole: Devices[];
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
  firstDayofyear;

  public title = 'Hello NGX-RESPONSIVE';
  private _subscriptions: Subscription[] = [];

  ngOnInit() {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date();
    console.log('lastdate and firstday' + firstDay + lastDay)
    var date = new Date();
    this.firstDayofyear = new Date(date.getFullYear(), 1);
    this.display = true;
    this._subscribe();
    this.ieInfoRx.connect();
    this.browserInfoRx.connect();
    this.devicesInfoRx.connect();
    this.devicesStandardInfoRx.connect();
    this.orientationInfoRx.connect();
    this.responsiveSizeInfoRx.connect();
    this.userAgentInfoRx.connect();
    this.httpreq.getdevices().subscribe(dailydatare => {
      console.log('dailyDateRe', dailydatare);
      this.barWhole = dailydatare;
      this.display = false;
    },
      err => {
        this.router.navigateByUrl('');
      });
  }

  fromdate = new FormControl(new Date());
  todate = new FormControl(new Date());
  maxDate = new Date();
  minDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1);

  showDaily() {
      var barArr = new Map<string,number>();
      const fromVal: Date = new Date(this.fromdate.value)
      const toVal: Date = new Date(this.todate.value);
      var arrLen = this.barWhole.length;
      for (var i=0;i<arrLen;i++) {
        const curVal: Date = new Date(this.barWhole[i].utilityData.lastUpdate);
        if( curVal >= fromVal && curVal <= toVal ) {
              barArr.set(this.barWhole[i].utilityData.lastUpdate,
                          (barArr.get(this.barWhole[i].utilityData.lastUpdate) || 0) 
                            + Number(this.barWhole[i].utilityData.lastunits)
                        );
          }
      }
      var bararr = [];
      this.barDaily = Array.from(barArr);
      // console.log(this.barDaily);
      for(var j=0;j<this.barDaily.length;j++) {
          bararr.push({
            "name": this.barDaily[j][0],
            "value": this.barDaily[j][1]
          })
      }

      bararr.sort((a, b) => new Date(b.name).getTime() - new Date(a.name).getTime());
      //console.log('barArr', barArr);
      this.bardaily = bararr;
      // console.log('check',this.bardaily);
   }
  // ngOnInit() {
  //     var date = new Date();
  //     var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //     var lastDay = new Date();
  //     console.log('lastdate and firstday' + firstDay + lastDay)
  // }

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
