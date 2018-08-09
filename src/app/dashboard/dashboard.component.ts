import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import * as Chartist from 'chartist';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import * as _ from 'underscore';
import { PaginationService } from '../../services/pagination.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpRequestService } from '../../../src/services/http-request.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NgxSpinnerService } from 'ngx-spinner';
import { DownloadcsvComponent } from './downloadcsv/downloadcsv.component';
import * as shape from 'd3-shape';
import * as d3 from 'd3';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

declare const google: any;

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}

export interface Item {
    name: string;
}

@Component({
  selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    searchText = '';
    showinfocard: boolean = false;
    deviceinfographdata = [];
    deviceinfoid: string = '';
    deviceinfosn: string = '';
    deviceinfolastread;
    deviceinforeadt;
    deviceinfostatus: any;
    someExpression = null;
    showStyle= false;
    /*Bar Chart options*/
    barview: any[] = [500, 100];//this variables talks about width,height of bar graph
    barshowXAxis = false; //show X axis or not
    barshowYAxis = false; //show Y axis or not
    bargradient = false;
    barshowLegend = false;
    colorset: false
    //barshowXAxisLabel = true;
    // barxAxisLabel = 'Country';
    //barshowYAxisLabel = true;

    barcolorScheme = {
        domain: ['#ff6464', '#3e3939', '#00818a', '#00587a']
    };
    /*END*/
    /*map related variables*/
    myLatlng;
    mapOptions;
    map;
    marker;
    /*END*/
    devices = [];
    uniqueArray: any;
    

    constructor(private http: HttpClient, private httpreq: HttpRequestService,
        private spinnerService: Ng4LoadingSpinnerService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog) {
    }
    /*Component Execution will Start from ngOninit*/
    ngOnInit() {
        /*do the get request to get the devices array from server*/
        this.httpreq.getdevices().subscribe(devicesre => {
            this.devices = devicesre;
            this.uniqueArray = this.removeduplicates(this.devices);
        });
    }

   p: number = 1;

    removeduplicates = function (origArr) {
        var newArr = [],
            origLen = origArr.length,
            found, x, y;

        for (x = 0; x < origLen; x++) {
            
            found = undefined;
            for (y = 0; y < newArr.length; y++) {
                if (origArr[x].deviceInfo.deviceName === newArr[y].deviceInfo.deviceName) {
                    console.log(origArr[x])
                    found = true;
                    break;
                }
            }
            if (!found) {
                newArr.push(origArr[x]);
            }
        }
        return newArr;
    }
        
    getcurentunitsdate = function (devicename) {
        var newArr = [],
            origLen = this.devices.length,
            found,x;

        for (x = 0; x < origLen; x++) {
            if (this.devices[x].deviceInfo.deviceName === devicename) {
                newArr.push({
                    "name": this.devices[x].utilityData.lastUpdate,
                    "value": Number(this.devices[x].utilityData.lastunits),
                });
            }
        }
        return newArr;
    }

    getbackgroungStyle() {
        if (this.showStyle) {
            return "white";
        } else {
            return "rgba(255, 255, 255, .4)";
        }
    }

    showcardinfofun(device) {
        this.showinfocard = false;
        this.spinner.show();
        this.showStyle = true
        var devicename: string = device.deviceInfo.deviceName;
        this.deviceinfographdata = this.getcurentunitsdate(devicename)
        console.log(this.deviceinfographdata)
        this.deviceinfoid = device.deviceInfo.deviceName;
        this.deviceinfosn = device.deviceInfo.serialNum;
        this.deviceinfostatus = device.deviceInfo.status;
        this.deviceinfolastread = device.utilityData.lastunits;
        this.someExpression = ''
        this.deviceinforeadt = device.utilityData.lastUpdate;
        var latlog: string = device.deviceInfo.Latlang;
        if (latlog) {
            var myLatlng = new google.maps.LatLng(Number(latlog.split(",")[0]), Number(latlog.split(",")[1]));
        }
        var mapOptions = {
            zoom: 13,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{
                "featureType": "water",
                "stylers": [{
                    "saturation": 43
                }, {
                    "lightness": -11
                }, {
                    "hue": "#0088ff"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "hue": "#ff0000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 99
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#808080"
                }, {
                    "lightness": 54
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ece2d9"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ccdca1"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#767676"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b8cb93"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.medical",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }]

        };
        this.showinfocard = true;
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
        var marker = new google.maps.Marker({
            position: myLatlng,
            title: "device location"
        });
        // To add the marker to the map, call setMap();
        marker.setMap(map);
       
        this.spinner.hide();
    }

    openLoginDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '600px';
        dialogConfig.height = '450px';
        dialogConfig.disableClose = true;
        dialogConfig.data = { 'deviceid': this.deviceinfoid, 'deviceref': this.devices}
        const dialogRef = this.dialog.open(DownloadcsvComponent, dialogConfig);
        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
        );
    }
}
