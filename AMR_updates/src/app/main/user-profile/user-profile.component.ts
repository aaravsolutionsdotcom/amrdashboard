import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidationErrors, FormBuilder } from "@angular/forms";
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Router } from '@angular/router';
import { UserProfileService } from './user-profile.service';
import { AppService } from 'app/app.service';
import { MessagesService } from 'app/messages.service';
import { first } from 'rxjs/operators';
declare var $: any;

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
    selector: 'user-profile',
    templateUrl: './user-profile.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

    useinfo
    dummyvalue = {
        "_id": "5ab1eb9628533f7891c27847",
        "username": "iot123@gmail.com",
        "entityName": "iot123",
        "apiKey": "798b8dd982b035952b5c3178c9256a2aa3c2ea32",
        "dbName": "e37f81fb397e595c4aeb5645b8cbbbd1_db"
    }

    constructor(private dialog: MatDialog, public userProfileService: UserProfileService, private router: Router, public appService: AppService, public messageService: MessagesService) { }


    ngOnInit() {
        this.appService.loading = true;
        this.userProfileService.updateprofile = new FormGroup({
            username: new FormControl('', Validators.compose([
                Validators.pattern(""),
                Validators.minLength(2),
                Validators.maxLength(20)
            ])),
            entityname: new FormControl('', Validators.compose([
                Validators.pattern(""),
                Validators.minLength(2),
                Validators.maxLength(20)
            ])),
            apikey: new FormControl('', Validators.compose([
                Validators.pattern(""),
                Validators.minLength(2),
                Validators.maxLength(50)
            ])),
            password: new FormControl('', Validators.compose([
                Validators.pattern(null),
                Validators.minLength(2),
                Validators.maxLength(20)
            ])),
        });

        this.userProfileService.getuserinfo().subscribe(info => {
            this.useinfo = info;
            console.log(this.useinfo);
            this.appService.loading = false;
            this.userProfileService.updateprofile.get('username').setValue(this.useinfo.username);
            this.userProfileService.updateprofile.get('entityname').setValue(this.useinfo.entityName);
            this.userProfileService.updateprofile.get('apikey').setValue(this.useinfo.apiKey);
        },
            err => {
                this.appService.loading = false;
                if (err.error.error === 'You must log in!') {
                    this.router.navigate(['./login']);
                }
            });
    }

    updatePasword() {
        this.messageService.globalDialogMessage = "Update Password";
        const dialogRef = this.dialog.open(UpdatePasswordDialogComponent, {
            disableClose: true
        });
        dialogRef.afterClosed().subscribe(result => {
        });
    }

}

@Component({
    selector: 'update-password-dialog',
    templateUrl: './update-password.component.html',
    styleUrls: ['./user-profile.component.css']
})
export class UpdatePasswordDialogComponent implements OnInit {

    validationMessages: any;

    constructor(
        private dialogRef: MatDialogRef<UpdatePasswordDialogComponent>,
        public appService: AppService,
        public _formBuilder: FormBuilder,
        public messageService: MessagesService,
        public dialog: MatDialog,
        public router: Router,
        public userProfileService: UserProfileService) {
    }

    ngOnInit(): void {

        this.userProfileService.update_password_form = this._formBuilder.group({
            password: new FormControl('', Validators.compose([
                Validators.required
            ])),
            confirmPassword: new FormControl('', Validators.compose([
                Validators.required
            ]))
        })

    }

    modifyPassword(): void {
        //    this.appService.loading = true;
        if (this.userProfileService.update_password_form.get('password').value === this.userProfileService.update_password_form.get('confirmPassword').value) {
            let req = {
                password : this.userProfileService.update_password_form.get('password').value
            }
            this.userProfileService.updatepassword(req)
                .pipe(first())
                .subscribe(
                    data => {
                        this.messageService.showMessage(data);
                        if (data.body.message === 'Change password success') {
                            this.appService.loading = false;
                            this.CloseUpdatePasswordDialog();
                            this.router.navigate(['./login']);

                        } else {
                            this.appService.loading = false;
                        }
                    },
                    error => {
                        this.appService.loading = false;
                        this.messageService.showMessage(error.error);
                        if (error.error.error === 'You must log in!') {
                            this.router.navigate(['./login']);
                        }
                    });
        }
       
    }

    CloseUpdatePasswordDialog(): void {
        $("#close").click();
        this.dialogRef.close();
    }

    validateAllFormFields(formGroup: FormGroup): void {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

    // this dialog for confirm save action
    confirmActionDialog(action: string): void {
        this.messageService.globalDialogMessage = action;
        const dialogRef = this.dialog.open(ConfirmUpdatepasswordAction, {
            disableClose: true,
            width: '800'
        });

        dialogRef.afterClosed().subscribe(result => {
        });
    }

    // check the form is valid and open confirmatin box
    checkFormValidity(): void {
        if (this.userProfileService.update_password_form.valid) {
            this.appService.loading = true;
            if(this.userProfileService.update_password_form.get('password').value != this.userProfileService.update_password_form.get('confirmPassword').value) {
                this.messageService.showErrorMessage('Password not match !!');
            }else{
                this.confirmActionDialog('Update Password');
            }
            

        } else {
            this.validateAllFormFields(this.userProfileService.update_password_form);
            this.messageService.showErrorMessage(this.messageService.validationFailMessage());
        }
    }

    // reset form
    reset(): void {
        this.userProfileService.update_password_form.reset();
    }
}

// This is for save update action
@Component({
    selector: 'confirm-action',
    templateUrl: '../../dialog-global-confirm.html',

})
export class ConfirmUpdatepasswordAction implements OnInit {

    updatePasswordDialogComponent: UpdatePasswordDialogComponent = new UpdatePasswordDialogComponent(this.dialogRefParent, this.appService, this.formBuilder, this.messageService, this.dialogs, this.router, this.userProfileService);

    constructor(
        private formBuilder: FormBuilder,
        private dialogRefParent: MatDialogRef<UpdatePasswordDialogComponent>,
        private dialogRef: MatDialogRef<ConfirmUpdatepasswordAction>,
        public userProfileService: UserProfileService,
        public dialogs: MatDialog,
        public router: Router,
        public appService: AppService,
        public messageService: MessagesService
    ) {
    }

    ngOnInit(): void { }

    save(): void {
        this.updatePasswordDialogComponent.modifyPassword();
        this.dialogRef.close();
    }
    close(): void {
        this.appService.loading = false;
        this.dialogRef.close();
    }
}

// update action ends here