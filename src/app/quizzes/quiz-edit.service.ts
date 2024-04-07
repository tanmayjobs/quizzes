import { Injectable } from "@angular/core";
import { QuizModel } from "./quiz.model";
import { Option, Question } from "./questions/questions.model";
import { BehaviorSubject, Subject } from "rxjs";
import { QuizzesService } from "./quizzes.service";
import { QuestionsService } from "./questions/questions.service";

@Injectable({providedIn: 'root'})
export class QuizEditService{
    quizId: string;
    quiz: Subject<QuizModel> = new Subject<QuizModel>();
    questions: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);
    currentSelectedQuestion: BehaviorSubject<number> = new BehaviorSubject<number>(null);
    editPanelVisible: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    constructor(private quizzesService: QuizzesService, private questionsService: QuestionsService){}

    load(quizId: string, loadQuiz: boolean = false){
        this.quizId = quizId;

        if (loadQuiz){
            this.quizzesService
            .getQuiz(quizId)
            .subscribe(
                (quiz: QuizModel) => this.quiz.next(quiz),
                error => this.quiz.error(error)
            )
        }

        this.questionsService
        .getQuestions(quizId)
        .subscribe(
            (questions: {questions: Question[]}) => this.questions.next(questions.questions),
            error => this.questions.error(error)
        )

        this.editPanelVisible.next(false);
        this.currentSelectedQuestion.next(null);
        // this.currentSelectedQuestion.next(this.currentSelectedQuestion.value);
    }

    selectEditQuestion(questionIndex?: number){
        this.currentSelectedQuestion.next(questionIndex);
    }

    showEditPanel(show: boolean){
        this.editPanelVisible.next(show);
    }
}