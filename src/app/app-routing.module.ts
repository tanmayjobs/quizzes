import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeScreenComponent } from './shared/home-screen/home-screen.component';
import { fetchUserRole } from './shared/auth.guards';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                canActivate: [fetchUserRole],
                component: HomeScreenComponent,
            },
            {
                path: 'auth',
                canActivate: [fetchUserRole],
                loadChildren: () =>
                    import('./auth/auth.module').then(
                        authModule => authModule.AuthModule
                    ),
            },
            {
                path: 'users',
                canActivate: [fetchUserRole],
                loadChildren: () =>
                    import('./users/users.module').then(
                        usersModule => usersModule.UsersModule
                    ),
            },
            {
                path: 'quizzes',
                canActivate: [fetchUserRole],
                loadChildren: () =>
                    import('./quizzes/quizzes.module').then(
                        quizzesModule => quizzesModule.QuizzesModule
                    ),
            },
            {
                path: 'error',
                canActivate: [fetchUserRole],
                loadComponent: () =>
                    import('./shared/error-page/error-page.component').then(
                        errorPageComponent => errorPageComponent.ErrorPageComponent
                    ),
            },
            {
                path: '**',
                redirectTo: 'error',
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule { }
