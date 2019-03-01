import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import {MatTreeModule} from '@angular/material/tree';
import { MapsComponent } from './maps.component';

const routes: Routes = [
  
];

@NgModule({
    declarations: [
        MapsComponent
    ],
    imports     : [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatTreeModule
    ],
    exports     : [
        MapsComponent
    ]
})

export class MapsModule
{
}
