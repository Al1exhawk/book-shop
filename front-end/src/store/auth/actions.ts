import { History } from "history";
import { Dispatch } from "redux";
import axios, { AxiosPromise } from "axios";
import { ActionTemplate, LoginPayload } from "../../constants/types";

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const AUTH_ERROR = 'AUTH_ERROR';

export const logIn = (loginPayload: LoginPayload, history: History) =>
 async (dispatch: Dispatch<ActionTemplate>) => {
  let serverResponse;
  try {
    serverResponse = await axios.post<LoginPayload, AxiosPromise>("http://localhost:80/login", loginPayload, { responseType: "json" });
  } catch(e) {  
    return dispatch({
        type: AUTH_ERROR,
        payload: e.response && e.response.data.message ? e.response.data.message: e.message
    })
  }

    history.push('/');
    const data =  serverResponse.data;
    
     return dispatch({
          type: LOG_IN,
          payload: data
     })
};

export const logout = () => (dispatch: Dispatch<ActionTemplate>) => {
  dispatch({
    type: LOG_OUT
  });
};
