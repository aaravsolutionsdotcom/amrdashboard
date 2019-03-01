import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecentDataService {
  eventDetails: any[];
  subEvents: any[];
  constructor(private http: HttpClient) { }

  private url = environment.baseUrl;

  getrecentdata(): any {

    return this.http.get<any>(this.url + 'recent', {
      withCredentials: true
    }).pipe(map(reports => {
      return reports;
    }));
  }
}
