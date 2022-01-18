import {AuthAction, AuthActionEnum, AuthState} from "../types";
import {IUser} from "../../../models/IUser";

const initialState:AuthState = {
  auth: false,
  user: {} as IUser,
  isLoading: false,
  error: ''
}

export function authReducer (state = initialState, action:AuthAction):AuthState {
  switch (action.type) {
    case AuthActionEnum.SET_AUTH:
      return {...state, auth:action.payload}
    case AuthActionEnum.SET_ERROR:
      return {...state, error:action.payload}
    case AuthActionEnum.SET_USER:
      return {...state, user:action.payload}
    case AuthActionEnum.SET_IS_LOADING:
      return {...state, isLoading:action.payload}
    default:
      return state
  }
}
