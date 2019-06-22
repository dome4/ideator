import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/idea-list',
    pathMatch: 'full'
  },
  { path: 'idea-list', component: IdeaListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/' }
  // ToDo { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
