import { Component, OnInit, Inject, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatNativeDateModule, MatDatepickerModule, } from '@angular/material'
import { map } from 'rxjs/internal/operators/map';
import { Login } from './loginschema';
import { HttpRequestService } from '../../src/services/http-request.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

export interface DialogData {
    deviceid: string;
    deviceref;
    errormessage: string;
    errormessage1: string;
    apiKey: string;
    errorheader: string;
   
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit  {

    constructor(private http: HttpClient, private httpreq: HttpRequestService, private router: Router,
        private dialog: MatDialog,
        private spinner: NgxSpinnerService,
        public snackBar: MatSnackBar) { }

  ngOnInit() {
  }
    hide = true;
    Login: boolean = true;
    Forgetpass: boolean = false;
    Signup: boolean = false;

    loading= false;
    color = 'primary';
    mode = 'determinate';
    value = 50;
    bufferValue = 75;

    ngAfterViewInit() {
        this.router.events
            .subscribe((event) => {
                if (event instanceof NavigationStart) {
                }
                else if (
                    event instanceof NavigationEnd ||
                    event instanceof NavigationCancel
                ) {
                    this.spinner.hide();
                }
            });
    }

    
    Loginsignup: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        apiKey: new FormControl('', Validators.required),
        companyName: new FormControl(' ', Validators.required),
    });

    Forgetpasswordfun() {
        this.Login = false;
        this.Signup = false;
        this.Forgetpass = true;
        this.Loginsignup.get('password').setValue('x');
        this.Loginsignup.get('apiKey').setValue('');
        this.Loginsignup.get('companyName').setValue(' ');
    }

    CreateAcc() {
        this.Login = false;
        this.Forgetpass = false;
        this.Signup = true;
        this.Loginsignup.get('apiKey').setValue(' ');
        this.Loginsignup.get('companyName').setValue('');
    }

    getbacktologin() {
        this.Login = true;
        this.Forgetpass = false;
        this.Signup = false;
        this.Loginsignup.get('password').setValue('');
        this.Loginsignup.get('apiKey').setValue('');
        this.Loginsignup.get('companyName').setValue(' ');
    }

    get usernameget() {
        return this.Loginsignup.get('username')
    }

    getusernameErrorMessage() {

        return this.Loginsignup.get('username').hasError('required') ? 'You must enter a value' :
            this.Loginsignup.get('username').hasError('email') ? 'Not a valid email' :
                '';
    }

    get passwordget() {
        return this.Loginsignup.get('password')
    }

    getpasswordErrorMessage() {

        return this.Loginsignup.get('password').hasError('required') ? 'You must enter a value' :
            '';
    }
    get apiKeyget() {
        return this.Loginsignup.get('apiKey')
    }

    getapiKeygetdErrorMessage() {

        return this.Loginsignup.get('apiKey').hasError('required') ? 'You must enter a value' :
            '';
    }

    get companyNameget() {
        return this.Loginsignup.get('companyName')
    }

    getcompanyNamegetdErrorMessage() {

        return this.Loginsignup.get('companyName').hasError('required') ? 'You must enter a value' :
            '';
    }

    login() {
        this.loading = true;
        this.spinner.show();
        console.log(JSON.stringify(this.Loginsignup.value))
        const login = this.Loginsignup.value;
        let body = JSON.stringify(login);
        this.httpreq.checksignin(body).subscribe((res: HttpResponse<Login>) => {
            console.log('resultis',res)
            //res.body.message
            if (res.body.message && res.body.message === 'SignIn success') {
                
                console.log('Valid login')
                this.router.navigateByUrl('/recentdata');
            }
        },
        (err: HttpResponse<Login>) => {
            this.spinner.hide();
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.width = '275px';
            dialogConfig.height = '210px';
            dialogConfig.disableClose = true;
            dialogConfig.data = { 'errorheader': 'Error', 'errormessage': "Please enter a valid Email,Password,ApiKey" }
            const dialogRef = this.dialog.open(DisplayLoginErrorDialog, dialogConfig);
            dialogRef.afterClosed().subscribe(
                val => { console.log("Dialog output:", val); } 
            )
        }
        );
    }
    
    signup() {
        this.loading = true;
        this.spinner.show();
        console.log(JSON.stringify(this.Loginsignup.value))
        const signup = {
                "username":this.Loginsignup.get('username').value,
                "password":this.Loginsignup.get('password').value,
                "entityName":this.Loginsignup.get('companyName').value,
        }
        let body = JSON.stringify(signup);
        this.httpreq.createProfile(body).subscribe((res: HttpResponse<Login>) => {
            console.log('resultis',res)
            //res.body.message
            if (res.body.message && res.body.message === 'SignUp success') {

                /*let emaildata = JSON.stringify({
                    'apiKey': res.body.apiKey,
                    'toaddress': this.Loginsignup.get('username').value
                })

                this.httpreq.sendemail(emaildata).subscribe((mailres: HttpResponse<Login>) => {
                    console.log('email response', mailres);
                    if (mailres.body.success === true) {
                        console.log('User created')
                        this.spinner.hide();
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.autoFocus = true;
                        dialogConfig.width = '400px';
                        dialogConfig.height = '300px';
                        dialogConfig.disableClose = true;
                        dialogConfig.data = { 'errorheader': 'Message', 'errormessage': 'User created successfully.', 'errormessage1': 'Please copy the below Api Key to login. ', 'apiKey': res.body.apiKey }
                        const dialogRef = this.dialog.open(DisplayLoginErrorDialog, dialogConfig);
                        dialogRef.afterClosed().subscribe(
                            val => {
                                console.log("Signup dialog output:", val);
                                if (val.errorheader === "Message") {
                                    this.getbacktologin();
                                    this.Loginsignup.get('apiKey').setValue(res.body.apiKey);
                                    this.openSnackBar('Welcome To AMR', 'API Key is mailed to Registered Email')
                                }
                            })
                    }
                    else {
                        this.spinner.hide();
                        const dialogConfig = new MatDialogConfig();
                        dialogConfig.autoFocus = true;
                        dialogConfig.width = '275px';
                        dialogConfig.height = '220px';
                        dialogConfig.disableClose = true;
                        dialogConfig.data = { 'errorheader': 'Error', 'errormessage': "Seems like Not a Valid Email Address" }
                        const dialogRef = this.dialog.open(DisplayLoginErrorDialog, dialogConfig);
                        dialogRef.afterClosed().subscribe(
                            val => { console.log("Dialog output:", val); })
                    }
                });*/

                console.log('User created')
                this.spinner.hide();
                const dialogConfig = new MatDialogConfig();
                dialogConfig.autoFocus = true;
                dialogConfig.width = '400px';
                dialogConfig.height = '300px';
                dialogConfig.disableClose = true;
                dialogConfig.data = { 'errorheader': 'Message', 'errormessage': 'User created successfully.', 'errormessage1': 'Please copy the below Api Key to login. ', 'apiKey': res.body.apiKey }
                const dialogRef = this.dialog.open(DisplayLoginErrorDialog, dialogConfig);
                dialogRef.afterClosed().subscribe(
                    val => {
                        console.log("Signup dialog output:", val);
                        if (val.errorheader === "Message") {
                            this.getbacktologin();
                            this.Loginsignup.get('apiKey').setValue(res.body.apiKey);
                            this.openSnackBar('Welcome To', 'AMR')
                        }
                    })
                
            }
        },
        (err: HttpResponse<Login>) => {
            this.spinner.hide();
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.width = '275px';
            dialogConfig.height = '220px';
            dialogConfig.disableClose = true;
            dialogConfig.data = { 'errorheader': 'Error', 'errormessage': "Either Username or Company name is/are taken" }
            const dialogRef = this.dialog.open(DisplayLoginErrorDialog, dialogConfig);
            dialogRef.afterClosed().subscribe(
                val => { console.log("Dialog output:", val); })
        });
    }

    openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 10000,
        });
    }
    
}

@Component({
    templateUrl: './loginerror.html',
})

export class DisplayLoginErrorDialog implements OnInit {
    errormessage: any;
    errormessage1: any;
    header: any;
    apiKey: string;
    signupDailog: FormGroup;
    text1: string;

    constructor(
        public dialogRef: MatDialogRef<DisplayLoginErrorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog: MatDialog,
    ) {
        this.errormessage = data.errormessage;
        if(data.errormessage1) {
            this.errormessage1 = data.errormessage1;
        }
        this.header = data.errorheader;
        if(data.apiKey) {
            this.apiKey=data.apiKey;
        }
        console.log(this.errormessage);
    }
    ngOnInit() {
        this.signupDailog = new FormGroup({
            apiKey: new FormControl(''),
        });
        this.signupDailog.get('apiKey').setValue(this.data.apiKey);
    }

    copyMessage() {
        
    }
    closeModal(): void {

        this.dialogRef.close(this.data);
    }
}
