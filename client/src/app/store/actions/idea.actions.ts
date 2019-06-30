import { Action } from '@ngrx/store';
import { Idea } from 'src/app/models/idea.model';

export enum IdeaActionTypes {
  GET_IDEAS = '[Idea] Get Ideas',
  GET_IDEAS_SUCCESS = '[Idea] Get Ideas Success',
  GET_IDEAS_ERROR = '[Idea] Get Ideas Error',

  GET_IDEA = '[Idea] Get Idea',
  GET_IDEA_SUCCESS = '[Idea] Get Idea Success',
  GET_IDEA_ERROR = '[Idea] Get Idea Error',

  CREATE_IDEA = '[Idea] Create Idea',
  CREATE_IDEA_SUCCESS = '[Idea] Create Idea Success',
  CREATE_IDEA_ERROR = '[Idea] Create Idea Error',

  DELETE_IDEA = '[Idea] Delete Idea',
  DELETE_IDEA_SUCCESS = '[Idea] Delete Idea Success',
  DELETE_IDEA_ERROR = '[Idea] Delete Idea Error',

  UPDATE_IDEA = '[Idea] Update Idea',
  UPDATE_IDEA_SUCCESS = '[Idea] Update Idea Success',
  UPDATE_IDEA_ERROR = '[Idea] Update Idea Error',

}

// ToDo: define payload types

/****************************************
 * GET all the ideas
 ****************************************/
export class GetIdeas implements Action {
  readonly type = IdeaActionTypes.GET_IDEAS;
}

export class GetIdeasSuccess implements Action {
  readonly type = IdeaActionTypes.GET_IDEAS_SUCCESS;
  constructor(public payload: Idea[]) { }
}

export class GetIdeasError implements Action {
  readonly type = IdeaActionTypes.GET_IDEAS_ERROR;
  constructor(public payload: Error) { }
}

/****************************************
 * GET idea by id
 ****************************************/
export class GetIdea implements Action {
  readonly type = IdeaActionTypes.GET_IDEA;
  constructor(public payload: number) { }
}

export class GetIdeaSuccess implements Action {
  readonly type = IdeaActionTypes.GET_IDEA_SUCCESS;
  constructor(public payload: Idea) { }
}

export class GetIdeaError implements Action {
  readonly type = IdeaActionTypes.GET_IDEA_ERROR;
  constructor(public payload: Error) { }
}

/****************************************
 * ADD new idea
 ****************************************/
export class CreateIdea implements Action {
  readonly type = IdeaActionTypes.CREATE_IDEA;
  constructor(public payload: Idea) { }
}

export class CreateIdeaSuccess implements Action {
  readonly type = IdeaActionTypes.CREATE_IDEA_SUCCESS;
  constructor(public payload: number) { }
}

export class CreateIdeaError implements Action {
  readonly type = IdeaActionTypes.CREATE_IDEA_ERROR;
  constructor(public payload: Error) { }
}

/****************************************
 * REMOVE an idea by id
 ****************************************/
export class DeleteIdea implements Action {
  readonly type = IdeaActionTypes.DELETE_IDEA;
  constructor(public payload: number) { }
}

export class DeleteIdeaSuccess implements Action {
  readonly type = IdeaActionTypes.DELETE_IDEA_SUCCESS;
}

export class DeleteIdeaError implements Action {
  readonly type = IdeaActionTypes.DELETE_IDEA_ERROR;
  constructor(public payload: Error) { }
}

/****************************************
 * UPDATE idea by id
 ****************************************/
export class UpdateIdea implements Action {
  readonly type = IdeaActionTypes.UPDATE_IDEA;
  constructor(public payload: Idea) { }
}

export class UpdateIdeaSuccess implements Action {
  readonly type = IdeaActionTypes.UPDATE_IDEA_SUCCESS;
}

export class UpdateIdeaError implements Action {
  readonly type = IdeaActionTypes.UPDATE_IDEA_ERROR;
  constructor(public payload: Error) { }
}


export type All =
  | GetIdeas
  | GetIdeasSuccess
  | GetIdeasError
  | GetIdea
  | GetIdeaSuccess
  | GetIdeaError
  | CreateIdea
  | CreateIdeaSuccess
  | CreateIdeaError
  | DeleteIdea
  | DeleteIdeaSuccess
  | DeleteIdeaError
  | UpdateIdea
  | UpdateIdeaSuccess
  | UpdateIdeaError;
