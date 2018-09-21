import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Login } from '../../src/login/loginschema';
import { Devices } from '../../src/app/dashboard/devicesschema'; 
import { Userprofile } from '../app/user-profile/user-profile.component'
import { MonthlyData } from '../app/monthlyreports/monthydataschema'
import { YearlyData } from '../app/yearlyreports/yearlydataschema'
import { RecentData } from '../app/table-list/table-listSchema'

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
            withCredentials: true,
            crossDomain: true,
            observe: 'response' as 'response'
        };  
        return this.http.post<any>(this.login, login, httpOptions)
        .pipe(
               
        );
    }
   

    devices = 'http://45.55.129.192:5000/api/record';
    getdevices(): Observable<Devices[]> {
        
        return this.http.get<Devices[]>(this.devices, {
            withCredentials: true,
        }).pipe(

            );
    }

    recentdata ='http://45.55.129.192:5000/api/recent';
    getrecentdata(): Observable<RecentData[]> {

        return this.http.get<RecentData[]>(this.recentdata, {
            withCredentials: true,
        }).pipe(

            );
    }

    monthlydata = 'http://45.55.129.192:5000/api/month';
    getmonthlydata(): Observable<MonthlyData[]> {

        return this.http.get<MonthlyData[]>(this.monthlydata, {
            withCredentials: true,
        }).pipe(

            );
    }

    yearlydata = 'http://45.55.129.192:5000/api/year';
    getyearlydata(): Observable<YearlyData[]> {
        
        return this.http.get<YearlyData[]>(this.yearlydata, {
            withCredentials: true,
        }).pipe(

            );
    }


    userprofile = 'http://45.55.129.192:5000/api/user/';
    getuserinfo(): Observable<Userprofile[]> {

        return this.http.get<Userprofile[]>(this.userprofile, {
            withCredentials: true,
        }).pipe(

        );
    }

    createProfile(signup: any): Observable<HttpResponse<any>> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            withCredentials: true,
            crossDomain: true,
            observe: 'response' as 'response'
        };  
        return this.http.post<any>(this.userprofile, signup, httpOptions)
        .pipe(
               
        );
    }


    createUserProfile(profile: any): Observable<HttpResponse<any>> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            withCredentials: true,
            crossDomain: true,
            observe: 'response' as 'response'
        };  
        return this.http.post<any>(this.userprofile, profile, httpOptions)
        .pipe(
               
        );
    }

    

    updatepasswordurl = 'http://45.55.129.192:5000/api/change-password';
    updatepassword(passwordinfo: any): Observable<HttpResponse<any>> {
        console.log('updatedpassword:',passwordinfo)
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            withCredentials: true,
            crossDomain: true,
            observe: 'response' as 'response'
        };
        return this.http.post<any>(this.updatepasswordurl, JSON.stringify(passwordinfo), httpOptions)
            .pipe(

            );
    }

    logout = 'http://45.55.129.192:5000/api/logout';
    logoutuser(): Observable<Userprofile[]> {
        return this.http.get<Userprofile[]>(this.logout, {
            withCredentials: true,
        }).pipe(

        );
    }

    email = 'http://localhost:3333/sendmail';
    sendemail(emaildata: any): Observable<HttpResponse<any>> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            }),
            observe: 'response' as 'response'
        };
        return this.http.post<any>(this.email, emaildata, httpOptions)
            .pipe(

            );
    }
}
