import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { LoginComponent } from '../../../login/login.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'devices',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'recentdata',     component: TableListComponent },
    { path: 'settings',          component: IconsComponent },
];
