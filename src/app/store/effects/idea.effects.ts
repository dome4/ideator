import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { IdeaActionTypes, FetchIdeasFailure, FetchIdeasSuccess } from '../actions/idea.actions';
import { IdeaService } from 'src/app/services/idea.service';
import { Idea } from 'src/app/models/idea.model';

@Injectable()
export class IdeaEffects {

  constructor(
    private actions: Actions,
    private ideaService: IdeaService,
    private router: Router,
  ) { }

  // fetch data effect
  @Effect()
  FetchIdeasBegin: Observable<any> = this.actions
    .pipe(
      ofType(IdeaActionTypes.FETCH_PRODUCTS_BEGIN),
      switchMap(payload => {
        return this.ideaService.getIdeas()
          .pipe(
            map((ideas: Idea[]) => {
              console.log(ideas);
              return new FetchIdeasSuccess({ ideas: ideas });
            }),
            catchError((error) => {
              console.log(error);
              return of(new FetchIdeasFailure({ error: error }));
            })
          )

      })
    );

  // ToDo retry request on failure
}
