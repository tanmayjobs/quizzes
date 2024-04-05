import { Component } from '@angular/core';
import { MessageService } from './message.service';
import { Message } from './message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrl: './message.component.css',
  imports: [CommonModule],
  standalone: true,
})
export class MessageComponent {
  message: Message;
  constructor(private messageService: MessageService){}

  ngOnInit(){
    this.messageService.message.subscribe(
      message =>  {
        this.message = message;
      }
    )
  }
}
