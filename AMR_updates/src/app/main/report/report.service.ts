import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  message: any;
  fields = [];
  dailyReportForm: FormGroup;
  monthlyReportForm: FormGroup;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    withCredentials: true,
    crossDomain: true,
    observe: 'response' as 'response'
  };

  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl;

  getdevices(): any {

    return this.http.get<any>(this.baseUrl + 'record', { withCredentials: true })
      .pipe(map(data => {
        return data;
      }));

  }

  getmonthlydata(): any {

    return this.http.get<any>(this.baseUrl + 'month', { withCredentials: true })
      .pipe(map(data => {
        return data;
      }));

  }

  getyearlydata(): any {

    return this.http.get<any>(this.baseUrl + 'year', { withCredentials: true })
      .pipe(map(data => {
        return data;
      }));

  }
}
