import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserExist } from '../UserExist';
import { SignUp } from '../SignupTemplate';
import { Login } from '../LoginTemplate';
import { Hall } from '../Hall';
import { GetHalls } from '../getHalls';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
let token: string = localStorage.getItem('Token') || '';
const tokenOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    token: token,
  }),
};
@Injectable({
  providedIn: 'root',
})
export class DbService {
  private apiURI: string = 'https://stark-inlet-85258.herokuapp.com';

  constructor(private http: HttpClient) {}
  signUp(user: SignUp): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/signup`, user, httpOptions);
  }

  login(user: Login): Observable<UserExist> {
    return this.http.post<UserExist>(`${this.apiURI}/login`, user, httpOptions);
  }

  logout(): Observable<any> {
    return this.http.delete<any>(`${this.apiURI}/logout`, tokenOptions);
  }
  createHalls(data: Hall): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/createHalls`, data, httpOptions);
  }
  getHalls(): Observable<GetHalls> {
    return this.http.get<GetHalls>(`${this.apiURI}/getBooking`, httpOptions);
  }
  sendSearchData(data: any): Observable<any> {
    return this.http.post<any>(
      `${this.apiURI}/searchBooking`,
      data,
      httpOptions
    );
  }
  createBooking(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiURI}/createBooking`, data, tokenOptions);
  }
}
