import thunk from 'redux-thunk';
import { authReducer, AuthState } from './auth';
import { ItemFilterState, ItemFilterReducer} from './itemFilter';
import { ActionTemplate } from '../models/types';
import { createStore, applyMiddleware, Store, combineReducers } from 'redux';
import {BagReducer, BagState} from './bag'
import { RegistrationState, RegistrationReducer } from './registration'
import { composeWithDevTools } from 'redux-devtools-extension';
import {UserFilterState, UserFilterReducer} from './userFilter'
import {AuthorFilterState, AuthorFilterReducer} from './authorFilter'


export interface GenericState {
    readonly signUp: RegistrationState,
    readonly itemFilter: ItemFilterState,
    readonly userFilter: UserFilterState,
    readonly authorFilter: AuthorFilterState,
    readonly bag: BagState,
    readonly auth: AuthState,
} 

const genericReducer = combineReducers<GenericState>({
    auth: authReducer,
    itemFilter: ItemFilterReducer,
    bag: BagReducer,
    signUp: RegistrationReducer,
    userFilter: UserFilterReducer,
    authorFilter: AuthorFilterReducer
});

const store: Store<GenericState, ActionTemplate> = createStore(genericReducer, composeWithDevTools(
    applyMiddleware(thunk)));

export default store;
export * from './itemFilter';
export * from './auth'
export * from './bag'
export * from './registration'
export * from './userFilter'
export * from './authorFilter'
