import { Component, OnInit } from '@angular/core'; 
import { Validators, FormGroup, FormControl, ValidationErrors } from "@angular/forms";

@Component({
  selector: 'app-dailyreports',
  templateUrl: './dailyreports.component.html',
  styleUrls: ['./dailyreports.component.scss']
})
export class DailyreportsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
      var lastDay = new Date();
      console.log('lastdate and firstday' + firstDay + lastDay)
  }

    fromdate = new FormControl(new Date());
    todate = new FormControl(new Date());
    maxDate = new Date()
    minDate = new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), 1); 
}
