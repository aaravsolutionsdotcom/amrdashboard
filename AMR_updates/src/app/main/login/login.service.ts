import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserLoginService {

  message: any;
  fields = [];

  constructor(private http: HttpClient) { }

  private loginUrl = environment.baseUrl + 'signin';
  private baseUrl = environment.baseUrl;

  userLogin(userLogin): any {

    const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
      }),
      withCredentials: true,
      crossDomain: true,
      observe: 'response' as 'response'
  };  
    return this.http.post<any>(this.loginUrl, userLogin, httpOptions)
      .pipe(map(user => {
        return user;
      }));

  }
  getResponseMap(): any {
    return this.fields;
  }

  logout(sessionId): any {
    return this.http.post<any>(this.baseUrl + 'userLogout', sessionId)
      .pipe(map(logout => {
        return logout;
      }));
  }
}
