import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Constants } from "../../shared/constants";
import { catchError } from "rxjs";
import { handleError } from "../../shared/app.helpers";
import { AuthService } from "../../auth/auth.service";
import { Question } from "./questions.model";

@Injectable({providedIn: 'root'})
export class QuestionsService{

    updateQuestionSelected?: Question;

    constructor(private httpClient: HttpClient, private authService: AuthService){}

    getQuestions(quiz_id: string){
        return this.httpClient
        .get(`${Constants.BASEURL}/quizzes/${quiz_id}/questions`,{
            headers: new HttpHeaders({
                authorization: `Bearer ${this.authService.user.value.access_token}`
            })
        })
        .pipe(catchError(handleError))
    }

    updateQuestion(questionId: string, questionText: string){
        return this.httpClient
        .put(`${Constants.BASEURL}/questions/${questionId}`, {
            question_text: questionText
        },{
            headers: new HttpHeaders({
                authorization: `Bearer ${this.authService.user.value.access_token}`
            })
        })
        .pipe(catchError(handleError));
    }

    addQuestion(quizId: string, questionText: string){
        return this.httpClient
        .post(`${Constants.BASEURL}/quizzes/${quizId}/questions`, {
            question_text: questionText,
            options: []
        },{
            headers: new HttpHeaders({
                authorization: `Bearer ${this.authService.user.value.access_token}`
            })
        })
        .pipe(catchError(handleError));
    }

    deleteQuestion(questionId: string){
        return this.httpClient
        .delete(`${Constants.BASEURL}/questions/${questionId}`,{
            headers: new HttpHeaders({
                authorization: `Bearer ${this.authService.user.value.access_token}`
            })
        })
        .pipe(catchError(handleError))
    }

    deleteOption(optionId: string){
        return this.httpClient
        .delete(`${Constants.BASEURL}/options/${optionId}`,{
            headers: new HttpHeaders({
                authorization: `Bearer ${this.authService.user.value.access_token}`
            })
        })
        .pipe(catchError(handleError))
    }


    updateOption(optionId: string, optionText: string, isCorrect: boolean){
        return this.httpClient
        .put(`${Constants.BASEURL}/options/${optionId}`, {
            option_text: optionText,
            is_correct: isCorrect,
        },{
            headers: new HttpHeaders({
                authorization: `Bearer ${this.authService.user.value.access_token}`
            })
        })
        .pipe(catchError(handleError));
    }

    addOption(questionId: string, optionText: string, isCorrect: boolean){
        return this.httpClient
        .post(`${Constants.BASEURL}/questions/${questionId}/options`, {
            option_text: optionText,
            is_correct: isCorrect,
        },{
            headers: new HttpHeaders({
                authorization: `Bearer ${this.authService.user.value.access_token}`
            })
        })
        .pipe(catchError(handleError));
    }
}