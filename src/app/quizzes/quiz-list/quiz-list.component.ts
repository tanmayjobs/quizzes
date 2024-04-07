import { Component, Input, OnChanges } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { MessageService } from '../../shared/message/message.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrl: './quiz-list.component.css'
})
export class QuizListComponent {
  filterBy: string;
  quizzes;
  userRole: string;

  constructor(public quizzesService: QuizzesService, public messageService: MessageService, public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUserRole.subscribe(
      user => {
        this.userRole = this.authService.getUserRole();
      }
    )
    this.quizzesService.getQuizzes(
      this.userRole == 'CREATOR' ? this.authService.currentUserRole.value.user_id : null,
    ).subscribe(
      (response: { quizzes: [] }) => {
        this.quizzes = response.quizzes
      },
      error => {
        this.messageService.showMessage("error", error.error.message);
      }
    )
    this.quizzesService.listenQuizRemoved.
    subscribe(
      (quiz_id) => {
        const quizIndex = this.quizzes.findIndex(quiz => quiz.quiz_id == quiz_id);
        if (quizIndex > -1){
          this.quizzes.splice(quizIndex, 1);
        }
      }
    )
  }
}
