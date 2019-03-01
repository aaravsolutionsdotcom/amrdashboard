import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, first } from 'rxjs/operators';
import * as _ from 'lodash';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { Router } from '@angular/router';
declare var $: any;

@Component({
    selector: 'toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
    horizontalNavbar: boolean;
    rightNavbar: boolean;
    hiddenNavbar: boolean;
    languages: any;
    selectedLanguage: any;
    userStatusOptions: any[];
    loggedInUserName : string;
    loggedInAs : string;
    partnerOrCompanyName : string;
    userLogin: string;
    companyName: string;
    partnerName: string;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FuseSidebarService} _fuseSidebarService
     * @param {TranslateService} _translateService
     */
    constructor(
        private _fuseConfigService: FuseConfigService,
        private _fuseSidebarService: FuseSidebarService,
        private route: Router
    ) {
        // Set the defaults
        this.userStatusOptions = [
            {
                'title': 'Online',
                'icon': 'icon-checkbox-marked-circle',
                'color': '#4CAF50'
            },
            {
                'title': 'Away',
                'icon': 'icon-clock',
                'color': '#FFC107'
            },
            {
                'title': 'Do not Disturb',
                'icon': 'icon-minus-circle',
                'color': '#F44336'
            },
            {
                'title': 'Invisible',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#BDBDBD'
            },
            {
                'title': 'Offline',
                'icon': 'icon-checkbox-blank-circle-outline',
                'color': '#616161'
            }
        ];

        this.languages = [
            {
                id: 'en',
                title: 'English',
                flag: 'us'
            },
            {
                id: 'tr',
                title: 'Turkish',
                flag: 'tr'
            }
        ];



        // Set the private defaults
        this._unsubscribeAll = new Subject();
        if (JSON.parse(localStorage.getItem('loginResponse')) !== null && JSON.parse(localStorage.getItem('loginResponse')) !== undefined) {
            this.loggedInUserName = JSON.parse(localStorage.getItem('loginResponse')).userName;
            this.userLogin = JSON.parse(localStorage.getItem('loginResponse')).userlogin;
            this.companyName = JSON.parse(localStorage.getItem('loginResponse')).companyName;
            this.partnerName  = JSON.parse(localStorage.getItem('loginResponse')).partnerName;
            if(parseInt(JSON.parse(localStorage.getItem('loginResponse')).actType) === 502) {
                this.partnerOrCompanyName = JSON.parse(localStorage.getItem('loginResponse')).companyName;
                this.loggedInAs = 'Company';
            } else if (parseInt(JSON.parse(localStorage.getItem('loginResponse')).actType) === 501) {
                this.partnerOrCompanyName = JSON.parse(localStorage.getItem('loginResponse')).partnerName;
                this.loggedInAs = 'Partner';
                
                }
        }
        

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to the config changes
        this._fuseConfigService.config
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((settings) => {
                this.horizontalNavbar = settings.layout.navbar.position === 'top';
                this.rightNavbar = settings.layout.navbar.position === 'right';
                this.hiddenNavbar = settings.layout.navbar.hidden === true;
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle sidebar open
     *
     * @param key
     */
    toggleSidebarOpen(key): void {
        this._fuseSidebarService.getSidebar(key).toggleOpen();
    }

  

    /**
     * Search
     *
     * @param value
     */
    search(value): void {
        // Do your search here...
        console.log(value);
    }

    /**
     * Set the language
     *
     * @param lang
     */
    setLanguage(lang): void {
        // Set the selected language for the toolbar
        this.selectedLanguage = lang;

    }

    logout() {
        this.route.navigate(['/login']);
    }
    
    showProfileDetail(): void {
       $(".profileInformation").show();
    }
    hideProfileDetail(): void {
        $(".profileInformation").hide();
    }
   
}
