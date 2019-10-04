import { Reducer } from 'redux'
import { ActionTemplate } from '../../constants/types';
import { LOG_OUT, LOG_IN, AUTH_ERROR } from './actions';


export interface AuthState  {
    readonly userName: string;
    readonly role: string;
    readonly token: string;
    readonly errorMassage: string;
}

const initialState: AuthState = {
    userName: '',
    role: '',
    token: '',
    errorMassage: ''
}

export const authReducer: Reducer<AuthState, ActionTemplate> = (state: AuthState = initialState, action: ActionTemplate): AuthState => {
    switch(action.type) {
        case LOG_IN: {
            const logedInUserForm: AuthState = {
                userName: action.payload.userName,
                role: action.payload.role,
                token: action.payload.token,
                errorMassage: ''
            } 
          return logedInUserForm; 
        }
        
        case LOG_OUT: {
            return initialState;
        }

        case AUTH_ERROR: {
            return {
                ...initialState, errorMassage: action.payload
            }
        }

        default: {
            return state;
        }
    }
}
