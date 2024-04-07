import { Component, Input } from '@angular/core';
import { Option } from '../questions.model';
import { QuestionsService } from '../questions.service';
import { MessageService } from '../../../shared/message/message.service';
import { QuizEditService } from '../../quiz-edit.service';

@Component({
  selector: 'app-option-item',
  templateUrl: './option-item.component.html',
  styleUrl: './option-item.component.css'
})
export class OptionItemComponent {
  @Input() option?: Option;
  optionText: string;
  isCorrect: boolean;

  constructor(
    private questionsService: QuestionsService,
    private messageService: MessageService,
    private quizEditService: QuizEditService
  ){}

  ngOnInit(){
    if (!this.option){
      this.option = {
        option: "",
        is_correct: false,
      }
    }
    this.optionText = this.option.option;
    this.isCorrect = this.option.is_correct ?? false;
  }
  
  putOption(){
    if (this.option.id){
      this.questionsService
      .updateOption(this.option.id, this.optionText, this.isCorrect)
      .subscribe(
        _response => {
          this.quizEditService.load(this.quizEditService.quizId);
          this.messageService.showMessage("success", "Option updated Successfully!");
        },
        error => this.messageService.showMessage("error", error)
      )
    }
    else{
      this.questionsService
      .addOption(this.quizEditService.questions.value[this.quizEditService.currentSelectedQuestion.value].question_id, this.optionText, this.isCorrect)
      .subscribe(
        _response => {
          this.quizEditService.load(this.quizEditService.quizId);
          this.messageService.showMessage("success", "Option added Successfully!");
        },
        error => this.messageService.showMessage("error", error)
      )
    }
  }
  deleteOption(){
    this.messageService.showConfirm("Do you want to delete the option?")
    .then(
      remove => {
        if (remove){
          this.questionsService
          .deleteOption(this.option.id)
          .subscribe(
            _response => {
              this.quizEditService.load(this.quizEditService.quizId);
              this.messageService.showMessage("success", "Option removed Successsfully!");
            },
            error => this.messageService.showMessage("error", error)
          );
        }
      }
    )
  }
}
