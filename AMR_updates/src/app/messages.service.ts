import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  constructor(private toastrService: ToastrService) { }


  globalDialogMessage: string;

  requiredMessage(label): any {
    return label + ' is required.';
  }

  invalidEmail(label): any {
    return label + ' is not valid.';
  }
  

  minLengthMessage(labelName, minLength): any {
    return labelName + ' requires atleast ' + minLength + ' characters.';
  }

  sameSelectionErrorMessage(): any {
    return 'Already selected, Please select different option.';
  }
  commonErrorMessage(): any {
    return 'Something went wrong, Please try again.';
  }
  commonSuceessMessage(): any {
    return 'Action performed successfully.';
  }
  validationFailMessage(): any {
    return ' Some validations are failing, Please check the form and try again.';
  }

  dataNotFoundMessage(): any {
    return 'Data not found, Please try again';
  }
  lowBalanceMessage(): any {
    return 'Balance is low, You can not perform this action.';
  }

  getMessageCustomParameters(): any {
    const config = {
      timeOut: 5000,
      progressBar: true,
      closeButton: true,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      autoDismiss: false,
      extendedTimeOut: 10000,
    };
    return config;

  }

  getErrorMessageTitle(): string {
    return '';
  }

  getSuccessMessageTitle(): string {

    return '';
  }

  getWarningMessageTitle(): string {
    return '';
  }

  getValidSuccessMessage(data): any {
    if (data.message !== '' && data.message !== undefined && data.message !== null) {
      return data.message;

    } else {
      return this.commonSuceessMessage();
    }
  }

  getValidErrorMessage(error): any {
    if (error.message !== '' && error.message !== undefined && error.message !== null) {
      return error.message;

    } else {
      return this.commonErrorMessage();
    }
  }

  showSuccessMessage(message): void {
    this.toastrService.success(message, this.getSuccessMessageTitle(), this.getMessageCustomParameters());
  }
  showErrorMessage(message): void {
    this.toastrService.error(message, this.getErrorMessageTitle(), this.getMessageCustomParameters());
  }
  showWarningMessage(message): void {
    this.toastrService.warning(message, this.getErrorMessageTitle(), this.getMessageCustomParameters());
  }

  showCommonErrorMessage(): void {
    this.toastrService.error('Something went wrong !!', this.getErrorMessageTitle(), this.getMessageCustomParameters());
  }

  showMessage(messageObject): void {
    if (messageObject !== undefined && messageObject !== null) {
      if (messageObject.status === 'SUCCESS') {
        this.toastrService.success(messageObject.message, this.getSuccessMessageTitle(), this.getMessageCustomParameters());
      } else if (messageObject.status === 'VALIDATION_ERROR') {
        this.toastrService.warning(messageObject.message, this.getErrorMessageTitle(), this.getMessageCustomParameters());
      } else if (messageObject.status === 'EXCEPTION_ERROR') {
        this.toastrService.error(messageObject.message, this.getErrorMessageTitle(), this.getMessageCustomParameters());
      }
    }

  }
  noDataAvailable(): any {
    return 'No data available';
  }
  alreadyAssignRequest(): any {
    return "This request is already assigned, you can't update it";
  }
}
