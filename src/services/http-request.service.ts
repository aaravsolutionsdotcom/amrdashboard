import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../../src/login/loginschema';
import { Devices } from '../../src/app/dashboard/devicesschema'; 
@Injectable({
  providedIn: 'root'
})
export class HttpRequestService {


    constructor(private http: HttpClient) { }
    login = 'http://45.55.129.192:5000/api/signin';
    checksignin(login: any): Observable<HttpResponse<any>> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            withCredentials: true,            crossDomain: true,
            observe: 'response' as 'response'
        };  
        return this.http.post<any>(this.login, login, httpOptions)
            .pipe(
               
            );
    }
   

   devices = ' http://45.55.129.192:5000/api/record';
    getdevices(): Observable<Devices[]> {
        
        return this.http.get<Devices[]>(this.devices, {
            withCredentials: true,
        }).pipe(

            );
    }
}
