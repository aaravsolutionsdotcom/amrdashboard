import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule} from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PaginationService } from '../../../services/pagination.service'
import { HttpModule } from '@angular/http';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpRequestService } from '../../../../src/services/http-request.service'
import { HttpClientModule } from '@angular/common/http';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { FilterPipe } from './admin-layout.component'
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { DownloadcsvComponent } from '../../dashboard/downloadcsv/downloadcsv.component';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';   
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { DisplayErrorDialog } from '../../dashboard/downloadcsv/downloadcsv.component'
import { SearchByNamePipe } from '../../dashboard/search-by-devicename.pipe'
import { Updatepassword, DisplayPasswordMessage } from '../../user-profile/user-profile.component'
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material'
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AtomSpinnerModule, FlowerSpinnerModule, IntersectingCirclesSpinnerModule, OrbitSpinnerModule, RadarSpinnerModule } from 'angular-epic-spinners'
import { ResponsiveModule } from 'ngx-responsive'
import { ReportsComponent } from '../../reports/reports.component';
import { ReportnavbarComponent } from "../../components/reportnavbar/reportnavbar.component";
import { ComponentsModule } from '../../components/components.module';
import { MonthlyreportsComponent } from "../../monthlyreports/monthlyreports.component"
import { YeralyreportsComponent } from "../../yeralyreports/yeralyreports.component"
import { DailyreportsComponent } from "../../dailyreports/dailyreports.component"

const config = {
    breakPoints: {
        xs: { max: 600 },
        sm: { min: 601, max: 959 },
        md: { min: 960, max: 1279 },
        lg: { min: 1280, max: 1919 },
        xl: { min: 1920 }
    },
    debounceTime: 100
};

@NgModule({
    imports: [
    Ng2SearchPipeModule,
    Ng4LoadingSpinnerModule.forRoot(),
    ResponsiveModule.forRoot(config),
    NgxSpinnerModule,
    NgxPaginationModule,
    Ng2OrderModule,
    CommonModule,
    HttpClientModule,
    Ng2FilterPipeModule,
    ReactiveFormsModule,
    MatDialogModule,
    ComponentsModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpModule,
      ChartsModule,
      NgbModule,
      MatInputModule,
      ToastrModule.forRoot(),
      NgxChartsModule,
      MatAutocompleteModule,
      MatFormFieldModule,
      MatDatepickerModule, 
      CalendarModule,
      AccordionModule,
      MatNativeDateModule,
      MatProgressBarModule,
      AtomSpinnerModule,
      FlowerSpinnerModule,
      IntersectingCirclesSpinnerModule,
      OrbitSpinnerModule,
      RadarSpinnerModule 
  ],
    declarations: [
        FilterPipe,
        DashboardComponent,
        UserProfileComponent,
        TableListComponent,
        TypographyComponent,
        IconsComponent,
        MapsComponent,
        NotificationsComponent,
        DownloadcsvComponent,
        DisplayErrorDialog,
        SearchByNamePipe,
        Updatepassword,
        DisplayPasswordMessage,
        ReportsComponent,
        MonthlyreportsComponent,
        YeralyreportsComponent,
        DailyreportsComponent
    ],
  providers: [
      PaginationService,
      HttpRequestService
    ],
    entryComponents: [DownloadcsvComponent, DisplayErrorDialog, Updatepassword, DisplayPasswordMessage],
})

export class AdminLayoutModule {}
