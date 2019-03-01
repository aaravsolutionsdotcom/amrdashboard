import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatTreeModule} from '@angular/material/tree';
import { MatInputModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatTabsModule } from '@angular/material';
import { ReportComponent } from './report.component';

const routes: Routes = [
    {
        path     : 'reports',
        component: ReportComponent,
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    declarations: [
        ReportComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatTreeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatTabsModule
    ],
    exports     : [
        ReportComponent
    ]
})

export class ReportModule
{
}
