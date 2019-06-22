import { Action } from '@ngrx/store';

export enum IdeaActionTypes {
  FETCH_PRODUCTS_BEGIN = '[Idea] Fetch Ideas Begin',
  FETCH_PRODUCTS_SUCCESS = '[Idea] Fetch Ideas Success',
  FETCH_PRODUCTS_FAILURE = '[Idea] Fetch Ideas Failure'

}

export class FetchIdeasBegin implements Action {
  readonly type = IdeaActionTypes.FETCH_PRODUCTS_BEGIN;
}

export class FetchIdeasSuccess implements Action {
  readonly type = IdeaActionTypes.FETCH_PRODUCTS_SUCCESS;
  constructor(public payload: any) { }
}

export class FetchIdeasFailure implements Action {
  readonly type = IdeaActionTypes.FETCH_PRODUCTS_FAILURE;
  constructor(public payload: any) { }
}

export type All =
  | FetchIdeasBegin
  | FetchIdeasSuccess
  | FetchIdeasFailure;
