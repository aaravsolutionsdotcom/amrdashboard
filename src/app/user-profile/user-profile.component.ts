import { Component, OnInit,Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { HttpRequestService } from '../../../src/services/http-request.service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from '@angular/common/http';

export interface DialogData {
    deviceid: string;
    deviceref;
    errormessage: string;
    errorheader: string
}

export interface Userprofile {
    username: string;
    entityName: string;
    apiKey: string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


    updateprofile: FormGroup;
    useinfo
    dummyvalue = {
        "_id": "5ab1eb9628533f7891c27847",
        "username": "iot123@gmail.com",
        "entityName": "iot123",
        "apiKey": "798b8dd982b035952b5c3178c9256a2aa3c2ea32",
        "dbName": "e37f81fb397e595c4aeb5645b8cbbbd1_db"
    }

    constructor(private dialog: MatDialog, private httpreq: HttpRequestService, private router: Router) { }


    ngOnInit() {
        this.updateprofile = new FormGroup({
            username: new FormControl(''),
            entityname: new FormControl(''),
            apikey: new FormControl(''),
            password: new FormControl(''),
        });

        this.httpreq.getuserinfo().subscribe(info => {
            this.useinfo = info;
            console.log(this.useinfo)
            this.updateprofile.get('username').setValue(this.useinfo.username);
            this.updateprofile.get('entityname').setValue(this.useinfo.entityName);
            this.updateprofile.get('apikey').setValue(this.useinfo.apiKey);
            },
            err => {
                this.router.navigateByUrl('');
            });
    }

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = '400px';
        dialogConfig.height = '270px';
        dialogConfig.disableClose = true;
        const dialogRef = this.dialog.open(Updatepassword, dialogConfig);
        dialogRef.afterClosed().subscribe(
            val => console.log("Dialog output:", val)
        );
    }

}

@Component({
    selector: 'open-passwordupdate',
    templateUrl: './open-passwordupdate.html',
})
export class Updatepassword {
    updatepassword: FormGroup;
    constructor(
        private dialog: MatDialog,
        public dialogRef: MatDialogRef<Updatepassword>,
        private httpreq: HttpRequestService, private router: Router) {
    }

    ngOnInit() {
        this.updatepassword = new FormGroup({
            newpassword: new FormControl(''),
            confirmpassword: new FormControl(''),
        });
    }

    closeModal(): void {
        this.dialogRef.close();
    }

    onupdate() {
        
        if (this.updatepassword.get('newpassword').value == this.updatepassword.get('confirmpassword').value) {
            this.httpreq.updatepassword({ "password": this.updatepassword.get('newpassword').value }).subscribe(res => {
                this.dialogRef.close();
                console.log('resultinupdatepassword', res)
                const dialogConfig = new MatDialogConfig();
                dialogConfig.autoFocus = true;
                dialogConfig.width = '400px';
                dialogConfig.height = '270px';
                dialogConfig.disableClose = true;
                dialogConfig.data = { 'errorheader': 'Sucess', 'errormessage': "Updated Password Sucessfully" }
                const dialogRef = this.dialog.open(DisplayPasswordMessage, dialogConfig);
                dialogRef.afterOpen().subscribe(
                    val => {
                        
                    }
                );
            })

        }
        else {
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.width = '400px';
            dialogConfig.height = '270px';
            dialogConfig.disableClose = true;
            dialogConfig.data = { 'errorheader': 'Error', 'errormessage': "Passwords are not Matching" }
            const dialogRef = this.dialog.open(DisplayPasswordMessage, dialogConfig);
            dialogRef.afterClosed().subscribe(
                val => console.log("Dialog output:", val)
            );
        }
        
    }
}

@Component({
    templateUrl: './displaypasswordmessage.html',
})
export class DisplayPasswordMessage {

    errormessage: string = '';
    header: string = ''

    constructor(
        public dialogRef: MatDialogRef<DisplayPasswordMessage>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog: MatDialog,
        private router: Router) {
        this.errormessage = data.errormessage;
        this.header = data.errorheader;
    }

    closeModal(): void {
        this.dialogRef.close();
        this.router.navigateByUrl('');
    }
}