import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizModel, QuizResponse } from './quiz.model';
import { Constants } from '../shared/constants';
import { Observable, Subject, catchError, tap } from 'rxjs';
import { handleError } from '../shared/app.helpers';
import { AuthService } from '../auth/auth.service';
import { Tag } from '../shared/tags.service';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  private quizRemove: Subject<string> = new Subject<string>();
  readonly listenQuizRemoved: Observable<string> = this.quizRemove.asObservable();

  constructor(public httpClient: HttpClient, public authService: AuthService) {}

  getQuiz(quiz_id: string){
    return this.httpClient.get(`${Constants.BASEURL}/quizzes/${quiz_id}`);
  }

  getQuizzes(creator_id: string = null, quiz_id: string = null) {
    let params = new HttpParams()
    if (creator_id){
      params = params.set("creator_id", creator_id);
    }
    if (quiz_id){
      params = params.set("quiz_id", quiz_id);
    }
    return this.httpClient.get(`${Constants.BASEURL}/quizzes`, {
      params: params,
    });
  }

  getTopQuizzes(): Promise<QuizModel[]> {
    return new Promise<QuizModel[]>((resolve, reject) => {
      setTimeout(() => {
        resolve([
          new QuizModel('22p-2p2-s4p', '2k2-d3j-03k', 'Gotham', 'Riddler'),
          new QuizModel('34p-4o2-sd0', '202-d0d-0s2', 'Gotham I', 'Riddler'),
        ]);
      }, 100);
    });
  }

  deleteQuiz(quizId: string){
    return this.httpClient
    .delete(`${Constants.BASEURL}/quizzes/${quizId}`,{
      headers: new HttpHeaders(
        {authorization: `Bearer ${this.authService.user.value.access_token}`}
      )
    })
    .pipe(
      catchError(handleError),
      tap(_value => {
        this.quizRemove.next(quizId);
      })
    );
  }

  addQuiz(quizName: string, tags: Tag[]){
    return this.httpClient
    .post(`${Constants.BASEURL}/quizzes`, {
      quiz_name: quizName,
      tag_ids: tags.map(tag => tag.tag_id)
    },{
      headers: new HttpHeaders({
        authorization: `Bearer ${this.authService.user.value.access_token}`
      })
    })
    .pipe(catchError(handleError))
  }

  playQuiz(quizResponse: QuizResponse){
    return this.httpClient
    .post(`${Constants.BASEURL}/records`, quizResponse,{
      headers: new HttpHeaders({
        authorization: `Bearer ${this.authService.user.value.access_token}`
      })
    })
    .pipe(catchError(handleError))
  }
}
