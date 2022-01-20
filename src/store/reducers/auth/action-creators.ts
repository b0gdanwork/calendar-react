import {AuthActionEnum, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction} from "./types";
import {IUser} from "../../../models/IUser";
import {AppDispatch} from "../../index";
import axios from "axios";

export const AuthActionCreators = {
  setUser: (user:IUser):SetUserAction=>({type: AuthActionEnum.SET_USER, payload:user}),
  setAuth: (auth:boolean):SetAuthAction=>({type: AuthActionEnum.SET_AUTH, payload:auth}),
  setError: (error:string):SetErrorAction=>({type: AuthActionEnum.SET_ERROR, payload:error}),
  setLoading: (loading:boolean):SetIsLoadingAction=>({type: AuthActionEnum.SET_IS_LOADING, payload:loading}),
  login: (username: string, password:string)=> async (dispatch: AppDispatch) => {
    try {
      setTimeout(async ()=>{
        dispatch(AuthActionCreators.setLoading(true))
        const mockUsers = await axios.get("./users.json")
        const dataResponse: [IUser] = mockUsers.data
        if (!dataResponse) {
          dispatch(AuthActionCreators.setError("Ошибка на сервере"))
          throw new SyntaxError("Данные с сервера пустые"); // (*)
        }
        let isAuth = dataResponse.filter(user => user.username === username && user.password === password).length != 0
        console.log("Авторизация", isAuth)
        if (isAuth) {
          localStorage.setItem('auth', 'true')
          localStorage.setItem('username', username)
          dispatch(AuthActionCreators.setUser({username: username, password: password}))
          dispatch(AuthActionCreators.setAuth(isAuth))
        } else {
          dispatch(AuthActionCreators.setError("Пароль или логин некорректны"))
        }
        dispatch(AuthActionCreators.setLoading(false))
      }, 1000)

    } catch (e) {
      dispatch(AuthActionCreators.setError("Ошибка авторизации, попробуйте позже"))
    }
  },
  logout: ()=> (dispatch: AppDispatch) => {
    console.log('logout')
    try {
      localStorage.removeItem('auth')
      localStorage.removeItem('username')
      dispatch(AuthActionCreators.setUser({} as IUser))
      dispatch(AuthActionCreators.setAuth(false))
    } catch (e) {
      dispatch(AuthActionCreators.setError("Не смогли выйти"))
    }
  }
}
