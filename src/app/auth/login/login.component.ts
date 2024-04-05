import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { MessageService } from '../../shared/message/message.service';

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  @ViewChild('authForm') authForm: NgForm;

  authData = {
    logIn: {
      link: "../signup",
      message : "Don't have an account?",
      buttonText: "Log In",
      method: this.login.bind(this),
      passwordPattern: "^.*$"
    },
    signUp: {
      link: "../login",
      message : "Already have an account?",
      buttonText: "Sign Up",
      method: this.signup.bind(this),
      passwordPattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,16}$"
    }
  }

  currentMode = "logIn";
  inProgress: boolean = false;

  constructor(private router: Router, private authService: AuthService, private messageService: MessageService){
    this.currentMode = this.router.url.includes("login") ? "logIn" : "signUp";
  }

  login(){
    this.inProgress = true;
    this.authService.login(
      this.authForm.value.username,
      this.authForm.value.password
    ).subscribe(
      (response: {access_token: string, refresh_token: string}) => {
        this.inProgress = false;
        sessionStorage.setItem("userTokens", JSON.stringify(response));
        this.authService.user.next(response);
        this.messageService.showMessage("success", "Successful Login!");
        this.router.navigate(['/']);
      },
      error => {
        this.inProgress = false;
        this.messageService.showMessage("error", error);
      }
    );
  }

  signup(){
    this.inProgress = true;
    this.authService.signup(
      this.authForm.value.username,
      this.authForm.value.password
    ).subscribe(
      (response) => {
        this.inProgress = false;
        this.messageService.showMessage("success", "Successful Signup!");
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.inProgress = false;
        this.messageService.showMessage("error", error);
      }
    );
  }
}
