import { Dispatch } from "redux"
import * as AuthInterface from "../../interface/Auth";
import { AsyncStorage } from "react-native"

const KEY = "AIzaSyC8ulgRB4LHpgrvdQ1_FhTWM-OSnepGjvA";

let timer: any = undefined;

export const signup = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
            if (!res.ok) {
                const errorResData = await res.json();
                const errorId = errorResData.error.message;
                let message = "Something went wrong!";
                if (errorId === AuthInterface.AuthSignUpError.EMAIL_EXISTS) {
                    message = "Email already exists"
                } else if (errorId === AuthInterface.AuthSignUpError.TOO_MANY_ATTEMPTS_TRY_LATER) {
                    message = "Too many attempts try later"
                }

                throw new Error(message);
            }
            const resData: AuthInterface.IFirebaseSignUpResponse = await res.json();
            // console.log(resData);            
            dispatch(authenticateUser(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000) as any);
            const expirationDate = Date.now() + parseInt(resData.expiresIn) * 1000;
            saveDataToStorage(resData.idToken, resData.localId, expirationDate);
        } catch (error) {
            // console.log(error.message)
            throw error;
        }
    }
}

export const login = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            });
            if (!res.ok) {
                const errorResData = await res.json();
                const errorId = errorResData.error.message;
                let message = "Something went wrong!";
                if (errorId === AuthInterface.AuthSignInError.EMAIL_NOT_FOUND) {
                    message = "This email could not be found."
                } else if (errorId === AuthInterface.AuthSignInError.INVALID_PASSWORD) {
                    message = "This password is not Valid!"
                }
                throw new Error(message);
            }
            const resData: AuthInterface.IFirebaseSignInResponse = await res.json();
            // console.log(resData);            
            dispatch(authenticateUser(resData.localId, resData.idToken, parseInt(resData.expiresIn) * 1000) as any);
            const expirationDate = Date.now() + parseInt(resData.expiresIn) * 1000;
            saveDataToStorage(resData.idToken, resData.localId, expirationDate);
        } catch (error) {
            // console.log(error.message)
            throw error;
        }
    }
}

export const authenticateUser = (userId: string, token: string, expiryTime: number) => {
    return (dispatch: Dispatch) => {
        dispatch(setLogoutTimer(expiryTime) as any)
        dispatch({
            type: AuthInterface.AuthActionType.AUTHENTICATE,
            payload: {
                token: token,
                userId: userId
            }
        })
    }
}

export const logoutUser = (): AuthInterface.ILogoutUserAction => {
    clearLogoutTimer();
    AsyncStorage.removeItem(AuthInterface.STORAGE_KEY.userData)
    return { type: AuthInterface.AuthActionType.LOGOUT_USER }
}

const clearLogoutTimer = () => {
    if (timer) {
        clearTimeout(timer);
    }
}
export const setLogoutTimer = (expirationTime: number) => {
    return (dispatch: Dispatch) => {
        timer = setTimeout(() => {
            dispatch(logoutUser());
        }, expirationTime)
    }
}
const saveDataToStorage = (token: string, userId: string, expirationDate: number) => {
    AsyncStorage.setItem(AuthInterface.STORAGE_KEY.userData, JSON.stringify({
        token: token,
        userId: userId,
        expiryDate: expirationDate
    }))
}