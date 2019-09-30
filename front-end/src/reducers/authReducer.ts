import { LOG_OUT, LOG_IN } from '../constants/action-types';
import { ActionTemplate  } from '../constants/types';
import { Reducer } from 'redux'

export interface AuthState {
    readonly userName: string;
    readonly role: string;
    readonly token: string;
}

const initialState: AuthState = {
    userName: "",
    role: "",
    token: ""
}

export const authReducer: Reducer<AuthState, ActionTemplate> = (state: AuthState = initialState, action: ActionTemplate): AuthState => {
    switch(action.type) {
        case LOG_IN: {
            const logedInUserInform: AuthState = {
                userName: action.payload.userName,
                role: action.payload.role,
                token: action.payload.token
            } 
          return logedInUserInform; 
        }
        case LOG_OUT: {
            return {                
                userName: "",
                role: "",
                token: ""
            }
        }
        default: {
            return state;
        }
    }
}
