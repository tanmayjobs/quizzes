import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizzesRoutingModule } from './quizzes-routing.module';
import { QuizPlayComponent } from './quiz-play/quiz-play.component';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { QuizTileComponent } from '../shared/quiz-tile/quiz-tile.component';
import { LoaderComponent } from '../shared/loader/loader.component';
import { PlayRecordComponent } from '../shared/play-record/play-record.component';
import { FormsModule } from '@angular/forms';
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';
import { OptionItemComponent } from './questions/option-item/option-item.component';
import { PlayQuestionComponent } from './questions/play-question/play-question.component';


@NgModule({
  declarations: [
    QuizPlayComponent,
    QuizEditComponent,
    QuizListComponent,
    NewQuizComponent,
    QuizDetailComponent,
    EditQuestionComponent,
    OptionItemComponent,
    PlayQuestionComponent
  ],
  imports: [
    CommonModule,
    QuizzesRoutingModule,
    QuizTileComponent,
    LoaderComponent,
    PlayRecordComponent,
    FormsModule
  ]
})
export class QuizzesModule { }
