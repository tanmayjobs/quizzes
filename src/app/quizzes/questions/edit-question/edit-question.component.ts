import { Component, Input, ViewChild } from '@angular/core';
import { Question } from '../questions.model';
import { QuizEditService } from '../../quiz-edit.service';
import { NgForm } from '@angular/forms';
import { QuestionsService } from '../questions.service';
import { MessageService } from '../../../shared/message/message.service';

@Component({
  selector: 'edit-question',
  templateUrl: './edit-question.component.html',
  styleUrl: './edit-question.component.css'
})
export class EditQuestionComponent {
  @ViewChild('questionForm') questionForm: NgForm;
  question: Question;
  visible: boolean;
  constructor(private quizEditService: QuizEditService, private questionsService: QuestionsService, private messageService: MessageService){}

  ngOnInit(){
    this.quizEditService.editPanelVisible.subscribe(
      visible => this.visible = visible
    )
    this.quizEditService.currentSelectedQuestion.subscribe(
      questionIndex => {
          if (questionIndex != null){
          this.question = this.quizEditService.questions.value[questionIndex];
        }
        else{
          this.question = {
            question_text: "",
            options: []
          };
        }
      }
    )
  }

  putQuestion(){
    if (this.questionForm.valid){
      if (this.question.question_id){
        this.questionsService
        .updateQuestion(this.question.question_id, this.questionForm.value.questionText)
        .subscribe(
          _response => {
            this.quizEditService.load(this.quizEditService.quizId);
            this.messageService.showMessage("success", "Question Updated Successfully!");
          },
          error => this.messageService.showMessage("error", error)
        );
      }
      else{
        this.questionsService
        .addQuestion(this.quizEditService.quizId, this.questionForm.value.questionText)
        .subscribe(
          _response => {
            this.quizEditService.load(this.quizEditService.quizId);
            this.messageService.showMessage("success", "Question Added Successfully!");
          },
          error => this.messageService.showMessage("error", error)
        );
      }
    }
  }
}