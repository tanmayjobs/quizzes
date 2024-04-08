import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { inject } from '@angular/core';
import { MessageService } from './message/message.service';

export const shouldBeLoggedIn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const messageService = inject(MessageService);
  if (authService.getUserRole() == 'NONE') {
    messageService.showMessage("error", "You have to be logged in!");
    return false;
  }
  return true;
};

export const shouleNotBeLoggedIn: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  return authService.user.value == null;
};

export const logoutUser: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.logout();
  router.navigate(['']);
  return true;
};

export const canEditQuiz: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return true;
};

export const canCreateQuiz: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  return authService.getUserRole() == 'CREATOR';
};

export const canPlayQuiz: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return true;
};

export const canManageQuizzes: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return true;
};

export const canManageUsers: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  return authService.currentUserRole.value.role == 0;
};

export const redirectToMyProfile: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return true;
};


export const fetchUserRole: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  if (authService.user.getValue() != null) {
    const messageService = inject(MessageService);
    const userRole = authService.role();
    return new Promise((resolve, reject) => {
      userRole.subscribe(
        (userRoleData: any) => {
          authService.currentUserRole.next(userRoleData);
          resolve(true);
        },
        (_error) => {
          authService.logout();
          messageService.showMessage('error', 'Please, login again for security reasons!');
          reject(false);
        }
      );
    });
  }
  return true;
};
