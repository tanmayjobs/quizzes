import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MessageService } from '../../shared/message/message.service';
import { Tag, TagsService } from '../../shared/tags.service';
import { QuizModel } from '../quiz.model';
import { QuizzesService } from '../quizzes.service';
import { NgFor } from '@angular/common';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrl: './new-quiz.component.css'
})
export class NewQuizComponent {
  @ViewChild('quizForm') quizForm: NgForm;
  quiz: QuizModel;
  modifiedTags: Tag[];
  allTags: Tag[];
  showTagSelector: boolean = false;

  constructor(
    private quizzesService: QuizzesService,
    private tagsService: TagsService,
    private route: ActivatedRoute,
    private router: Router,
    public messageService: MessageService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.tagsService.getAllTags().subscribe(
        (tags: {tags: Tag[]}) => {
          this.allTags = tags.tags;
          this.modifiedTags = [];
        },
        (error) => this.messageService.showMessage('error', error)
      )
    });
  }

  addTag(itemIndex: number){
    const tag = this.allTags[itemIndex];
    if (this.modifiedTags.find(filteringTag => filteringTag.tag_id == tag.tag_id)){
      this.messageService.showMessage("error", "Tag already added!");
    }
    else{
      this.modifiedTags.push(tag);
    }
    this.showTagSelector = !this.showTagSelector;
  }

  removeTag(tagIndex: number){
    this.modifiedTags.splice(tagIndex, 1);
  }

  submitForm(){
    if (!this.modifiedTags.length){
      this.messageService.showMessage("error", "Add atleast one tag!");
      return;
    }
    this.quizzesService.addQuiz(this.quizForm.value.quizName, this.modifiedTags).subscribe(
      (response: {quiz_id: string}) => {
        this.messageService.showMessage("success", "Quiz Added Successfully!");
        this.router.navigate(['/quizzes', response.quiz_id]);
      },
      error => {
        this.messageService.showMessage("error", error);
      }
    );
  }
}
