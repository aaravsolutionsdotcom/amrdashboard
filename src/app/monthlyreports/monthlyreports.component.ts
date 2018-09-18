import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-monthlyreports',
  templateUrl: './monthlyreports.component.html',
  styleUrls: ['./monthlyreports.component.scss']
})
export class MonthlyreportsComponent implements OnInit {

  constructor() { }
    firstDayofyear;
       
    ngOnInit() {
        var date = new Date();
        this.firstDayofyear = new Date(date.getFullYear(), 1);       
    }
    fromdate = new FormControl(new Date());
    todate = new FormControl(new Date());
    maxDate = new Date()
    minDate = new Date(this.maxDate.getFullYear(), 0); 
}
