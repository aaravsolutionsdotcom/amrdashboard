import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { LoginComponent } from '../../../login/login.component';
import { ReportsComponent } from '../../reports/reports.component';
import { MonthlyreportsComponent } from "../../monthlyreports/monthlyreports.component"
import { YearlyreportsComponent } from "../../yearlyreports/yearlyreports.component"
import { DailyreportsComponent } from "../../dailyreports/dailyreports.component"
export const AdminLayoutRoutes: Routes = [
    { path: 'devices',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'recentdata',     component: TableListComponent },
    { path: 'settings', component: IconsComponent },
    {
        path: 'reports',
        component: ReportsComponent,
        children: [
            { path: '', redirectTo: 'monthlyreport', component: MonthlyreportsComponent },
            { path: 'dailyreport', component: DailyreportsComponent },
            { path: 'monthlyreport', component: MonthlyreportsComponent },
            { path: 'yearlyreport', component: YearlyreportsComponent }
        ]
    },
];
