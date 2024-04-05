import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Constants } from "../../shared/constants";
import { catchError } from "rxjs";
import { handleError } from "../../shared/app.helpers";

@Injectable({providedIn: 'root'})
export class QuestionsService{
    constructor(private httpClient: HttpClient){}

    getQuestions(quiz_id: string){
        return this.httpClient
        .get(`${Constants.BASEURL}/quizzes/${quiz_id}/questions`)
        .pipe(catchError(handleError))
    }
}