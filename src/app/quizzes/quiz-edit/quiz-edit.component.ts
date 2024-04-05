import { Component } from '@angular/core';
import { QuizzesService } from '../quizzes.service';
import { ActivatedRoute, Params } from '@angular/router';
import { QuizModel } from '../quiz.model';
import { MessageService } from '../../shared/message/message.service';
import { Tag, TagsService } from '../../shared/tags.service';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './quiz-edit.component.html',
  styleUrl: './quiz-edit.component.css',
})
export class QuizEditComponent {
  quiz: QuizModel;
  modifiedTags: Tag[];
  allTags: Tag[];
  constructor(
    private quizzesService: QuizzesService,
    private tagsService: TagsService,
    private route: ActivatedRoute,
    public messageService: MessageService
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.quizzesService.getQuiz(params['quizId']).subscribe(
        (quiz: QuizModel) => {
          this.quiz = quiz;
          this.modifiedTags = [...quiz.tags];
        },
        (error) => this.messageService.showMessage('error', error.error.message)
      );

      this.tagsService.getAllTags().subscribe(
        (tags: {tags: Tag[]}) => this.allTags = tags.tags,
        (error) => this.messageService.showMessage('error', error)
      )
    });
  }

  addTag(itemIndex){
    const tag = this.allTags[itemIndex];
    if (this.modifiedTags.find(filteringTag => filteringTag.tag_id == tag.tag_id)){
      this.messageService.showMessage("error", "Tag already added!");
    }
    else{
      this.modifiedTags.push(tag);
    }
  }
}
