import * as AuthInterface from "../../interface/Auth";

const initialState: AuthInterface.IAuthReducer = {
    token: null,
    userId: null
}

export const AuthReducer = (state = initialState, action: AuthInterface.AuthAction): AuthInterface.IAuthReducer => {
    switch (action.type) {
        case AuthInterface.AuthActionType.AUTHENTICATE:
            return {
                token: action.payload.token,
                userId: action.payload.userId
            }
        case AuthInterface.AuthActionType.LOGOUT_USER:
            return initialState;
        default:
            return state
    }
}