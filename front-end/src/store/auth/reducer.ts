import { Reducer } from 'redux';
import { ActionTemplate } from 'models/types';
import {
  LOG_OUT,
  LOG_IN,
  AUTH_ERROR,
  OPEN_LOGIN_MODAL,
  CLOSE_LOGIN_MODAL,
} from './';

export interface AuthState {
  readonly userName: string;
  readonly role: string;
  readonly token: string;
  readonly errorMessage: string;
  readonly isModalOpen: boolean;
}

const userS = localStorage.getItem('user');
const user = userS ? JSON.parse(userS) : null;
const initialState: AuthState = {
  userName: user ? user.userName : '',
  role: user ? user.role : '',
  token: user ? user.token : '',
  errorMessage: '',
  isModalOpen: false,
};

export const authReducer: Reducer<AuthState, ActionTemplate> = (
  state: AuthState = initialState,
  action: ActionTemplate,
): AuthState => {
  switch (action.type) {
    case LOG_IN: {
      const logedInUser: AuthState = {
        userName: action.payload.userName,
        role: action.payload.role,
        token: action.payload.token,
        errorMessage: '',
        isModalOpen: false,
      };
      return logedInUser;
    }

    case LOG_OUT: {
      return { ...initialState, userName: '', role: '', token: '' };
    }

    case AUTH_ERROR: {
      return {
        ...state,
        errorMessage: action.payload,
      };
    }

    case OPEN_LOGIN_MODAL: {
      return {
        ...state,
        isModalOpen: true,
      };
    }

    case CLOSE_LOGIN_MODAL: {
      return {
        ...state,
        isModalOpen: false,
      };
    }

    default: {
      return state;
    }
  }
};
