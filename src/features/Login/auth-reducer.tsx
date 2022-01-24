import {Dispatch} from "redux";
import {SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {clearDataAC} from "../TodolistsList/tasks-reducer";

const initialState = {
    isLoggedIn: false
}
type InitialStateType = typeof initialState;

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

export const setIsLoggedInAC = (value: boolean) => {
    return ({type: 'login/SET-IS-LOGGED-IN', value} as const)
}

export const loginTC = (values: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(values)
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(true))
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}
export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.logout()
        .then((res) => {
            if (res.data.resultCode === 0) {
                dispatch(setAppStatusAC('succeeded'))
                dispatch(setIsLoggedInAC(false))
                dispatch(clearDataAC())
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((error) => {
            handleServerNetworkError(error, dispatch);
        })
}

type ActionsType = ReturnType<typeof setIsLoggedInAC> | ReturnType<typeof clearDataAC>  | SetAppErrorActionType | SetAppStatusActionType