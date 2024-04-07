import { Component } from '@angular/core';
import { UsersService } from '../users.service';
import { User } from '../user.model';
import { MessageService } from '../../shared/message/message.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  users: User[] = [];

  constructor(private usersService: UsersService, private messageService: MessageService){}

  ngOnInit(){
    this.usersService
    .getUser()
    .subscribe(
      (response: {users: User[]}) => {
        this.users = response.users;
      },
      error => {
        this.messageService.showMessage("error", error)
      }
    )

    this.usersService.userRemovedBroadcast.subscribe(
      userId => {
        this.users.splice(
          this.users.findIndex(user => user.user_id == userId),
          1
        );
      }
    )
  }
}
