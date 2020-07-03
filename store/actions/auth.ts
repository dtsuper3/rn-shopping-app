import { Dispatch } from "redux"
import * as AuthInterface from "../../interface/Auth";

const KEY = "AIzaSyC8ulgRB4LHpgrvdQ1_FhTWM-OSnepGjvA";

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
            const action: AuthInterface.IRegisterUserAction = {
                type: AuthInterface.AuthActionType.SIGN_UP,
                payload: {
                    token: resData.idToken,
                    userId: resData.localId
                }
            }
            dispatch(action);
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
            const action: AuthInterface.ILoginUserAction = {
                type: AuthInterface.AuthActionType.SIGN_IN,
                payload: {
                    token: resData.idToken,
                    userId: resData.localId
                }
            }
            dispatch(action);
        } catch (error) {
            // console.log(error.message)
            throw error;
        }
    }
}