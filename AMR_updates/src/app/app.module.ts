import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { ToastrModule } from 'ngx-toastr';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { LoginModule } from './main/login/login.module';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DashboardModule } from './main/dashboard/dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { ResponsiveModule } from 'ngx-responsive';
import { UserModule } from './main/user-profile/user-profile.module';
import { RecentDataModule } from './main/recent-data/recent-data.module';
import { ReportModule } from './main/report/report.module';
import { DeviceModule } from './main/device/device.module';
import { MapsModule } from './main/maps/maps.module';

const appRoutes: Routes = [
    {
        path: '**',
        redirectTo: 'login'
    },
    {
        path: '**',
        redirectTo: 'home'
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    },
    {
        path: '**',
        redirectTo: 'recentData'
    },
    {
        path: '**',
        redirectTo: 'user-profile'
    },
    {
        path: '**',
        redirectTo: 'reports'
    },
    {
        path: '**',
        redirectTo: 'devices'
    }
];
export function tokenGetter(): any {
    return localStorage.getItem('authToken');
}
export const whitelistedDomains = [new RegExp('[\s\S]*')] as RegExp[];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
        ToastrModule.forRoot(),
        ResponsiveModule,

        BrowserModule,

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        DashboardModule,
        LoginModule,
        UserModule,
        ReportModule,
        RecentDataModule,
        DeviceModule,
        MapsModule
    ],
    bootstrap: [
        AppComponent
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, DatePipe]
})
export class AppModule {
}
