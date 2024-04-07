import { Tag } from '../shared/tags.service';

export class QuizModel {
  constructor(
    public quiz_id: string = '1k2-2k1-402',
    public creator_id: string = '4kf-s02-s02',
    public quiz_name: string = 'Gotham',
    public creator_name: string = 'Riddler',
    public description: string = 'I belong to you, but others use me more than you do?',
    public tags: Tag[] = []
  ) {}
}

export interface Answer {
  question_id: string;
  selected_option_ids: string[];
}

export interface QuizResponse {
  quiz_id: string;
  answers: Answer[];
}
