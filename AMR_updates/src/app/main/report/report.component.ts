import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { first } from 'rxjs/operators';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MessagesService } from 'app/messages.service';
import { ReportService } from './report.service';
import { Devices, MonthlyData } from './devicesschema';
import { AppService } from 'app/app.service';
import { error } from 'util';
import { Router } from '@angular/router';

@Component({
    selector: 'reports',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {

    valueMap = new Map();
    chart = true;
    showReport = false;
    display = false;
    defaultDate = new Date();
    labels: any[] = [];
    dataSet: any[] = [];
    dailyBarData: Devices[];
    monthlyBarData: MonthlyData[];
    barDaily = [];
    bardaily = [];
    domainColor = ['#ff6464', '#3e3939', '#00818a', '#00587a'];
    backColors = [];
    barChart = new Chart('barChart', {
    });
    barChartYear = new Chart('barChartYear', {
    });

    constructor(public reportService: ReportService,
        private _formBuilder: FormBuilder,
        private messageService: MessagesService,
        public appService: AppService,
        public router: Router) { }

    ngOnInit(): void {

        this.reportService.dailyReportForm = this._formBuilder.group({
            startDt: new FormControl(new Date(), Validators.compose([
                Validators.required,

            ])),
            endDt: new FormControl(new Date(), Validators.compose([
                Validators.required,

            ])),

        })

        this.reportService.monthlyReportForm = this._formBuilder.group({
            startDt: new FormControl(new Date(), Validators.compose([
                Validators.required,

            ])),
            endDt: new FormControl(new Date(), Validators.compose([
                Validators.required,

            ])),

        })

        // this.reportService.getdevices().subscribe(dailydata => {
        //     console.log('dailyDateRe', dailydata);
        //     this.dailyBarData = dailydata;
        //     this.display = false;
        // },
        // error => {
        //     if (error.error.error === 'You must log in!') {
        //         this.router.navigate(['./login']);
        //       }
        // });
    }

    getDaily() {
        if (this.reportService.dailyReportForm.invalid) {
            this.messageService.validationFailMessage();
        } else {
            let dataList = <any>[];
            let totalKw = 0;
            this.labels = [];
            let date;
            const fromVal: Date = new Date(this.reportService.dailyReportForm.get('startDt').value)
            const toVal: Date = new Date(this.reportService.dailyReportForm.get('endDt').value);
            let req = {
                "start": fromVal,
                "end": toVal
            }
            this.reportService.getDailydata(req).subscribe(dailydata => {
                console.log('dailyDateRe', dailydata);
                this.dailyBarData = dailydata.body;
                this.display = false;
                let arrLen = this.dailyBarData.length;
                this.dailyBarData.sort((a, b) => new Date(b.utilityData.lastUpdate).getTime() - new Date(a.utilityData.lastUpdate).getTime());
                let k = 0;
                for (var i = 0; i < arrLen; i++) {
                    if (i == 0) {
                        date = this.dailyBarData[i].utilityData.lastUpdate;
                        totalKw += Number(this.dailyBarData[i].utilityData.lastunits);
                    } else if (date === this.dailyBarData[i].utilityData.lastUpdate) {
                        totalKw += Number(this.dailyBarData[i].utilityData.lastunits);
                    } else {
                            let labelDate = date.split("T")[0];
                            this.labels.push(labelDate);
                            dataList.push(totalKw);
                            this.backColors.push(this.domainColor[k]);
                            if (k == 3) {
                                k = 0;
                            } else {
                                k++;
                            }
                            date = this.dailyBarData[i].utilityData.lastUpdate;
                            totalKw = Number(this.dailyBarData[i].utilityData.lastunits);
                    }

                }

                if (dataList.length > 0) {
                    let chartData = {
                        labels: this.labels,
                        datasets: [
                            {
                                label: "Reading Data",
                                backgroundColor: this.backColors,
                                borderColor: "rgba(255,99,132,1)",
                                borderWidth: 0,
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
                } else {
                    this.barChart.destroy();
                    this.messageService.showErrorMessage('Data not found, please select different dates.');
                }
            },
                error => {
                    if (error.error.error === 'You must log in!') {
                        this.router.navigate(['./login']);
                    }
                });
        }
    }

    getMonthly() {
        if (this.reportService.monthlyReportForm.invalid) {
            this.messageService.validationFailMessage();
        } else {
            let dataList = <any>[];
            let totalKw = 0;
            this.labels = [];
            let date;
            const fromVal: Date = new Date(this.reportService.monthlyReportForm.get('startDt').value)
            const toVal: Date = new Date(this.reportService.monthlyReportForm.get('endDt').value);
            let req = {
                "start": fromVal,
                "end": toVal
            }

            this.reportService.getmonthlydata(req).subscribe(monthlydata => {
                console.log('monthlyDateRe', monthlydata);
                this.monthlyBarData = monthlydata.body;
                this.display = false;
                let arrLen = this.monthlyBarData.length;
                this.monthlyBarData.sort((a, b) => new Date(b.name).getTime() - new Date(a.name).getTime());
                let k = 0;
                for (var i = 0; i < arrLen; i++) {
                    if (i == 0) {
                        date = this.monthlyBarData[i].name;
                        totalKw += Number(this.monthlyBarData[i].value);
                    } else if (date === this.monthlyBarData[i].name) {
                        totalKw += Number(this.monthlyBarData[i].value);
                    } else {
                            let labelDate = date.split("T")[0];
                            this.labels.push(labelDate);
                            dataList.push(totalKw);
                            this.backColors.push(this.domainColor[k]);
                            if (k == 3) {
                                k = 0;
                            } else {
                                k++;
                            }
                            date = this.monthlyBarData[i].name;
                            totalKw = Number(this.monthlyBarData[i].value);  
                    }

                }
                if (dataList.length > 0) {
                    let chartData = {
                        labels: this.labels,
                        datasets: [
                            {
                                label: "Reading Data",
                                backgroundColor: this.backColors,
                                borderColor: "rgba(255,99,132,1)",
                                borderWidth: 0,
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
                                barPercentage: 0.5,
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
                } else {
                    this.barChart.destroy();
                    this.messageService.showErrorMessage('Data not found, please select different dates.');
                }
            },
                error => {
                    this.messageService.showCommonErrorMessage();
                    if (error.error.error === 'You must log in!') {
                        this.router.navigate(['./login']);
                    }
                });
        }
    }

    getYearlyData(): void {
        this.labels = [];
        this.reportService.getyearlydata()
            .pipe(first())
            .subscribe(
                data => {
                    let dataList = <any>[];
                    if (data === undefined) {
                        this.appService.loading = false;
                        this.messageService.showMessage(data);
                        this.barChart.destroy();
                        this.showReport = false;
                    } else {
                        this.appService.loading = false;
                        this.chart = true;
                        this.showReport = true;
                        let k = 0;
                        data.forEach(element => {
                            this.labels.push(element.name);
                            dataList.push(element.value);
                            this.backColors.push(this.domainColor[k]);
                            if (k == 3) {
                                k = 0;
                            } else {
                                k++;
                            }
                        });

                        if (dataList.length > 0) {
                            let chartData = {
                                labels: this.labels,
                                datasets: [
                                    {
                                        label: "Reading Data",
                                        backgroundColor: this.backColors,
                                        borderColor: "rgba(255,99,132,1)",
                                        borderWidth: 0,
                                        hoverBackgroundColor: "rgba(255,99,132,0.4)",
                                        hoverBorderColor: "rgba(255,99,132,1)",
                                        data: dataList,
                                    }
                                ]
                            };

                            let chartOptions = {
                                responsive: true,
                                curvature: 1,
                                animationSteps: 15,
                                barRoundness: 2,
                                legend: {
                                    display: true,
                                    position: 'top',
                                    labels: {
                                        boxWidth: 20
                                    }
                                },
                                scales: {
                                    xAxes: [{
                                        barPercentage: 0.7,
                                        categorySpacing: 0,
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

                            this.barChartYear.destroy();
                            this.barChartYear = new Chart('barChartYear', {
                                type: 'bar',
                                data: chartData,
                                options: chartOptions
                            });
                        } else {
                            this.barChart.destroy();
                            this.messageService.showErrorMessage('Data not found, please select different dates.');
                        }
                    }
                },
                error => {
                    this.appService.loading = false;
                    this.messageService.showCommonErrorMessage();
                    console.error('Something went wrong, Please try again.');
                    if (error.error.error === 'You must log in!') {
                        this.router.navigate(['./login']);
                    }
                });
    }

    tabChange(event: any) {
        this.dailyBarData = [];
        this.monthlyBarData = [];
        this.labels = [];
        if (event.index == 0) {
            this.barChart.destroy();
            this.reportService.dailyReportForm.patchValue({
                'startDate': new Date(),
                'endDate': new Date()
            })
        } else if (event.index == 1) {
            this.barChart.destroy();
            this.reportService.monthlyReportForm.patchValue({
                'startDate': new Date(),
                'endDate': new Date()
            })
        } else if (event.index == 2) {
            this.appService.loading = true;
            this.barChartYear.destroy();
            this.getYearlyData();
        }
    }
}
