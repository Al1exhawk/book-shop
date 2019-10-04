import { Reducer } from 'redux'
import { ActionTemplate } from '../../constants/types';
import { UPDATE_FILTER } from './'


export interface ItemFilterState  {
    readonly minPrice: number,
    readonly maxPrice: number,
    readonly type: string[],
    readonly title: string,
    readonly authorName: string,
    readonly pageNumber: number,
    readonly itemsPerPage: number,
}

const initialState: ItemFilterState = {
    minPrice: 0,
    maxPrice: 0,
    type: ['book', 'magazine'],
    title: '',
    authorName: '',
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
              title: action.payload.title,
              authorName: action.payload.authorName,
            } 
          return newItemFilter; 
        }

        default: {
            return state;
        }
    }
}