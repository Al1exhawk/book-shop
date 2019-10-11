import { Dispatch } from "redux"
import { FilterForm } from '../../constants/types';
import { ActionTemplate } from "../../constants/types";

export const UPDATE_FILTER = 'UPDATE_FILTER';
export const SET_NEW_PAGE = 'SET_NEW_PAGE';

export const updateFilter = (newFilterState: FilterForm) => (dispatch: Dispatch<ActionTemplate>) =>{
    dispatch({
        type: UPDATE_FILTER,
        payload: newFilterState
    });
}

export const setNewPage = (newPage: number = 1) => (dispatch: Dispatch<ActionTemplate>) =>{
    dispatch({
        type: SET_NEW_PAGE,
        payload: newPage
    });
}