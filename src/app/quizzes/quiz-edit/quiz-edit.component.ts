import { Component } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { QuizModel } from '../quiz.model';
import { MessageService } from '../../shared/message/message.service';
import { Tag, TagsService } from '../../shared/tags.service';
import { QuestionsService } from '../questions/questions.service';
import { Question } from '../questions/questions.model';
import { QuizEditService } from '../quiz-edit.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrl: './quiz-edit.component.css',
})
export class QuizEditComponent {
  quiz: QuizModel;
  questions: Question[];

  constructor(
    private quizEditService: QuizEditService,
    private questionsService: QuestionsService,
    private route: ActivatedRoute,
    public messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.quizEditService.load(params['quizId'], true);
    });
    this.quizEditService.questions.subscribe(
      (questions) => {this.questions = questions;console.log(questions)},
      (error) => this.messageService.showMessage('error', error)
    );
    this.quizEditService.quiz.subscribe(
      (quiz) => (this.quiz = quiz),
      (error) => this.messageService.showMessage('error', error)
    );
  }

  chooseQuestion(questionIndex: number) {
    this.quizEditService.showEditPanel(true);
    this.quizEditService.selectEditQuestion(
      questionIndex > -1 ? questionIndex : null
    );
  }

  deleteQuestion(questionIndex: number) {
    this.messageService
      .showConfirm('Do you want to remove this question?')
      .then((remove) => {
        if (remove) {
          this.questionsService
            .deleteQuestion(this.questions[questionIndex].question_id)
            .subscribe(
              (_response) => {
                this.quizEditService.load(this.quizEditService.quizId);
                this.messageService.showMessage(
                  'success',
                  'Question removed successfuly!'
                );
              },
              (error) => this.messageService.showMessage('error', error)
            );
        }
      });
  }
}
