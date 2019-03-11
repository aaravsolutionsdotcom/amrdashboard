import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
    {
        path     : 'dashboard',
        component: DashboardComponent,
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    declarations: [
        DashboardComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        FuseSharedModule
    ],
    exports     : [
        DashboardComponent
    ]
})

export class DashboardModule
{
}
