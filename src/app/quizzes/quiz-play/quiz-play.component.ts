import { Component } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MessageService } from '../../shared/message/message.service';
import { QuizModel } from '../quiz.model';
import { QuizPlayService } from '../quiz-play.service';
import { Question } from '../questions/questions.model';
import { QuizzesService } from '../quizzes.service';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrl: './quiz-play.component.css',
})
export class QuizPlayComponent {
  quiz: QuizModel;
  questions: Question[];

  constructor(
    private quizzesService: QuizzesService,
    private quizPlayService: QuizPlayService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.quizPlayService.load(params['quizId']);
    });

    this.quizPlayService.questions.subscribe(
      (questions) => {
        if (questions && questions.length == 0) {
          this.messageService.showMessage(
            'error',
            'Creator is still working on the quiz and is not yet playable!'
          );
          this.router.navigate(['/quizzes']);
        }
        this.questions = questions;
      },
      (error) => this.messageService.showMessage('error', error)
    );
    this.quizPlayService.quiz.subscribe(
      (quiz) => (this.quiz = quiz),
      (error) => this.messageService.showMessage('error', error)
    );
  }

  chooseQuestion(questionIndex: number) {
    this.quizPlayService.chooseQuestion(questionIndex);
  }

  submitQuiz() {
    let isInvalid: boolean = false;
    this.quizPlayService.quizResponse.answers.forEach((answer, index) => {
      if (answer.selected_option_ids.length == 0) {
        this.messageService.showMessage(
          'error',
          `Question ${index + 1} is not attempted yet.`
        );
        isInvalid = true;
      }
    });
    if (!isInvalid) {
      this.quizzesService.playQuiz(this.quizPlayService.quizResponse).subscribe(
        (_response) => {
          console.log(_response);
          this.messageService.showMessage('success', 'You played well!');
          this.router.navigate(['/quizzes', this.quiz.quiz_id]);
        },
        (error) => this.messageService.showMessage('error', error)
      );
    }
  }
}
