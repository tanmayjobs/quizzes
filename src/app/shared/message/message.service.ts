import { Injectable } from '@angular/core';
import { Subject, Observable, ObjectUnsubscribedError } from 'rxjs';
import { Message } from './message.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new Subject<Message>();
  private messageConfirm = new Subject<boolean>();
  readonly message: Observable<Message> = this.messageSubject.asObservable();
  readonly confirm: Observable<boolean> = this.messageConfirm.asObservable();

  showMessage(type: string, message: string, duration: number = 5000) {
    this.messageSubject.next(new Message(type, message));
    return setTimeout(() => {
      this.clearMessage();
    }, duration);
  }

  showConfirm(messgae: string): Promise<boolean>{
    this.messageSubject.next(new Message("confirm", messgae));
    return new Promise<boolean>((resolve, reject) => {
      this.confirm.subscribe((isConfirmed) => {
        resolve(isConfirmed);
      })
    });
  }

  confirmDecision(isConfirmed: boolean){
    this.messageConfirm.next(isConfirmed);
    this.clearMessage();
  }

  clearMessage() {
    this.messageSubject.next(null);
  }
}
