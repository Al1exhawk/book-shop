import thunk from 'redux-thunk';
import { authReducer, AuthState } from './auth';
import { ItemFilterState, ItemFilterReducer} from './itemFilter';
import { ActionTemplate } from '../constants/types';
import { createStore, applyMiddleware, compose, Store, combineReducers } from 'redux';
import {BagReducer, BagState} from './bag'

export interface GenericState {
    auth: AuthState,
    itemFilter: ItemFilterState,
    bag: BagState,
} 

const genericReducer = combineReducers<GenericState>({
    auth: authReducer,
    itemFilter: ItemFilterReducer,
    bag: BagReducer
});

const store: Store<GenericState, ActionTemplate> = createStore(genericReducer, compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__() )
) 
export default store;
export * from './itemFilter';
export * from './auth'
