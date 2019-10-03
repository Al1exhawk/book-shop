import {authReducer} from './authReducer';
import {combineReducers} from 'redux'

const genericReducer = combineReducers({
    auth: authReducer
});
export default genericReducer;