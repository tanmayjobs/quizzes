import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizPlayComponent } from './quiz-play/quiz-play.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { QuestionsModule } from './questions/questions.module';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizTileComponent } from '../shared/quiz-tile/quiz-tile.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { PlayRecordComponent } from '../shared/play-record/play-record.component';


@NgModule({
  declarations: [
    QuizPlayComponent,
    QuizEditComponent,
    QuizListComponent,
    NewQuizComponent,
    QuizDetailComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    QuestionsModule,
    QuizTileComponent,
    LoaderComponent,
    PlayRecordComponent
  ]
})
export class QuizzesModule { }
