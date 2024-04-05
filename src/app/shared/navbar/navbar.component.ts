import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { UserTokens } from '../../auth/user.model';
import { CommonModule } from '@angular/common';
import { USEROLES } from '../app.helpers';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  userRole: string;
  constructor(private authService: AuthService){}
  ngOnInit(){
    this.authService.currentUserRole.subscribe(
      (user) => this.userRole = USEROLES[user.role]
    );
  }
}
