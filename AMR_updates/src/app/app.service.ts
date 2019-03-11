import { Injectable } from '@angular/core';
import * as common from '@angular/common';
import { Navigation } from './navigation/navigation';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    loading = false;
    nav: Navigation = new Navigation();

    constructor(private datePipe: common.DatePipe) {
    }

    validationMessage(mandatory: number, validationMsg: string, minSize: number, maxSize: number): string {

        let message: string = "";

        if (mandatory == 1) {
            message += "Required";
        }
        if (validationMsg != null) {
            message += ", " + validationMsg;
        }

        if (minSize != null && maxSize != null) {
            message += " (" + minSize + " - " + maxSize + ")";
        } else if (minSize != null && maxSize == null) {
            message += " (Min= " + minSize + ")";
        } else if (minSize == null && maxSize != null) {
            message += " (Max= " + maxSize + ")";
        }

        return message;
    }

    DateUTCtoGUI(inputDate: Date): Date {
        if (inputDate !== undefined) {
            inputDate = new Date(inputDate);
         //   inputDate.setMinutes(inputDate.getMinutes() - inputDate.getTimezoneOffset());
            return inputDate;
        }
    }

    removeduplicates = function (origArr) {
        var newArr = [],
            origLen = origArr.length,
            found, x, y;

        for (x = 0; x < origLen; x++) {

            found = undefined;
            for (y = 0; y < newArr.length; y++) {
                if (origArr[x].deviceInfo.deviceName === newArr[y].deviceInfo.deviceName) {
                    console.log(origArr[x])
                    found = true;
                    break;
                }
            }
            if (!found) {
                newArr.push(origArr[x]);
            }
        }
        return newArr;
    }
}
