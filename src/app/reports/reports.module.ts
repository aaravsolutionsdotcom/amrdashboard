import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MonthlyreportsComponent } from "../monthlyreports/monthlyreports.component"
import { YearlyreportsComponent } from "../yearlyreports/yearlyreports.component"


export const ReportLayoutRoutes: Routes = [
    { path: 'monthlyreport', component: MonthlyreportsComponent },
    { path: 'yearlyreport', component: YearlyreportsComponent }
];

@NgModule({
  imports: [
     RouterModule.forChild(ReportLayoutRoutes), 
  ],
    declarations: [
        MonthlyreportsComponent,
        YearlyreportsComponent,
    ]
})
export class ReportsModule { }
