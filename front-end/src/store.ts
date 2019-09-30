import thunk from 'redux-thunk';
import { authReducer } from './reducers/authReducer';
import {createStore, applyMiddleware, compose, Store} from 'redux';

const store: Store = createStore(authReducer, compose(
applyMiddleware(thunk),
(window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
(window as any).__REDUX_DEVTOOLS_EXTENSION__() )) 

export default store;
