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

    validationMessage(mandatory:number, validationMsg:string, minSize:number, maxSize:number): string {
          
        let message:string = "";

        if(mandatory == 1){
            message+="Required";
        }
        if(validationMsg != null){
            message+= ", "+validationMsg;
        }
        
        if(minSize != null && maxSize !=null){
            message+=" (" +minSize +" - "+maxSize+")";
        }else if(minSize != null && maxSize == null){
            message+=" (Min= " +minSize+")";
        }else if(minSize == null && maxSize != null){
            message+=" (Max= " +maxSize+")";
        }
        
        return message;
      }
}
