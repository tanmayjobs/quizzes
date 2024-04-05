import { Component } from '@angular/core';
import { RecordsService } from '../records.service';
import { PlayRecordComponent } from '../play-record/play-record.component';
import { PlayRecordModel } from '../records.models';
import { CommonModule } from '@angular/common';
import { QuizTileComponent } from '../quiz-tile/quiz-tile.component';
import { QuizzesService } from '../../quizzes/quizzes.service';
import { LoaderComponent } from '../loader/loader.component';
import { QuizModel } from '../../quizzes/quiz.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [PlayRecordComponent, QuizTileComponent, CommonModule, LoaderComponent, RouterModule],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.css'
})
export class HomeScreenComponent {
  topRecords: PlayRecordModel[] = [];
  topQuizzes: QuizModel[] = [];

  constructor(public recordsService: RecordsService, public quizzesService: QuizzesService){}
  ngOnInit(){
    this.recordsService.getTopRecords().then(
      topRecords => {
        this.topRecords = topRecords;
      }
    );
    this.quizzesService.getQuizzes().subscribe(
      (quizzes: {quizzes: QuizModel[]}) => this.topQuizzes = quizzes.quizzes
    )
  }
}
