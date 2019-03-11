import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  eventDetails: any[];
  subEvents: any[];
  constructor(private http: HttpClient) { }

  private baseUrl = environment.baseUrl;

  getrecentdata(): any {

    return this.http.get<any>(this.baseUrl + 'recent', {
      withCredentials: true
    }).pipe(map(reports => {
      return reports;
    }));
  }

  getLastReading(): any {

    return this.http.get<any>(this.baseUrl + 'latest', {
      withCredentials: true
    }).pipe(map(reading => {
      return reading;
    }));
  }

  getdevices(): any {

    return this.http.get<any>(this.baseUrl + 'record', { withCredentials: true })
      .pipe(map(data => {
        return data;
      }));

  }
  
  getuserinfo(): any {

    return this.http.get<any>(this.baseUrl + 'user', { withCredentials: true })
      .pipe(map(user => {
        return user;
      }));

  }

}
