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
  error?: Error | null;
}

export const initialState: State = {
  loading: false,
  ideas: [],
  selectedIdea: null,
  error: null
};

export function reducer(state = initialState, action: All): State {
  switch (action.type) {
    /*************************
    * GET all ideas actions
    ************************/
    case IdeaActionTypes.GET_IDEAS: {
      return {
        ...state,
        loading: true,
        ideas: null,
        error: null
      };
    }
    case IdeaActionTypes.GET_IDEAS_SUCCESS: {
      return {
        ...state,
        loading: false,
        ideas: action.payload,
        error: null
      };
    }
    case IdeaActionTypes.GET_IDEAS_ERROR: {
      return {
        ...state,
        loading: false,
        ideas: [],
        error: action.payload
      };
    }

    /*************************
    * GET idea by id actions
    ************************/
    case IdeaActionTypes.GET_IDEA: {
      return {
        ...state,
        loading: true,
        selectedIdea: null,
        error: null
      };
    }
    case IdeaActionTypes.GET_IDEA_SUCCESS: {
      return {
        ...state,
        loading: false,
        selectedIdea: action.payload,
        error: null
      };
    }
    case IdeaActionTypes.GET_IDEA_ERROR: {
      return {
        ...state,
        loading: false,
        selectedIdea: null,
        error: action.payload
      };
    }

    /*************************
    * CREATE idea actions
    ************************/
    case IdeaActionTypes.CREATE_IDEA: {
      return {
        ...state,
        loading: true,
        selectedIdea: action.payload,
        error: null
      };
    }
    case IdeaActionTypes.CREATE_IDEA_SUCCESS: {

      const newIdea: Idea = {
        ...state.selectedIdea,
        id: action.payload
      };

      const ideasArray = [
        ...state.ideas,
        newIdea
      ];

      return {
        ...state,
        loading: false,
        ideas: ideasArray,
        selectedIdea: null,
        error: null
      };
    }
    case IdeaActionTypes.CREATE_IDEA_ERROR: {
      return {
        ...state,
        loading: false,
        selectedIdea: null,
        error: action.payload
      };
    }

    /*************************
    * DELETE idea actions
    ************************/
    case IdeaActionTypes.DELETE_IDEA: {

      const selected = state.ideas.find(h => h.id === action.payload);

      return {
        ...state,
        loading: true,
        selectedIdea: selected,
        error: null
      };
    }
    case IdeaActionTypes.DELETE_IDEA_SUCCESS: {

      const ideasArray = state.ideas.filter(h => h.id !== state.selectedIdea.id);

      return {
        ...state,
        loading: false,
        ideas: ideasArray,
        selectedIdea: null,
        error: null
      };
    }
    case IdeaActionTypes.DELETE_IDEA_ERROR: {
      return {
        ...state,
        loading: false,
        selectedIdea: null,
        error: action.payload
      };
    }

    /*************************
    * UPDATE idea actions
    ************************/
    case IdeaActionTypes.UPDATE_IDEA: {
      return {
        ...state,
        loading: true,
        selectedIdea: action.payload,
        error: null
      };
    }
    case IdeaActionTypes.UPDATE_IDEA_SUCCESS: {

      const index = state.ideas.findIndex(h => h.id === state.selectedIdea.id);

      if (index >= 0) {
        const ideasArray = [
          ...state.ideas.slice(0, index),
          state.selectedIdea,
          ...state.ideas.slice(index + 1)
        ];

        return {
          ...state,
          loading: false,
          ideas: ideasArray,
          selectedIdea: null,
          error: null
        };
      }
      return state;
    }
    case IdeaActionTypes.UPDATE_IDEA_ERROR: {
      return {
        ...state,
        loading: false,
        selectedIdea: null,
        error: action.payload
      };
    }
    default: {
      return state;
    }
  }
}

/*************************
 * SELECTORS
 ************************/
// maybe add additional selectors
// -> see https://github.com/yduartep/angular-ngrx-crud/blob/master/src/app/games/store/games.reducers.ts
