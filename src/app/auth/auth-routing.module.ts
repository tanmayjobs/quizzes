import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { logoutUser, shouleNotBeLoggedIn } from '../shared/auth.guards';
import { LoaderComponent } from '../shared/loader/loader.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [shouleNotBeLoggedIn]
  },
  {
    path: "signup",
    component: LoginComponent,
    canActivate: [shouleNotBeLoggedIn]
  },
  {
    path: "logout",
    canActivate: [logoutUser],
    component: LoaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
