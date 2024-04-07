import { Component, Input } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { QuizModel } from '../quiz.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from '../../shared/message/message.service';
import { RecordsService } from '../../shared/records.service';
import { PlayRecordModel } from '../../shared/records.models';
import { AuthService } from '../../auth/auth.service';
import { USERROLES } from '../../shared/app.helpers';

@Component({
  selector: 'app-quiz-detail',
  templateUrl: './quiz-detail.component.html',
  styleUrl: './quiz-detail.component.css',
})
export class QuizDetailComponent {
  @Input() quiz: QuizModel;
  records: PlayRecordModel[];
  userRole: Boolean;
  userId: string;

  constructor(
    private quizzesService: QuizzesService,
    private recordService: RecordsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private messageService: MessageService,
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
      this.recordService.getRecords(null, params.quiz_id)
      .subscribe(
        (records: {records: PlayRecordModel[]}) => this.records = records.records,
        (error) => this.messageService.showMessage('error', error.error.message)
      );
    });
  }

  removeQuiz(){
    console.log(this.quiz);
    const askConfirmation = this.messageService.showConfirm(`Do you want to remove '${this.quiz.quiz_name}' Quiz?`);
    askConfirmation.then((isConfirmed) => {
      if (isConfirmed){
        this.quizzesService.
        deleteQuiz(this.quiz.quiz_id)
        .subscribe(
          _response => {
            this.router.navigate(['/quizzes']);
            this.messageService.showMessage("success", "Quiz Removed Successfully!");
          },
          error => this.messageService.showMessage("error", error)
        );
      }
    });
  }
}
