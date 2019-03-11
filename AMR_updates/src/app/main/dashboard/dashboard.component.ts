import { Component, OnInit } from '@angular/core';

import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';

import { locale as english } from './i18n/en';
import { locale as turkish } from './i18n/tr';
import { DashboardService } from './dashboard.service';
import { first } from 'rxjs/operators';
import { MessagesService } from 'app/messages.service';
import { Chart } from 'chart.js';
import { AppService } from 'app/app.service';
import { Router } from '@angular/router';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    /**
     * Constructor
     *
     * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
     */
    domainColor = ['#ff6464', '#3e3939', '#00818a', '#00587a'];
    domainPieColor = ['#3e3939', '#ff6464', '#00818a'];
    lastLogin: any;
    username: any;
    backColor = [];
    labelsBar: any[] = [];
    labelsPie: any[] = [];
    dataSet: any[] = [];
    devices: any;
    uniqueArray: any;
    barChart = new Chart('barChart', {
    });
    pieChart = new Chart('pieChart', {
    });
    constructor(
        private _fuseTranslationLoaderService: FuseTranslationLoaderService,
        public dashboardService: DashboardService,
        public messageService: MessagesService,
        public appService: AppService,
        public router: Router
    ) {
        this._fuseTranslationLoaderService.loadTranslations(english, turkish);
    }
    ngOnInit(): void {
        this.getDeviceReports();
        this.getReports();
        this.getUserDetail();
    }

    getDeviceReports(): void {
        let totalDevices = 0;
        let activeDevices = 0;
        let inActiveDevices = 0;

        this.dashboardService.getdevices()
            .pipe(first())
            .subscribe(
                data => {

                    if (data === undefined) {
                        this.messageService.showMessage(data);
                        this.barChart.destroy();
                    } else {
                        let dataList = <any>[];
                        let k = 0;
                        this.devices = data;
                        this.uniqueArray = this.appService.removeduplicates(this.devices);
                        totalDevices = this.uniqueArray.length;
                        this.uniqueArray.forEach(element => {
                            if (element.deviceInfo.status === 'active') {
                                activeDevices++;
                            } else {
                                inActiveDevices++;
                            }
                        });
                        dataList.push(totalDevices);
                        dataList.push(activeDevices);
                        dataList.push(inActiveDevices);
                        this.labelsPie = [];
                        this.labelsPie.push('Total');
                        this.labelsPie.push('Active');
                        this.labelsPie.push('Inactive');

                        let chartData = {
                            labels: this.labelsPie,
                            datasets: [
                                {
                                    label: "Reading Data",
                                    backgroundColor: this.domainPieColor,
                                    borderColor: "rgba(255,99,132,1)",
                                    borderWidth: 2,
                                    hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                    hoverBorderColor: "rgba(255,99,132,1)",
                                    data: dataList,
                                }
                            ]
                        };

                        let chartOptions = {
                            title: {
                                display: true,
                                text: 'Devices',
                                position: 'top'
                            },
                            rotation: -0.7 * Math.PI
                        };

                        this.pieChart.destroy();
                        this.pieChart = new Chart('pieChart', {
                            type: 'doughnut',
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

    getReports(): void {

        this.dashboardService.getLastReading()
            .pipe(first())
            .subscribe(
                data => {

                    if (data === undefined) {
                        this.messageService.showMessage(data);
                        this.pieChart.destroy();
                    } else {

                        let dataList = <any>[];
                        this.labelsBar = [];
                        let k = 0;
                        data.forEach(element => {
                            this.labelsBar.push(element.devicename);
                            dataList.push(element.currentUnits);
                            this.backColor.push(this.domainColor[k]);
                            if (k == 3) {
                                k = 0;
                            } else {
                                k++;
                            }
                        });

                        let chartData = {
                            labels: this.labelsBar,
                            datasets: [
                                {
                                    label: "Latest Readings",
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

    getUserDetail() {
        this.dashboardService.getuserinfo().subscribe(info => {
            if (info != undefined) {
                let loginTime = info.lastlogin;
                loginTime = this.appService.DateUTCtoGUI(loginTime);
                console.log(loginTime);
                this.lastLogin = loginTime.toString().split("GMT")[0];
                this.username = info.username;
            }
        },
            err => {
                this.appService.loading = false;
                if (err.error.error === 'You must log in!') {
                    this.router.navigate(['./login']);
                }
            });
    }
}
