import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  message: any;
  fields = [];
  updateprofile: FormGroup;
  update_password_form: FormGroup;
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

  getuserinfo(): any {

    return this.http.get<any>(this.baseUrl + 'user', { withCredentials: true })
      .pipe(map(user => {
        return user;
      }));

  }

  updatepassword(passwordinfo: any): any {
    return this.http.post<any>(this.baseUrl + 'change-password', passwordinfo, this.httpOptions)
      .pipe(map(user => {
        return user;
      }));

  }
}
