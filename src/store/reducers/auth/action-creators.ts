import {AuthActionEnum, SetUserAction} from "../types";
import {IUser} from "../../../models/IUser";

export const AuthActionCreators = {
  setUser: (user:IUser):SetUserAction=>({type: AuthActionEnum.SET_USER, payload:user})
}