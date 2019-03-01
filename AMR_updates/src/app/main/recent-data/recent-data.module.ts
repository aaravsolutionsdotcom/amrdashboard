import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatTreeModule} from '@angular/material/tree';
import { RecentDataComponent } from './recent-data.component';

const routes: Routes = [
    {
        path     : 'recent-data',
        component: RecentDataComponent,
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    declarations: [
        RecentDataComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatTreeModule
    ],
    exports     : [
        RecentDataComponent
    ]
})

export class RecentDataModule
{
}
