import axios, { AxiosResponse } from "axios";
import { ActionTemplate, LoginPayload } from "../constants/types";
import { LOG_IN, LOG_OUT, AUTH_ERROR } from "../constants/action-types";
import { Dispatch } from "redux";





export const logIn = (loginPayload: LoginPayload) =>
 async (dispatch: Dispatch<ActionTemplate>) => {
  let serverResponse;
  try {

    serverResponse = await axios.post<LoginPayload, AxiosResponse>("http://localhost:80/login", loginPayload, {responseType: "json"});

  } catch(e) {  
    return dispatch({
        type: AUTH_ERROR,
        payload: e.response && e.response.data.message ? e.response.data.message: e.message
    })
  }
    const data = serverResponse.data;
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
