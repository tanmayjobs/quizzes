import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../shared/constants';
import { BehaviorSubject, Subject, catchError } from 'rxjs';
import { UserTokens } from './user.model';
import { USEROLES, handleError } from '../shared/app.helpers';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<UserTokens>(null);
  currentUserRole = new BehaviorSubject<{role: number, user_id: string}>({role: 4, user_id: null});

  constructor(public httpClient: HttpClient,public router: Router) {
    const userTokens = JSON.parse(sessionStorage.getItem("userTokens"));
    this.user.next(userTokens);
  }

  login(username: string, password: string){
    return this.httpClient
    .post(`${Constants.BASEURL}/auth/sign-in`, {
      username: username,
      password: password
    })
    .pipe(catchError(handleError));
  }

  signup(username: string, password: string){
    return this.httpClient
    .post(`${Constants.BASEURL}/auth/sign-up`, {
      username: username,
      password: password
    })
    .pipe(catchError(handleError));
  }

  role(){
    return this.httpClient.
    get(`${Constants.BASEURL}/auth/role`, {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.user.value.access_token}`
      })
    })
    .pipe(catchError(handleError));
  }


  logout(){
    this.currentUserRole.next({role: 4, user_id: null});
    this.user.next(null);
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  getUserRole(){
    return USEROLES[this.currentUserRole.value.role ?? -1];
  }
}
