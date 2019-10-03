import thunk from 'redux-thunk';
import genericReducer  from './reducers';
import { createStore, applyMiddleware, compose, Store } from 'redux';

const store: Store = createStore(genericReducer, compose(
    applyMiddleware(thunk),
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__() )
) 

export default store;
