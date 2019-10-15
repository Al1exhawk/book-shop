import { Reducer } from 'redux'
import { ActionTemplate } from '../../constants/types';
import { LOG_OUT, LOG_IN, AUTH_ERROR, OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from './';


export interface AuthState  {
    readonly userName: string;
    readonly role: string;
    readonly token: string;
    readonly errorMassage: string;
    readonly isModalOpen: boolean;
}

const initialState: AuthState = {
    userName: '',
    role: '',
    token: '',
    errorMassage: '',
    isModalOpen: false


}

export const authReducer: Reducer<AuthState, ActionTemplate> = (state: AuthState = initialState, action: ActionTemplate): AuthState => {
    switch(action.type) {
        case LOG_IN: {
            const logedInUser: AuthState = {
                userName: action.payload.userName,
                role: action.payload.role,
                token: action.payload.token,
                errorMassage: '',
                isModalOpen: false
            }
          return logedInUser; 
        }
        
        case LOG_OUT: {
            return initialState;
        }

        case AUTH_ERROR: {
            return {
                ...state,
                errorMassage: action.payload
            }
        }

        case OPEN_LOGIN_MODAL: {
            return {
                ...state,
                isModalOpen: true
            }
        }

        case CLOSE_LOGIN_MODAL: {
            return {
                ...state,
                isModalOpen: false
            }
        }

        default: {
            return state;
        }
    }
}
