export enum STORAGE_KEY {
    userData = "userData"
}

export enum AuthActionType {
    AUTHENTICATE = "AUTHENTICATE",
    LOGOUT_USER = "LOGOUT_USER"

}

export interface IFirebaseSignUpResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string
}

export interface IFirebaseSignInResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered: boolean;
}

export enum AuthSignInError {
    EMAIL_NOT_FOUND = "EMAIL_NOT_FOUND",
    INVALID_PASSWORD = "INVALID_PASSWORD",
    USER_DISABLED = "USER_DISABLED"
}

export enum AuthSignUpError {
    EMAIL_EXISTS = "EMAIL_EXISTS",
    OPERATION_NOT_ALLOWED = "OPERATION_NOT_ALLOWED",
    TOO_MANY_ATTEMPTS_TRY_LATER = "TOO_MANY_ATTEMPTS_TRY_LATER"
}

export interface IAuthReducer {
    token: null | string;
    userId: null | string;
}

export interface IAuthenticateUserAction {
    type: AuthActionType.AUTHENTICATE,
    payload: {
        token: string;
        userId: string;
    }
}

export interface ILogoutUserAction {
    type: AuthActionType.LOGOUT_USER
}

export type AuthAction = IAuthenticateUserAction | ILogoutUserAction; 