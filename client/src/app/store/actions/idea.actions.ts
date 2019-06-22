import { Action } from '@ngrx/store';

export enum IdeaActionTypes {
  FETCH_IDEAS_BEGIN = '[Idea] Fetch Ideas Begin',
  FETCH_IDEAS_SUCCESS = '[Idea] Fetch Ideas Success',
  FETCH_IDEAS_FAILURE = '[Idea] Fetch Ideas Failure',
  IDEA_SELECTED = '[Idea] Idea Selected',
  IDEA_CREATED = '[Idea] Idea Created',
  IDEA_DELETED = '[Idea] Idea Deleted',
  IDEA_EDITED = '[Idea] Idea Edited',
  IDEA_EDITED_SUCCESS = '[Idea] Idea Edited Success',

}

export class FetchIdeasBegin implements Action {
  readonly type = IdeaActionTypes.FETCH_IDEAS_BEGIN;
}

export class FetchIdeasSuccess implements Action {
  readonly type = IdeaActionTypes.FETCH_IDEAS_SUCCESS;
  constructor(public payload: any) { }
}

export class FetchIdeasFailure implements Action {
  readonly type = IdeaActionTypes.FETCH_IDEAS_FAILURE;
  constructor(public payload: any) { }
}

export class IdeaSelected implements Action {
  readonly type = IdeaActionTypes.IDEA_SELECTED;
  constructor(public payload: any) { }
}

export class IdeaEdited implements Action {
  readonly type = IdeaActionTypes.IDEA_EDITED;
  constructor(public payload: any) { }
}

export class IdeaEditedSuccess implements Action {
  readonly type = IdeaActionTypes.IDEA_EDITED_SUCCESS;
  constructor(public payload: any) { }
}

export type All =
  | FetchIdeasBegin
  | FetchIdeasSuccess
  | FetchIdeasFailure
  | IdeaSelected
  | IdeaEdited
  | IdeaEditedSuccess;
