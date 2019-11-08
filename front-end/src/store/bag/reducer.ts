import { ADD_ITEM_TO_BAG, REMOVE_ITEM_FROM_BAG, OPEN_BAG_MODAL, CLOSE_BAG_MODAL } from './';
import { ActionTemplate } from "models/types";
import { Reducer } from 'redux';


export interface BagState {
    readonly items: {id: string, amount: number}[];
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
                return item.id === action.payload
            });

            if(alreadyInBagIndex!==-1) {
                const newItems = state.items.map((item)=>{
                    if(item.id === action.payload){
                        return {...item,
                            amount: item.amount+1
                        }
                    } else {
                        return item
                    }
                }) 
                
                    
                return {...state,
                    items: newItems  
                };
            }
            
            const bag: BagState = {...state,
                items: [...state.items, {id: action.payload, amount: 1}]}

            return bag; 
        }
        case REMOVE_ITEM_FROM_BAG: {
            return {...state,
                items: state.items.filter((item)=>{
                    return item.id!==action.payload;
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
