import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from '../app/layouts/header/header.component';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpRequestService} from '../../src/services/http-request.service'
const routes: Routes = [ 
  {
        path: '',
        component: LoginComponent
  },
  {
      path: 'recentdata',
    redirectTo: 'login',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [
        {
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
  }]},
  {
    path: '**',
      redirectTo: 'recentdata'
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
      RouterModule.forRoot(routes),
      MatFormFieldModule,
      MatToolbarModule,
      MatButtonModule,
      MatCardModule,
      MatTooltipModule,
      MatIconModule,
      MatInputModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      HttpModule,
      HttpClientModule,
    ],
    providers: [
        HttpRequestService
    ],
    declarations: [
        LoginComponent,
        HeaderComponent
    ],
  exports: [
  ],
})
export class AppRoutingModule { }
