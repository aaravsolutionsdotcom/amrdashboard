import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Devices',  icon: 'design_app', class: '' },
    { path: '/icons', title: 'Settings', icon: 'loader_gear', class: '' },
    { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
    { path: '/maps', title: 'Maps',  icon:'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications',  icon:'ui-1_bell-53', class: '' },
    { path: '/table-list', title: 'Table List',  icon:'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography',  icon:'text_caps-small', class: '' }
];



@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
    animations: [
        // Each unique animation requires its own trigger. The first argument of the trigger function is the name
        trigger('rotatedState', [
            state('default', style({ transform: 'rotate(0)' })),
            state('rotated', style({ transform: 'rotate(-360deg)' })),
            transition('rotated => default', animate('500ms ease-out')),
            transition('default => rotated', animate('400ms ease-in'))
        ])
    ]
})

export class SidebarComponent implements OnInit {
 
  menuItems: any[];
    state: string = 'default';
    rotateflag: boolean = true;
    rotatecount = 0;
    intervel;
    interval;
    constructor(private rotateimg: ElementRef,) {
    }
    ngOnInit() {
        this.interval = setInterval(() => {
            this.rotate()
        }, 1000);
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
  isMobileMenu() {
      if ( window.innerWidth > 991) {
          return false;
      }
      return true;
    };

    rotate() {
            this.state = (this.state === 'default' ? 'rotated' : 'default');
            this.rotatecount++;
        if (this.rotatecount === 2) {
            clearInterval(this.interval);
        }
    }
}
