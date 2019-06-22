import * as auth from './reducers/auth.reducers';
import * as idea from './reducers/idea.reducers';
import { createFeatureSelector } from '@ngrx/store';


export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer,
  idea: idea.reducer
};

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectIdeaState = createFeatureSelector<AppState>('idea');
