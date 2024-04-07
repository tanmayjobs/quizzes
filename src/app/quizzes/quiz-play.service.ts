import { Injectable } from "@angular/core";
import { QuizModel, QuizResponse } from "./quiz.model";
import { Subject, BehaviorSubject } from "rxjs";
import { Question } from "./questions/questions.model";
import { QuizzesService } from "./quizzes.service";
import { QuestionsService } from "./questions/questions.service";

@Injectable({providedIn: 'root'})
export class QuizPlayService{
    quizId: string;
    quiz: Subject<QuizModel> = new Subject<QuizModel>();
    questions: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>(null);
    currentSelectedQuestion: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    quizResponse: QuizResponse;

    constructor(private quizzesService: QuizzesService, private questionsService: QuestionsService){}

    load(quizId: string,){
        this.quizId = quizId;

        this.quizzesService
        .getQuiz(quizId)
        .subscribe(
            (quiz: QuizModel) => this.quiz.next(quiz),
            error => this.quiz.error(error)
        )

        this.questionsService
        .getQuestions(quizId)
        .subscribe(
            (questions: {questions: Question[]}) => {
                const questionsData = questions.questions;
                let quizResponse = {
                    quiz_id: "",
                    answers: []
                };
                quizResponse.quiz_id = this.quizId;
                questionsData
                .forEach(question => quizResponse.answers.push({
                    question_id: question.question_id,
                    selected_option_ids: []
                }))
                this.quizResponse = quizResponse;
                this.questions.next(questionsData);
            },
            error => this.questions.error(error)
        )

        this.currentSelectedQuestion.next(null);
    }

    chooseQuestion(questionIndex: number){
        this.currentSelectedQuestion.next(questionIndex);
    }

    selectOption(questionId: string, optionId: string, selected: boolean){
        const answers = this.quizResponse.answers;
        const answer = answers[answers.findIndex(answer => answer.question_id == questionId)];
        if (!selected){
            answer.selected_option_ids.splice(answer.selected_option_ids.findIndex(option_id => optionId == option_id), 1);
        }
        else{
            answer.selected_option_ids.push(optionId);
        }
    }
}