import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  message: any;
  deviceId:any;
  devicesRef: any;
  fields = [];
  download_form: FormGroup;
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

}
