import { Component, Input } from '@angular/core';
import { QuizModel } from '../../quizzes/quiz.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

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

  constructor(private authService: AuthService, private router:Router){}

  ngOnInit(){
    this.showDelete = this.router.url.includes("quizzes");
    this.authService.currentUserRole.subscribe(
      role => this.userRole = this.authService.getUserRole()
    )
  }

  click(){
    if (confirm("Are you sure you want to remove the Quiz?")){

    }
  }
}
