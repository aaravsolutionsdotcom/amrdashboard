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
                'access-control-allow-origin': 'http://localhost:4200',
                'Access-Control-Allow-Headers': 'Origin, Content-Type'
            }),
            withCredentials: true,
            observe: 'response' as 'response'
        };  
        return this.http.post<any>(this.login, login, httpOptions)
            .pipe(
               
            );
    }
   

   devices = ' http://45.55.129.192:5000/api/record';
    getdevices(): Observable<Devices[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };
        return this.http.get<Devices[]>(this.devices, httpOptions)
            .pipe(

            );
    }
}
