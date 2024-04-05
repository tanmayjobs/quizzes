import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditQuestionComponent } from './edit-question/edit-question.component';
import { PlayQuestionComponent } from './play-question/play-question.component';

const routes: Routes = [
  {
    path: ":questionId/play",
    component: EditQuestionComponent,
  },
  {
    path: ":questionId/edit",
    component: PlayQuestionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuestionsRoutingModule { }
