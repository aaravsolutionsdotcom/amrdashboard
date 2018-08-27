import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ReportnavbarComponent } from './reportnavbar/reportnavbar.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgbModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ReportnavbarComponent,
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    ReportnavbarComponent
  ]
})
export class ComponentsModule { }
