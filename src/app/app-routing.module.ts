import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaListComponent } from './idea-list/idea-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/idea-list',
    pathMatch: 'full'
  },
  { path: 'idea-list', component: IdeaListComponent },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
