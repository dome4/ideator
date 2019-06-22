import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { IdeaActionTypes, FetchIdeasFailure, FetchIdeasSuccess, IdeaEdited, IdeaEditedSuccess } from '../actions/idea.actions';
import { IdeaService } from 'src/app/services/idea.service';
import { Idea } from 'src/app/models/idea.model';
import { State } from '../reducers/idea.reducers';

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
      ofType(IdeaActionTypes.FETCH_IDEAS_BEGIN),
      switchMap(payload => {
        return this.ideaService.getIdeas()
          .pipe(
            map((ideas: Idea[]) => {
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

  // update idea effect
  @Effect()
  IdeaEdited: Observable<any> = this.actions
    .pipe(
      ofType(IdeaActionTypes.IDEA_EDITED),
      map((action: IdeaEdited) => action.payload),
      switchMap(payload => {
        return this.ideaService.updateIdea(payload.selectedIdea)
          .pipe(
            map(((idea: Idea) => {
              return new IdeaEditedSuccess({ selectedIdea: idea })
            }),
              catchError((error) => {
                console.log(error);
                return of(new FetchIdeasFailure({ error: error }));
              })
            )
          )
      })
    );

}
