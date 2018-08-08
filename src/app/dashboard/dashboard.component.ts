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
    myLatlng;
    mapOptions;
    map;
    marker;
    someExpression = null;
    showStyle= false;
    //Bar Chart
    barview: any[] = [500, 100];
    // options
    barshowXAxis = false;
    barshowYAxis = false;
    bargradient = false;
    barshowLegend = false;
    colorset:false
    //barshowXAxisLabel = true;
    // barxAxisLabel = 'Country';
    //barshowYAxisLabel = true;

    barcolorScheme = {
        //domain: ['rgb(0, 157, 160)', 'rgb(255, 88, 107)', 'rgb(255, 141, 96)']
        domain: ['#ff6464', '#3e3939', '#00818a', '#00587a']
    };

    constructor(private http: HttpClient, private httpreq: HttpRequestService,
        private spinnerService: Ng4LoadingSpinnerService,
        private spinner: NgxSpinnerService,
        private dialog: MatDialog) {
    }
    ngOnInit(){
        this.httpreq.getdevices().subscribe(devices => {
            console.log(devices)
        });
    }

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

    //new functionality
    games = [
        {
            "id": "1",
            "name": "DOTA 2",
            "genre": "Strategy"
        },
        {
            "id": "2",
            "name": "AOE 3",
            "genre": "Strategy"
        },
        {
            "id": "3",
            "name": "GTA 5",
            "genre": "RPG"
        },
        {
            "id": "4",
            "name": "Far Cry 3",
            "genre": "Action"
        },
        {
            "id": "5",
            "name": "GTA San Andreas",
            "genre": "RPG"
        },
        {
            "id": "6",
            "name": "Hitman",
            "genre": "Action"
        },
        {
            "id": "7",
            "name": "NFS MW",
            "genre": "Sport"
        }, {
            "id": "8",
            "name": "Fifa 16",
            "genre": "Sport"
        }, {
            "id": "9",
            "name": "NFS Sen 2",
            "genre": "Sport"
        }, {
            "id": "10",
            "name": "Witcher Assassins on King",
            "genre": "Adventure"
        }
    ];

    devices = [
        {   
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354354",
                "lastUpdate": "2018-01-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang":"40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545522",
                "currentUnits": "54354380",
                "lastUpdate": "2018-11-12"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545522",
                "currentUnits": "54354380",
                "lastUpdate": "2018-11-13"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545522",
                "currentUnits": "54354380",
                "lastUpdate": "2018-11-17"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545522",
                "currentUnits": "54354380",
                "lastUpdate": "2016-01-12"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354380",
                "lastUpdate": "2018-12-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",

            "utilityData": {
                "lastunits": "354540",
                "currentUnits": "54354354",
                "lastUpdate": "2019-01-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354394",
                "lastUpdate": "2018-02-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354399",
                "lastUpdate": "2018-03-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",
            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354349",
                "lastUpdate": "2018-07-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH789",
                "deviceName": "Gm2434",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "40.748817, -73.985428"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",

            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354354",
                "lastUpdate": "2018-01-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH792",
                "deviceName": "Gm2435",
                "deviceMake": "Honeywell",
                "status": 'active',
                "Latlang": "25.774252, -80.190262"
            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",

            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354354",
                "lastUpdate": "2018-01-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH798",
                "deviceName": "Gm243556",
                "deviceMake": "Honeywell",
                "status": 'inactive',
                "Latlang": "18.466465, -66.118292"

            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",

            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354354",
                "lastUpdate": "2018-01-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH898",
                "deviceName": "Gm2435596",
                "deviceMake": "Honeywell",
                "status": 'active',
                "Latlang": "32.321384, -64.757370"

            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",

            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354154",
                "lastUpdate": "2015-12-17"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGH898",
                "deviceName": "Gm2435596",
                "deviceMake": "Honeywell",
                "status": 'active',
                "Latlang": "32.321384, -64.757370"

            },
            "__v": 0
        },
        {
            "_id": "5b56fa61e875b560f3448dcd",

            "utilityData": {
                "lastunits": "3545466",
                "currentUnits": "54354354",
                "lastUpdate": "2018-01-01"
            },
            "deviceInfo": {
                "serialNum": "AVFHY5679VGKH898",
                "deviceName": "Gm24355879",
                "deviceMake": "Honeywell",
                "status": 'active',
                "Latlang": "25.774252, -80.190262"

            },
            "__v": 0
        },

    ];

    

    //sorting
    key: string = 'deviceName';
    reverse: boolean = false;
    sort(key) {
        this.key = key;
        this.reverse = !this.reverse;
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
    uniqueArray: any = this.removeduplicates(this.devices);
    
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
        var myLatlng = new google.maps.LatLng(Number(latlog.split(",")[0]), Number(latlog.split(",")[1]));
       
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
