import { Reducer } from 'redux'
import { ActionTemplate } from '../../constants/types';
import { UPDATE_FILTER } from './'


export interface ItemFilterState  {
    readonly minPrice: number,
    readonly maxPrice: number,
    readonly type: string[],
    readonly titleSearchString: string,
    readonly authorSearchString: string,
    readonly pageNumber: number,
    readonly itemsPerPage: number,
}

const initialState: ItemFilterState = {
    minPrice: 0,
    maxPrice: Infinity,
    type: ['book', 'magazine'],
    titleSearchString: '',
    authorSearchString: '',
    pageNumber: 1,
    itemsPerPage: 10,
}

export const ItemFilterReducer: Reducer<ItemFilterState, ActionTemplate> = (state: ItemFilterState = initialState, action: ActionTemplate): ItemFilterState => {
    switch(action.type) {
        case UPDATE_FILTER: {
            const newItemFilter: ItemFilterState = {
              ...state,
              minPrice: action.payload.minPrice,
              maxPrice: action.payload.maxPrice,
              type: action.payload.type,
              titleSearchString: action.payload.titleSearchString,
              authorSearchString: action.payload.authorSearchString,
            } 
          return newItemFilter; 
        }

        default: {
            return state;
        }
    }
}