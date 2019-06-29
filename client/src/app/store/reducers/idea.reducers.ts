import { Idea } from 'src/app/models/idea.model';
import { IdeaActionTypes, All } from '../actions/idea.actions';

// see example: https://codesandbox.io/s/j3378m4v3y

export interface State {

  // is the data loading?
  loading: boolean;

  // if fetched, there should be a idea-array
  ideas: Idea[] | null;

  // currently selected idea
  selectedIdea: Idea | null;

  // error message
  errorMessage: string | null;
}

export const initialState: State = {
  loading: false,
  ideas: [],
  selectedIdea: null,
  errorMessage: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    case IdeaActionTypes.FETCH_IDEAS_BEGIN: {
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    }
    case IdeaActionTypes.FETCH_IDEAS_FAILURE: {
      return {
        ...state,
        loading: false,
        errorMessage: 'Ideas could not be fetched.',
        ideas: []
      };
    }
    case IdeaActionTypes.FETCH_IDEAS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ideas: action.payload.ideas
      };
    }
    case IdeaActionTypes.IDEA_SELECTED: {
      return {
        ...state,
        selectedIdea: action.payload.selectedIdea
      }
    }
    case IdeaActionTypes.IDEA_EDITED: {
      return {
        ...state,
        ideas: updateIdeaList(action.payload.ideas, action.payload.selectedIdea),
        selectedIdea: action.payload.selectedIdea
      }
    }
    default: {
      return state;
    }
  }

  /**
   * update selected idea in idea list
   *
   * @param ideas
   * @param selectedIdea updated idea
   */
  function updateIdeaList(ideas: Idea[], selectedIdea: Idea) {
    const i = ideas.findIndex(el => el.id === selectedIdea.id);
    ideas[i] = selectedIdea;

    return ideas;
  }
}
