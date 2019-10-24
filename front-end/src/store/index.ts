import thunk from 'redux-thunk';
import { authReducer, AuthState } from './auth';
import { ItemFilterState, ItemFilterReducer} from './itemFilter';
import { ActionTemplate } from '../constants/types';
import { createStore, applyMiddleware, compose, Store, combineReducers } from 'redux';
import {BagReducer, BagState} from './bag'
import {RegistrationState, RegistrationReducer} from './registration'

export interface GenericState {
  readonly  auth: AuthState,
   readonly signUp: RegistrationState,
   readonly itemFilter: ItemFilterState,
   readonly bag: BagState,
} 

const genericReducer = combineReducers<GenericState>({
    auth: authReducer,
    itemFilter: ItemFilterReducer,
    bag: BagReducer,
    signUp: RegistrationReducer
});

const store: Store<GenericState, ActionTemplate> = createStore(genericReducer, compose(
    applyMiddleware(thunk),
    (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] &&
    (window as any)['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']())
) 
export default store;
export * from './itemFilter';
export * from './auth'
export * from './bag'
export * from './registration'
