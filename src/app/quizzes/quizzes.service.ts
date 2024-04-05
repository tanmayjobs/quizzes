import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { QuizModel } from './quiz.model';
import { Constants } from '../shared/constants';
import { catchError } from 'rxjs';
import { handleError } from '../shared/app.helpers';

@Injectable({
  providedIn: 'root',
})
export class QuizzesService {
  constructor(public httpClient: HttpClient) {}

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

  deleteQuiz(quiz_id: string){
    return this.httpClient
    .delete(`${Constants.BASEURL}/quizzes/${quiz_id}`)
    .pipe(catchError(handleError));
  }
}
