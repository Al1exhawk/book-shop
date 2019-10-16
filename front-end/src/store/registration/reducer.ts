import {OPEN_REGISTRATION_MODAL, CLOSE_REGISTRATION_MODAL} from './';
import { ActionTemplate } from "../../constants/types";
import { Reducer } from 'redux';

export interface RegistrationState {
    isModalOpen: boolean
}
const initialState:RegistrationState = {
    isModalOpen: false
}

export const RegistrationReducer: Reducer<RegistrationState,ActionTemplate> = (state=initialState , action) => {
    switch(action.type){
    case OPEN_REGISTRATION_MODAL: {
        return {
            ...state,
            isModalOpen: true
        }
    }
    case CLOSE_REGISTRATION_MODAL: {
        return {
            ...state,
            isModalOpen: false
        }
    }

    default:{
        return state;
    }}
}