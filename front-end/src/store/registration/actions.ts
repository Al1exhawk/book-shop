import { Dispatch } from "react";
import { ActionTemplate } from "../../constants/types";


export const OPEN_REGISTRATION_MODAL ='OPEN_REGISTRATION_MODAL';
export const CLOSE_REGISTRATION_MODAL ='CLOSE_REGISTRATION_MODAL';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';

export const openRegistrationModal = () => (dispatch: Dispatch<ActionTemplate>) => {
    return dispatch({
        type: OPEN_REGISTRATION_MODAL
    })

}

export const closeRegistrationModal = () => (dispatch: Dispatch<ActionTemplate>) => {
    return dispatch({
        type: CLOSE_REGISTRATION_MODAL
    })
}

export const registrationError = (errorMessage: string) => (dispatch: Dispatch<ActionTemplate>) => {
    return dispatch({
        type: REGISTRATION_ERROR,
        payload: errorMessage
    })
}