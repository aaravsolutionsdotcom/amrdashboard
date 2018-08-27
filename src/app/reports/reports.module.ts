import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MonthlyreportsComponent } from "../monthlyreports/monthlyreports.component"
import { YeralyreportsComponent } from "../yeralyreports/yeralyreports.component"


export const ReportLayoutRoutes: Routes = [
    { path: 'monthlyreport', component: MonthlyreportsComponent },
    { path: 'yeralyreport', component: YeralyreportsComponent }
];

@NgModule({
  imports: [
     RouterModule.forChild(ReportLayoutRoutes), 
  ],
    declarations: [
        MonthlyreportsComponent,
        YeralyreportsComponent,
    ]
})
export class ReportsModule { }
