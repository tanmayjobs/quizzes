import { Component, Input } from '@angular/core';
import { User } from '../../users/user.model';
import { USERROLES } from '../app.helpers';
import { Capitalize } from '../capitalize.pipe';
import { UsersService } from '../../users/users.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'user-detail',
  standalone: true,
  imports: [Capitalize],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent {
  @Input() user: User;

  constructor(private usersService: UsersService, private messageService: MessageService){}

  ngOnChanges(){
    this.user.user_role = USERROLES[this.user.user_role];
  }

  removeUser(){
    this.messageService
    .showConfirm(`Do you want to remove ${this.user.username} user?`)
    .then(isConfirmed => {
      if (isConfirmed){
        this.usersService
        .removeUser(this.user.user_id)
        .subscribe(
          _response => this.messageService.showMessage("success", "User removed successfuly!"),
          error => this.messageService.showMessage("error", error)
        )
      }
    });
  }
}
