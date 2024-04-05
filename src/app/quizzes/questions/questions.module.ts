import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionsRoutingModule } from './questions-routing.module';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { OptionItemComponent } from './option-item/option-item.component';
import { PlayQuestionComponent } from './play-question/play-question.component';


@NgModule({
  declarations: [
    EditQuestionComponent,
    OptionItemComponent,
    PlayQuestionComponent
  ],
  imports: [
    CommonModule,
    QuestionsRoutingModule
  ]
})
export class QuestionsModule { }
