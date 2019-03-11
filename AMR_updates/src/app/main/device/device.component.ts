import { Component, OnInit, Pipe, PipeTransform, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatTableDataSource, MatPaginator, MatDialogRef } from "@angular/material";
import { Angular5Csv } from '../../../../node_modules/angular5-csv/dist/Angular5-csv';
import { Subscription } from 'rxjs';
import { DeviceService } from './device.service';
import { AppService } from 'app/app.service';
import { Chart } from 'chart.js';
import { MessagesService } from 'app/messages.service';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
declare var $: any;

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
    selector: 'devices',
    templateUrl: './device.component.html',
    styleUrls: ['./device.component.css']
})

export class DeviceComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    backColor = [];
    domainColor = ['#ff6464', '#3e3939', '#00818a', '#00587a'];
    labels = [];
    displayedColumns: string[] = ['id', 'serialNo', 'status'];
    barChart = new Chart('barChart', {
    });

    selectedRowIndex = -1;
    searchText = '';
    showinfocard: boolean = false;
    deviceinfographdata = [];
    deviceinfoid: string = '';
    deviceinfosn: string = '';
    deviceinfolastread;
    deviceinforeadt;
    deviceinfostatus: any;
    someExpression = null;
    showStyle = false;
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
    devices: any;
    uniqueArray: any;
    display = false;

    constructor(private http: HttpClient, private deviceService: DeviceService,
        private dialog: MatDialog,
        private router: Router,
        public appService: AppService,
        public messageService: MessagesService,
        public _formBuilder: FormBuilder) {
    }
    /*Component Execution will Start from ngOninit*/
    public title = 'Hello NGX-RESPONSIVE';
    private _subscriptions: Subscription[] = [];
    ngOnInit() {
        this.display = true;
        /*do the get request to get the devices array from server*/
        this.deviceService.getdevices().subscribe(devicesre => {
            this.selectedRowIndex = undefined;
            this.devices = devicesre;
            this.deviceService.devicesRef = devicesre;
            this.uniqueArray = this.appService.removeduplicates(this.devices);
            this.uniqueArray = new MatTableDataSource(this.uniqueArray);
            this.uniqueArray.paginator = this.paginator;
            this.display = false;
        },
            err => {
                this.display = false;
                this.router.navigateByUrl('');
            });
    }

    p: number = 1;

    getcurentunitsdate = function (devicename) {
        var newArr = [],
            origLen = this.devices.length,
            found, x;

        for (x = 0; x < origLen; x++) {
            if (this.devices[x].deviceInfo.deviceName === devicename) {
                newArr.push({
                    "name": this.devices[x].utilityData.lastUpdate,
                    "value": Number(this.devices[x].utilityData.lastunits),
                    "date": new Date(this.devices[x].utilityData.lastUpdate).getTime(),
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
        this.selectedRowIndex = device.deviceInfo.deviceName;
        this.showinfocard = false;
        this.appService.loading = true;
        this.showStyle = true
        console.log(device);
        var devicename: string = device.deviceInfo.deviceName;
        this.deviceinfographdata = this.getcurentunitsdate(devicename)
        this.deviceinfographdata.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.deviceinfographdata = this.deviceinfographdata.slice(0, 10);
        this.deviceinfographdata = this.deviceinfographdata.reverse();
        console.log(this.deviceinfographdata)
        this.generateChart();
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

        this.appService.loading = false;
    }

    generateChart(): void {

        this.labels = [];
        let dataList = <any>[];
        let k = 0;
        this.deviceinfographdata.forEach(element => {
            let labelDate = element.name.split("T")[0];
            this.labels.push(labelDate);
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
            scales: {
                xAxes: [{
                    barPercentage: 0.8,
                    gridLines: {
                        display: false
                    }
                }],
                yAxes: [{
                    gridLines: {
                        display: false
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

        this.appService.loading = false;

    }

    downloadCSVDialog(device) {
        this.deviceService.deviceId = device;
        this.deviceService.download_form = this._formBuilder.group({
            fromDate: new FormControl(new Date(), Validators.compose([
                Validators.required
            ])),
            maxDate: new FormControl(new Date(), Validators.compose([
                Validators.required
            ]))
        })

        const dialogRef = this.dialog.open(DownloadCSVDialogComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

    applyFilter(filterValue: string) {
        this.uniqueArray.filter = filterValue.trim().toLowerCase();
      
        if (this.uniqueArray.paginator) {
          this.uniqueArray.paginator.firstPage();
        }
      }
}

@Component({
    selector: 'download-csv',
    templateUrl: './downloadcsv/downloadcsv.component.html',
    styleUrls: ['./device.component.css']
})
export class DownloadCSVDialogComponent implements OnInit {

    validationMessages: any;
    deviceid: string;
    downloadcsv: FormGroup;
    error: any = { isError: false, errorMessage: '' };
    fromdate = new FormControl(new Date());
    serializedDate = new FormControl(new Date());
    maxDate = new Date();

    constructor(
        private dialogRef: MatDialogRef<DownloadCSVDialogComponent>,
        public appService: AppService,
        public _formBuilder: FormBuilder,
        public messageService: MessagesService,
        public dialog: MatDialog,
        public router: Router,
        public deviceService: DeviceService) {
    }

    ngOnInit(): void {
    }

    download() {
        if (new Date(this.deviceService.download_form.get('maxDate').value) <= new Date(this.deviceService.download_form.get('fromDate').value)) {
            console.log('inside date mismatch')
            this.messageService.showErrorMessage("To date should be greater than From date");
        }
        else {
            this.deviceid = this.deviceService.deviceId;
            var newArr = [{
                'Devicename': 'Devicename',
                'SerialNumber': 'SerialNumber',
                'Devicemake': 'Devicemake',
                'lastunits': 'Lastunits',
                'currentUnits': 'Currentunits',
                'lastUpdate': 'Lastupdate',
                'status': 'Status'
            }],

                origLen = this.deviceService.devicesRef.length,
                found, x;
            for (x = 0; x < origLen; x++) {

                if (this.deviceid == this.deviceService.devicesRef[x].deviceInfo.deviceName) {

                    if ((new Date(this.deviceService.download_form.get('fromDate').value) < new Date(this.deviceService.devicesRef[x].utilityData.lastUpdate))
                        &&
                        (new Date(this.deviceService.devicesRef[x].utilityData.lastUpdate) < new Date(this.deviceService.download_form.get('maxDate').value))) {

                        newArr.push({
                            'Devicename': this.deviceService.devicesRef[x].deviceInfo.deviceName,
                            'SerialNumber': this.deviceService.devicesRef[x].deviceInfo.serialNum,
                            'Devicemake': this.deviceService.devicesRef[x].deviceInfo.deviceMake,
                            'lastunits': this.deviceService.devicesRef[x].utilityData.lastunits,
                            'currentUnits': this.deviceService.devicesRef[x].utilityData.currentUnits,
                            'lastUpdate': this.deviceService.devicesRef[x].utilityData.lastUpdate,
                            'status': this.deviceService.devicesRef[x].deviceInfo.status
                        })
                    }
                }
            }
            if (newArr.length > 1) {
                newArr.sort((a, b) => new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime())
                new Angular5Csv(newArr, 'DeviceInfo');
            }
            else {
                this.messageService.showErrorMessage("No Records Found!");
            }
        }

    }

    CloseDownloadDialog(): void {
        this.dialogRef.close();
        this.appService.loading = false;
    }

    validateAllFormFields(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    checkFormValidity(): void {
        if (this.deviceService.download_form.valid) {
            this.appService.loading = true;
            this.download();

        } else {
            this.validateAllFormFields(this.deviceService.download_form);
            this.messageService.showErrorMessage(this.messageService.validationFailMessage());
        }
    }

    // reset form
    reset(): void {
        this.deviceService.download_form.reset();
    }
}

