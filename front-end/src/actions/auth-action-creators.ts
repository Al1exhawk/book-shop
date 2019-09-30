import axios from 'axios'
import { ActionTemplate, LoginPayload } from '../constants/types';
import {LOG_IN, LOG_OUT} from '../constants/action-types'
import { Dispatch } from 'redux'



export const logIn = (loginPayload: LoginPayload) => async (dispatch: Dispatch<ActionTemplate>)=> {    
    const serverResponse = await axios.post('http://localhost:8080/login', loginPayload);
    const data = serverResponse.data;
    console.log(serverResponse);
   return dispatch({
        type: LOG_IN,
        payload: data
   })
}
export const logout = () => (dispatch: Dispatch<ActionTemplate>) => {
    dispatch({
        type: LOG_OUT,
    })
}

