import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as navigationEnglish } from 'app/navigation/i18n/en';
import { locale as navigationTurkish } from 'app/navigation/i18n/tr';
import { FuseConfigService } from '@fuse/services/config.service';
import { fuseAnimations } from '@fuse/animations';
import { UserLogin } from './userlogin.model';
import { AppService } from 'app/app.service';
import { UserLoginService } from './login.service';
import { MessagesService } from 'app/messages.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class LoginComponent implements OnInit {
    userlogin: UserLogin = new UserLogin();
    loginForm: FormGroup;
    message: string;
    fields: Array<any>;
    responseMap = new Map();
    fieldValues: Array<any>;
    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        private fuseConfigService: FuseConfigService,
        private _formBuilder: FormBuilder,
        private route: Router,
        public appService: AppService,
        public userLoginService: UserLoginService,
        public messageService: MessagesService
    ) {
        // Configure the layout
        this.fuseConfigService.config = {
            layout: {
                navbar: {
                    hidden: true
                },
                toolbar: {
                    hidden: true
                },
                footer: {
                    hidden: true
                },
                sidepanel: {
                    hidden: true
                }
            }
        };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this.appService.loading = false;
        this.loginForm = this._formBuilder.group({
            userName: ['', [Validators.required]],
            password: ['', Validators.required],
            apiKey: ['', Validators.required]
        });

    }

    userLogin(): void {
        if (this.loginForm.valid) {
            localStorage.clear();
            this.appService.loading = true;
            this.userLoginService.userLogin(this.userlogin)
                .pipe(first())
                .subscribe(
                    data => {
                        this.appService.loading = false;
                        if (data.body.message && data.body.message === 'SignIn success') {
                            console.log('Valid login')
                            this.route.navigate(['./dashboard']);
                        }
                    },
                    error => {
                        this.appService.loading = false;
                        this.messageService.showErrorMessage("Invalid Credential");
                    });
        } else {
            this.appService.loading = false;
            // this.validateAllFormFields(this.loginForm);
        }

    }
}