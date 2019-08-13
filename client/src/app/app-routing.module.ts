import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { IdeaListComponent } from './idea-list/idea-list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { HomeComponent } from './home/home.component';
import { IdeaEditComponent } from './idea-list/idea-edit/idea-edit.component';
import { IdeaCardListComponent } from './idea-list/idea-card-list/idea-card-list.component';
import { ApplicationStateService } from './services/application-state.service';

const desktopRoutes: Routes = [
  {
    path: '',
    redirectTo: '/idea-list',
    pathMatch: 'full'
  },
  // { path: 'home', component: HomeComponent },
  {
    path: 'idea-list', component: IdeaListComponent, canActivate: [AuthGuardService], children: [
      { path: ':id', component: IdeaEditComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/' }
  // ToDo { path: '**', component: PageNotFoundComponent }
];

const mobileRoutes: Routes = [
  {
    path: '',
    redirectTo: '/idea-list',
    pathMatch: 'full'
  },
  // { path: 'home', component: HomeComponent },
  { path: 'idea-list', component: IdeaListComponent, canActivate: [AuthGuardService] },
  { path: 'idea-list/:id', component: IdeaEditComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '/' }
  // ToDo { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(desktopRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public constructor(
    private router: Router,
    private applicationStateService: ApplicationStateService
  ) {

    if (applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobileRoutes);
    }
  }
}
