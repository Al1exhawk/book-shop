import {OPEN_REGISTRATION_MODAL, CLOSE_REGISTRATION_MODAL, REGISTRATION_ERROR} from './';
import { ActionTemplate } from "../../constants/types";
import { Reducer } from 'redux';

export interface RegistrationState {
    isModalOpen: boolean,
    errorMessage: string
}
const initialState:RegistrationState = {
    isModalOpen: false,
    errorMessage:''
}

export const RegistrationReducer: Reducer<RegistrationState,ActionTemplate> = (state=initialState , action) => {
    switch(action.type){
    case OPEN_REGISTRATION_MODAL: {
        return {
            ...state,
            isModalOpen: true,
            errorMessage: ''
        }
    }
    case CLOSE_REGISTRATION_MODAL: {
        return {
            ...state,
            isModalOpen: false,
            errorMessage: ''
        }
    }

    case REGISTRATION_ERROR: {
        return{
            ...state, 
            errorMessage: action.payload
        }
    }

    default:{
        return state;
    }}
}