import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatDialogConfig,MAT_DIALOG_DATA, MatNativeDateModule, MatDatepickerModule, } from '@angular/material'
import { Validators, FormGroup, FormControl, ValidationErrors } from "@angular/forms";
import { CalendarModule } from 'primeng/calendar';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';
import { DashboardComponent } from '../dashboard.component'

export interface DialogData {
    deviceid: string;
    deviceref;
    errormessage: string;
    errorheader:string
}


@Component({
  selector: 'app-downloadcsv',
  templateUrl: './downloadcsv.component.html',
  styleUrls: ['./downloadcsv.component.scss']
})
export class DownloadcsvComponent implements OnInit {

    deviceid: string;
    downloadcsv: FormGroup;
    deviceref;
    error: any = { isError: false, errorMessage: '' };

    constructor(public dialogRef: MatDialogRef<DownloadcsvComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData, private dialog: MatDialog) {
        this.deviceid = data.deviceid;
        this.deviceref = data.deviceref;
    }

    ngOnInit() {
       this.downloadcsv = new FormGroup({
           devicename: new FormControl(''),
       });
       this.downloadcsv.get('devicename').setValue(this.deviceid);
    }
    fromdate = new FormControl(new Date());
    serializedDate = new FormControl(new Date());

    download(){
        if (new Date(this.fromdate.value) >= new Date(this.serializedDate.value)) {
            console.log('inside date mismatch')
            const dialogConfig = new MatDialogConfig();
            dialogConfig.autoFocus = true;
            dialogConfig.width = '275px';
            dialogConfig.height = '210px';
            dialogConfig.disableClose = true;
            dialogConfig.data = { 'errorheader':'Error','errormessage': "To date can't before or equal to From date" }
            const dialogRef = this.dialog.open(DisplayErrorDialog, dialogConfig);
            dialogRef.afterClosed().subscribe(
                val => console.log("Dialog output:", val)
            );
        }
        else {
            var newArr = [{
                'Devicename': 'Devicename',
                'SerialNumber': 'SerialNumber',
                'Devicemake': 'Devicemake',
                'lastunits': 'Lastunits',
                'currentUnits': 'Currentunits',
                'lastUpdate': 'Lastupdate',
                'status': 'Status'
            }],

            origLen = this.deviceref.length,
                found, x;
            for (x = 0; x < origLen; x++) {
                
                if (this.deviceid == this.deviceref[x].deviceInfo.deviceName) {
                    
                    if ((new Date(this.fromdate.value) < new Date(this.deviceref[x].utilityData.lastUpdate))
                        &&
                        (new Date(this.deviceref[x].utilityData.lastUpdate) < new Date(this.serializedDate.value))) {
                        
                        newArr.push({
                            'Devicename': this.deviceref[x].deviceInfo.deviceName,
                            'SerialNumber': this.deviceref[x].deviceInfo.serialNum,
                            'Devicemake': this.deviceref[x].deviceInfo.deviceMake,
                            'lastunits': this.deviceref[x].utilityData.lastunits,
                            'currentUnits': this.deviceref[x].utilityData.currentUnits,
                            'lastUpdate': this.deviceref[x].utilityData.lastUpdate,
                            'status': this.deviceref[x].deviceInfo.status
                        })
                    }
                }
            }
            if (newArr.length > 1) {
                newArr.sort((a, b) => new Date(a.lastUpdate).getTime() - new Date(b.lastUpdate).getTime())
                new Angular5Csv(newArr, 'DeviceInfo');
            }
            else {
                const dialogConfig = new MatDialogConfig();
                dialogConfig.autoFocus = true;
                dialogConfig.width = '250px';
                dialogConfig.height = '200px';
                dialogConfig.disableClose = true;
                dialogConfig.data = { 'errorheader': 'Warning', 'errormessage': "No Records Founds!" }
                const dialogRef = this.dialog.open(DisplayErrorDialog, dialogConfig);
                dialogRef.afterClosed().subscribe(
                    val => console.log("Dialog output:", val)
                );
            }
            console.log('after processing device data', newArr)
        }

    }

    closeModal(): void {
        this.dialogRef.close();
    }

    static datecomparisionerror(): ValidationErrors | null {
        return { datecomparisionerror: true }
    }

}
@Component({
    selector: 'display-error-dialog',
    templateUrl: './display-error-dialog.html',
})
export class DisplayErrorDialog {

    errormessage: string = '';
    header: string = ''
    constructor(
        public dialogRef: MatDialogRef<DisplayErrorDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
        this.errormessage = data.errormessage;
        this.header = data.errorheader;
    }

    closeModal(): void {
        this.dialogRef.close();
    }
}
