import { combineReducers } from "redux";
import { ReducerEnum } from "../../interface/Redux";
import { ProductReducer } from "./products";
import { CartReducer } from "./cart";
import { OrderReducer } from "./order";

export const rootReducer = combineReducers({
    [ReducerEnum.product]: ProductReducer,
    [ReducerEnum.cart]: CartReducer,
    [ReducerEnum.order]: OrderReducer
})

export type RootState = ReturnType<typeof rootReducer>
