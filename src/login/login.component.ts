import { Component, OnInit,Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers } from '@angular/http';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA, MatNativeDateModule, MatDatepickerModule, } from '@angular/material'
import { map } from 'rxjs/internal/operators/map';
import { Login } from './loginschema';
import { HttpRequestService } from '../../src/services/http-request.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private http: HttpClient, private httpreq: HttpRequestService, private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }
    hide = true;
    Login1: boolean = true;
    Forgetpass: boolean = false;
    Signup: boolean = false;


    Forgetpasswordfun() {
        this.Login1 = false;
        this.Forgetpass = true;
    }

    CreateAcc() {
        this.Login1 = false;
        this.Forgetpass = false;
        this.Signup = false;
    }

    Loginsignup: FormGroup = new FormGroup({
        username: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required),
        apiKey: new FormControl('', Validators.required),
    });

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

    login() {
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
            
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.width = '275px';
            dialogConfig.height = '210px';
            dialogConfig.disableClose = true;
            dialogConfig.data = { 'errorheader': 'Error', 'errormessage': "To date can't before or equal to From date" }
            const dialogRef = this.dialog.open(DisplayLoginErrorDialog, dialogConfig);
            dialogRef.afterClosed().subscribe(
                val => console.log("Dialog output:", val)
            );
        });
    }
    
}

@Component({
    templateUrl: './loginerror.html',
})
export class DisplayLoginErrorDialog {

    constructor(
        public dialogRef: MatDialogRef<DisplayLoginErrorDialog>)
    {

       
    }

    closeModal(): void {
        this.dialogRef.close();
    }
}
