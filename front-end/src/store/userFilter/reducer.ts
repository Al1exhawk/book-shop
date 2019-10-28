import { Reducer } from "redux";

import { ActionTemplate } from "../../models/types";

import { SET_USER_PER_PAGE, SET_NEW_USER_PAGE } from "./action";

export interface UserFilterState {
    page: number;
    contentPerPage: number;
}

const initialState: UserFilterState = {
    page: 1,
    contentPerPage: 10
}

export const UserFilterReducer: Reducer<UserFilterState, ActionTemplate> = (state: UserFilterState = initialState, action: ActionTemplate): UserFilterState => {
    switch(action.type) {

        case SET_NEW_USER_PAGE: {
            return {
                ...state,
                page: action.payload
            }
        }

        case SET_USER_PER_PAGE: {
            return {
                ...state, 
                contentPerPage: action.payload

            }
        }

        default: {
            return state;
        }
    }
}