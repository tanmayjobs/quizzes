import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from '../../shared/message/message.service';
import { PlayRecordModel } from '../../shared/records.models';
import { RecordsService } from '../../shared/records.service';
import { QuizModel } from '../quiz.model';
import { QuizzesService } from '../quizzes.service';
import { QuestionsService } from '../questions/questions.service';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrl: './quiz-play.component.css'
})
export class QuizPlayComponent {
  @Input() quiz: QuizModel;
  records: PlayRecordModel[];
  userRole: Boolean;
  userId: string;

  constructor(
    private quizzesService: QuizzesService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private questionsService: QuestionsService,
    private router: Router
  ) { }
  ngOnInit() {
    this.authService.currentUserRole.subscribe(
      (user) => {
        this.userRole = this.authService.getUserRole();
        this.userId = user.user_id;
      }
    );

    this.route.params.subscribe((params: Params) => {
      this.quizzesService.getQuiz(params['quizId'])
      .subscribe(
        (quiz: QuizModel) => (this.quiz = quiz),
        (error) => {
          this.messageService.showMessage('error', error.error.message);
          this.router.navigate(['/quizzes'])
        }
      );
      this.questionsService.getQuestions(params['quizId']).subscribe(

      )
    });
  }
}
