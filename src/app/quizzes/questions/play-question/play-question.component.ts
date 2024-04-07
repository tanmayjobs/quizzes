import { Component } from '@angular/core';
import { QuizPlayService } from '../../quiz-play.service';
import { Option, Question } from '../questions.model';

@Component({
  selector: 'play-question',
  templateUrl: './play-question.component.html',
  styleUrl: './play-question.component.css'
})
export class PlayQuestionComponent {
  question: Question;
  constructor(private quizPlayService: QuizPlayService){}

  ngOnInit(){
    this.quizPlayService.currentSelectedQuestion
    .subscribe(
      questionIndex => {
        this.question = this.quizPlayService.questions.value[questionIndex];
      }
    )
  }

  selectOption(optionId: string, selected: boolean){
    this.quizPlayService.selectOption(this.question.question_id, optionId, selected)
  } 

  isSelected(option: Option){
    return this.quizPlayService.quizResponse
    .answers[this.quizPlayService.quizResponse.answers.findIndex(answer => answer.question_id == this.question.question_id)]
    .selected_option_ids.findIndex(option_id => option_id == option.id) != -1
  }
}
