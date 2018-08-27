import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { LoginComponent } from '../login/login.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material'
import { DisplayLoginErrorDialog } from '../login/login.component'
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
    imports: [
    MatToolbarModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    NgxChartsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    ClipboardModule,
    
  ],
  declarations: [
    AppComponent,
      AdminLayoutComponent,
      DisplayLoginErrorDialog,
  ],
    providers: [],
    entryComponents: [DisplayLoginErrorDialog],
  bootstrap: [AppComponent],

})
export class AppModule { }
