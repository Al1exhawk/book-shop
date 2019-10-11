import { ADD_ITEM_TO_BAG, REMOVE_ITEM_FROM_BAG } from './';
import { ItemModel } from '../../../../back-end/src/models';
import { ActionTemplate } from "../../constants/types";
import { Reducer } from 'redux';


export interface BagState {
    readonly items: ItemModel[];
}

const initialState: BagState = {
    items: []
}

export const BagReducer: Reducer<BagState, ActionTemplate> = (state: BagState = initialState, action:ActionTemplate): BagState => {    
    switch(action.type) {
        case ADD_ITEM_TO_BAG: {
            return initialState;
        }
        case REMOVE_ITEM_FROM_BAG: {
            return initialState;
        }

        default:{
            return state;
        }
    }
}
