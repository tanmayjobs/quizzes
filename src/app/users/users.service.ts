import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constants } from '../shared/constants';
import { AuthService } from '../auth/auth.service';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { handleError } from '../shared/app.helpers';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userRemoved: Subject<string> = new Subject();
  readonly userRemovedBroadcast: Observable<string> = this.userRemoved.asObservable();

  constructor(private httpClient: HttpClient, private authService: AuthService) { }

  getUser(){
    return this.httpClient
    .get(`${Constants.BASEURL}/users`, {
      headers: new HttpHeaders({
        authorization: `${this.authService.user.value.access_token}`
      })
    })
    .pipe(
      catchError(handleError)
    )
  }

  removeUser(userId: string){
    return this.httpClient
    .delete(`${Constants.BASEURL}/users/${userId}`, {
      headers: new HttpHeaders({
        authorization: `Bearer ${this.authService.user.value.access_token}`
      })
    })
    .pipe(
      catchError(handleError),
      tap(_response => this.userRemoved.next(userId))
    )
  }
}
