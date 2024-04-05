import { Component, Input } from '@angular/core';
import { PlayRecordModel } from '../records.models';

@Component({
  selector: 'play-record',
  standalone: true,
  imports: [],
  templateUrl: './play-record.component.html',
  styleUrl: './play-record.component.css'
})
export class PlayRecordComponent {
  @Input() record: PlayRecordModel;
  @Input() itemNumber: number;
}
