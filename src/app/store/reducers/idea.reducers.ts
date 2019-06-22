import { Idea } from 'src/app/models/idea.model';
import { IdeaActionTypes, All } from '../actions/idea.actions';

// see example: https://codesandbox.io/s/j3378m4v3y

export interface State {

  // is the data loading?
  loading: boolean;

  // if fetched, there should be a idea-array
  ideas: Idea[] | null;

  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  loading: false,
  ideas: [],
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case IdeaActionTypes.FETCH_PRODUCTS_BEGIN: {
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    }
    case IdeaActionTypes.FETCH_PRODUCTS_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: 'Ideas could not be fetched.',
        ideas: []
      };
    }
    case IdeaActionTypes.FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ideas: action.payload.ideas
      };
    }
    default: {
      return state;
    }
  }
}
