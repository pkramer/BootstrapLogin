import { AuthGuard } from './guards/auth.guard';
import { InternalServerComponent } from './error-pages/internal-server/internal-server.component';
import { NotFoundComponent } from './error-pages/not-found/not-found.component';
import { HomeComponent } from './home/home.component';
import { RegisterUserComponent } from './authentication/register-user/register-user.component';
import { SubjectsComponent } from './subjects/subjects.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'authentication', loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule) },
  { path: 'subjects', component: SubjectsComponent, canActivate: [AuthGuard] },
  { path: 'student', loadChildren: () => import('./student/student.module').then(m => m.StudentModule) },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: InternalServerComponent }, 
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild([
      { path: 'register', component: RegisterUserComponent },
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }