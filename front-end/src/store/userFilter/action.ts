import { Dispatch } from "react";

import { ActionTemplate } from "../../models/types";

export const SET_NEW_USER_PAGE = 'SET_NEW_USER_PAGE';
export const SET_USER_PER_PAGE = 'SET_USER_PER_PAGE';

export const setNewUserPage = (newPage: number = 1) => (dispatch: Dispatch<ActionTemplate>) =>{
    dispatch({
        type:  SET_NEW_USER_PAGE,
        payload: newPage
    });}