import { NgModule } from '@angular/core';
import { RouterModule, Route, Routes } from '@angular/router';
import { FuseSharedModule } from '@fuse/shared.module';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule, MatCheckboxModule, MatButtonModule, MatFormFieldModule, MatDatepickerModule, MatTabsModule, MatTableModule, MatIconModule, MatPaginatorModule, MatTooltipModule } from '@angular/material';
import { DeviceComponent, DownloadCSVDialogComponent } from './device.component';

const routes: Routes = [
    {
        path: 'devices',
        component: DeviceComponent,
        runGuardsAndResolvers: 'always'
    }
];

@NgModule({
    declarations: [
        DeviceComponent,
        DownloadCSVDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FuseSharedModule,
        MatTreeModule,
        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatTabsModule,
        MatTableModule,
        MatPaginatorModule,
        MatIconModule,
        MatTooltipModule
    ],
    exports: [
        DeviceComponent,
        DownloadCSVDialogComponent
    ],
    entryComponents: [DownloadCSVDialogComponent]
})

export class DeviceModule {
}
