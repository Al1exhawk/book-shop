import { Dispatch } from "redux"
import {FilterForm} from '../../constants/types';
import { ActionTemplate } from "../../constants/types";

export const UPDATE_FILTER = 'UPDATE_FILTER';

export const updateFilter = (newFilterState: FilterForm) => (dispatch: Dispatch<ActionTemplate>) =>{
    dispatch({
        type: UPDATE_FILTER,
        payload: newFilterState
    });
}