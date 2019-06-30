import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import {
  IdeaActionTypes,
  GetIdeasError,
  GetIdeasSuccess,
  UpdateIdea,
  UpdateIdeaSuccess,
  GetIdea,
  GetIdeaSuccess,
  GetIdeaError,
  CreateIdea,
  CreateIdeaSuccess,
  CreateIdeaError,
  DeleteIdea,
  DeleteIdeaSuccess,
  DeleteIdeaError
} from '../actions/idea.actions';
import { IdeaService } from 'src/app/services/idea.service';
import { Idea } from 'src/app/models/idea.model';
import { Action } from '@ngrx/store';

@Injectable()
export class IdeaEffects {

  constructor(
    private actions$: Actions,
    private ideaService: IdeaService
  ) { }

  // ToDo: retry requests on failure

  // get ideas effect
  @Effect()
  getIdeas$: Observable<Action> = this.actions$
    .pipe(
      ofType(IdeaActionTypes.GET_IDEAS),
      switchMap(() => {
        return this.ideaService.getIdeas()
          .pipe(
            map((ideas: Idea[]) => {
              return new GetIdeasSuccess(ideas);
            }),
            catchError((error) => {
              // debug
              console.log(error);

              return of(new GetIdeasError(error));
            })
          );
      })
    );

  // get idea effect
  @Effect()
  getIdea$: Observable<Action> = this.actions$
    .pipe(
      ofType(IdeaActionTypes.GET_IDEA),
      map((action: GetIdea) => action.payload),
      switchMap((id) => {
        return this.ideaService.getIdea(id)
          .pipe(
            map((idea: Idea) => {
              return new GetIdeaSuccess(idea);
            }),
            catchError((error) => {
              return of(new GetIdeaError(error));
            })
          );
      })
    );

  // create idea effect
  @Effect()
  createIdea$: Observable<Action> = this.actions$
    .pipe(
      ofType(IdeaActionTypes.CREATE_IDEA),
      map((action: CreateIdea) => action.payload),
      switchMap((idea: Idea) => {
        return this.ideaService.createIdea(idea)
          .pipe(
            map((idea2: Idea) => {
              return new CreateIdeaSuccess(idea2.id);
            }),
            catchError((error) => {
              return of(new CreateIdeaError(error));
            })
          );
      })
    );

  // delete idea effect
  @Effect()
  deleteIdea$: Observable<Action> = this.actions$
    .pipe(
      ofType(IdeaActionTypes.DELETE_IDEA),
      map((action: DeleteIdea) => action.payload),
      switchMap((id: number) => {
        return this.ideaService.deleteIdea(id)
          .pipe(
            map(() => {
              return new DeleteIdeaSuccess();
            }),
            catchError((error) => {
              return of(new DeleteIdeaError(error));
            })
          );
      })
    );

  // update idea effect
  @Effect()
  updateIdea$: Observable<Action> = this.actions$
    .pipe(
      ofType(IdeaActionTypes.UPDATE_IDEA),
      map((action: UpdateIdea) => action.payload),
      switchMap(idea => {
        return this.ideaService.updateIdea(idea)
          .pipe(
            map((() => {
              return new UpdateIdeaSuccess();
            }),
              catchError((error) => {
                console.log(error);
                return of(new GetIdeasError(error));
              })
            )
          );
      })
    );
}
