import { Dispatch, Action } from "redux";
import { ActionTemplate, LoginPayload } from "../../models/types";
import { authService } from "../../services";
import {ThunkAction} from 'redux-thunk'
import { GenericState } from "..";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";
export const AUTH_ERROR = "AUTH_ERROR";
export const OPEN_LOGIN_MODAL = "OPEN_LOGIN_MODAL";
export const CLOSE_LOGIN_MODAL = "CLOSE_LOGIN_MODAL";

export const logIn = (loginPayload: LoginPayload): ThunkAction<void, GenericState, null , Action<string>> => async (
  dispatch: Dispatch<ActionTemplate>
) => {
  try {
    const serverResponse = await authService.logIn(loginPayload);
    const data = serverResponse.data;
    localStorage.setItem("user", JSON.stringify(data));

    return dispatch({
      type: LOG_IN,
      payload: data
    });
  } catch (e) {
    return dispatch({
      type: AUTH_ERROR,
      payload:
        e.response && e.response.data.message
          ? e.response.data.message
          : e.message
    });
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  return {
    type: LOG_OUT
  };
};

export const openLoginModal = () => {  
  return {
      type: OPEN_LOGIN_MODAL
    };
  };


export const closeLoginModal  = () => {
  return {
      type: CLOSE_LOGIN_MODAL
    };
 
};
