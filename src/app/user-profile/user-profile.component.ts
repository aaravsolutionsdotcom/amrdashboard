import { Component, OnInit,Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog'

export interface DialogData {
    deviceid: string;
    deviceref;
    errormessage: string;
    errorheader: string
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


    updateprofile: FormGroup;

    dummyvalue = {
        "_id": "5ab1eb9628533f7891c27847",
        "username": "iot123@gmail.com",
        "entityName": "iot123",
        "apiKey": "798b8dd982b035952b5c3178c9256a2aa3c2ea32",
        "dbName": "e37f81fb397e595c4aeb5645b8cbbbd1_db"
    }

    constructor( private dialog: MatDialog) { }


  ngOnInit() {
        this.updateprofile = new FormGroup({
            username: new FormControl(''),
            entityname: new FormControl(''),
            apikey: new FormControl(''),
            password: new FormControl(''),
        });
      this.updateprofile.get('username').setValue(this.dummyvalue.username);
      this.updateprofile.get('entityname').setValue(this.dummyvalue.entityName);
      this.updateprofile.get('apikey').setValue(this.dummyvalue.apiKey);
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

    constructor(
        public dialogRef: MatDialogRef<Updatepassword>) {
    }

    closeModal(): void {
        this.dialogRef.close();
    }
}