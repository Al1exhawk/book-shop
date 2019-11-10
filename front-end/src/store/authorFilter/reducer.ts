import { Reducer } from 'redux';

import { ActionTemplate } from 'models';

import { SET_AUTHOR_PER_PAGE, SET_NEW_AUTHOR_PAGE } from './actions';

export interface AuthorFilterState {
  page: number;
  contentPerPage: number;
}

const initialState: AuthorFilterState = {
  page: 1,
  contentPerPage: 10,
};

export const AuthorFilterReducer: Reducer<AuthorFilterState, ActionTemplate> = (
  state: AuthorFilterState = initialState,
  action: ActionTemplate,
): AuthorFilterState => {
  switch (action.type) {
    case SET_AUTHOR_PER_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }

    case SET_NEW_AUTHOR_PAGE: {
      return {
        ...state,
        contentPerPage: action.payload,
      };
    }

    default: {
      return state;
    }
  }
};
