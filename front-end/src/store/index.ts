import thunk from 'redux-thunk';
import { authReducer, AuthState } from './auth';
import { ItemFilterState, ItemFilterReducer} from './itemFilter';
import { ActionTemplate } from '../constants/types';
import { createStore, applyMiddleware, compose, Store, combineReducers } from 'redux';

export interface GenericState {
    auth: AuthState,
    itemFilter: ItemFilterState
} 

const genericReducer = combineReducers<GenericState>({
    auth: authReducer,
    itemFilter: ItemFilterReducer
});

const store: Store<GenericState, ActionTemplate> = createStore(genericReducer, compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__() )
) 
export default store;
export * from './itemFilter';
export * from './auth'