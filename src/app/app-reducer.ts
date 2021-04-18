import { Dispatch } from "redux"
import {AuthApi} from "../api/todolists-api";
import { setIsLoggedInAC } from "../features/Login/auth-reducer";


const initialState: InitialStateType = {
    status: 'idle',
    error: null,
    isInitilized: false,
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INIT':
            return {...state, isInitilized: action.status}
        default:
            return {...state}
    }
}

export type RequestStatusType =  'idle' | 'loading' | 'succeeded' | 'failed'
export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitilized:boolean
}

export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)
export const setAppStatusAC = (status:  RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)
export const setInitilized = (status: boolean) => ({ type: 'APP/SET-INIT', status } as const)

export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppIntilizedActionType = ReturnType<typeof setInitilized>

export const initializeAppTC = () => (dispatch: Dispatch) => {
    AuthApi.me().then(res => {
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
        dispatch(setInitilized(true))
    })
}


type ActionsType =
    | SetAppErrorActionType
    | SetAppStatusActionType
    | SetAppIntilizedActionType
