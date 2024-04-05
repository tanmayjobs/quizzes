import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { canManageUsers, redirectToMyProfile, shouldBeLoggedIn } from '../shared/auth.guards';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: "",
    canActivate: [shouldBeLoggedIn],
    children: [
      {
        path: "",
        component: UserListComponent,
        canActivate: [canManageUsers]
      },
      {
        path: "my-profile",
        component: UserProfileComponent,
      },
      {
        path: ":userId",
        component: UserProfileComponent,
        canActivate: [redirectToMyProfile]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
