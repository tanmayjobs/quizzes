import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizEditComponent } from './quiz-edit/quiz-edit.component';
import { canCreateQuiz, canEditQuiz, canPlayQuiz, shouldBeLoggedIn } from '../shared/auth.guards';
import { QuizPlayComponent } from './quiz-play/quiz-play.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { FillComponent } from '../shared/fill/fill.component';
import { EditQuestionComponent } from './questions/edit-question/edit-question.component';
import { QuizDetailComponent } from './quiz-detail/quiz-detail.component';
import { NewQuizComponent } from './new-quiz/new-quiz.component';

const routes: Routes = [
  {
    path: ":quizId/edit",
    component: QuizEditComponent,
    children: [
      // {
      //   path: "",
      //   component: FillComponent
      // },
      // {
      //   path: ":questionId",
      //   component: EditQuestionComponent
      // }
    ],
    canActivate: [shouldBeLoggedIn, canEditQuiz]
  },
  {
    path: "new",
    component: NewQuizComponent,
    canActivate: [shouldBeLoggedIn, canCreateQuiz]
  },
  {
    path: ":quizId/play",
    component: QuizPlayComponent,
    canActivate: [shouldBeLoggedIn, canPlayQuiz]
  },
  {
    path: ":quizId",
    component: QuizDetailComponent,
  },
  {
    path: "",
    component: QuizListComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizzesRoutingModule { }
