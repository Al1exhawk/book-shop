import { ADD_ITEM_TO_BAG, REMOVE_ITEM_FROM_BAG, OPEN_BAG_MODAL, CLOSE_BAG_MODAL } from './';
import { ItemModel } from '../../../../back-end/src/models';
import { ActionTemplate } from "../../constants/types";
import { Reducer } from 'redux';


export interface BagState {
    readonly items: {item: ItemModel, amount: number}[];
    readonly isModalOpen: boolean
}

const initialState: BagState = {
    items: [],
    isModalOpen: false
}

export const BagReducer: Reducer<BagState, ActionTemplate> = (state: BagState = initialState, action: ActionTemplate): BagState => {    
    switch(action.type) {
        case ADD_ITEM_TO_BAG: {
           const alreadyInBagIndex = state.items.findIndex(item=>{
                return item.item.id === action.payload.item.id 
            });

            if(alreadyInBagIndex!==-1) {
                const newItems = [...state.items]
                newItems[alreadyInBagIndex] = {...newItems[alreadyInBagIndex],
                    amount: newItems[alreadyInBagIndex].amount+1}
                    
                return {...state,
                    items: newItems  
                };
            }
            
            const bag: BagState = {...state,
                items: [...state.items, action.payload]}

            return bag; 
        }
        case REMOVE_ITEM_FROM_BAG: {
            return {...state,
                items: state.items.filter((item)=>{
                    return item.item.id!==action.payload;
            })};
        }

        case OPEN_BAG_MODAL: {
            return {
                ...state,
                isModalOpen: true
            }
        }
        case CLOSE_BAG_MODAL: {
            return {
                ...state,
                isModalOpen: false
            }
        }

        default:{
            return state;
        }
    }
}
