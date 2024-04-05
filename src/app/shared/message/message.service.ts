import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<Message>();
  readonly message: Observable<Message> = this.messageSubject.asObservable();

  showMessage(type: string, message: string, duration: number = 5000) {
    this.messageSubject.next(new Message(type, message));
    setTimeout(() => {
      this.clearMessage();
    }, duration);
  }

  clearMessage() {
    this.messageSubject.next(null);
  }
}
