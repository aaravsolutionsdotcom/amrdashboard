import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { DashboardComponent, HomeComponent } from './dashboard.component';

const routes: Routes = [
    {
        path     : 'dashboard',
        component: DashboardComponent,
        runGuardsAndResolvers: 'always'
    },
    {
        path     : 'home',
        component: HomeComponent,
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    declarations: [
        DashboardComponent,
        HomeComponent
    ],
    imports     : [
        RouterModule.forChild(routes),

        FuseSharedModule
    ],
    exports     : [
        DashboardComponent,
        HomeComponent
    ]
})

export class DashboardModule
{
}
