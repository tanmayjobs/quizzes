import { Component, Input } from '@angular/core';
import { QuizModel } from '../../quizzes/quiz.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { QuizzesService } from '../../quizzes/quizzes.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'quiz-tile',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './quiz-tile.component.html',
  styleUrl: './quiz-tile.component.css'
})
export class QuizTileComponent {
  @Input() quiz: QuizModel;
  userRole: string;
  showDelete: boolean;

  constructor(private authService: AuthService, private router:Router, private quizzesService: QuizzesService, private messageService: MessageService){}

  ngOnInit(){
    this.showDelete = this.router.url.includes("quizzes");
    this.authService.currentUserRole.subscribe(
      role => this.userRole = this.authService.getUserRole()
    )
  }

  removeQuiz(){
    const askConfirmation = this.messageService.showConfirm(`Do you want to remove '${this.quiz.quiz_name}' Quiz?`);
    askConfirmation.then((isConfirmed) => {
      if (isConfirmed){
        this.quizzesService.
        deleteQuiz(this.quiz.quiz_id)
        .subscribe(
          _response => this.messageService.showMessage("success", "Quiz Removed Successfully!"),
          error => this.messageService.showMessage("error", error)
        );
      }
    });
  }
}
