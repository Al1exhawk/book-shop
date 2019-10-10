import { Reducer } from 'redux'
import { ActionTemplate } from '../../constants/types';
import { UPDATE_FILTER, SET_NEW_PAGE } from './'


export interface ItemFilterState  {
    readonly minPrice: number,
    readonly maxPrice: number,
    readonly titleSearchString: string,
    readonly authorSearchString: string,
    readonly itemType: string[],
    readonly pageNumber: number,
    readonly itemsPerPage: number,
}

const initialState: ItemFilterState = {
    minPrice: 0,
    maxPrice: 0,
    titleSearchString: '',
    authorSearchString: '',
    itemType: ['book', 'magazine'],
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
              titleSearchString: action.payload.titleSearchString,
              authorSearchString: action.payload.authorSearchString,
              itemType: action.payload.itemType,
            } 
          return newItemFilter; 
        }

        case SET_NEW_PAGE: {
            return {
                ...state,
                pageNumber: action.payload
            }
        }

        default: {
            return state;
        }
    }
}