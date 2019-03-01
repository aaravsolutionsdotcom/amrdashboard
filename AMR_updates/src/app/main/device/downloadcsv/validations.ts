import { AbstractControl, ValidationErrors } from "@angular/forms";

export class DownloadCSVValidations{
    static datecomparisionerror(): ValidationErrors | null {
            return { Invalidmobilenumber: true }
    }
}