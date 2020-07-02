import * as CartInterface from "../interface/Cart";

export enum OrderActionTypeConstant {
    ADD_ORDER = "ADD_ORDER",
    LOADING_ORDER = "LOADING_ORDER",
    ERROR_ORDER = "ERROR_ORDER",
    FETCH_ORDER = "FETCH_ORDER"
}

export interface IOrderItem {
    id: string;
    items: CartInterface.ICartItem[];
    totalAmont: number;
    date: number
}

export interface IOrderReducer {
    orders: IOrderItem[];
    isLoading: boolean;
    error: string;
}

export interface IAddOrderAction {
    type: OrderActionTypeConstant.ADD_ORDER,
    payload: {
        id: string,
        items: CartInterface.ICartItem[],
        amount: number,
        date: number
    }
}

export interface ILoadingOrderAction {
    type: OrderActionTypeConstant.LOADING_ORDER,
    payload: {
        isLoading: boolean;
    }
}

export interface IOrderErrorAction {
    type: OrderActionTypeConstant.ERROR_ORDER,
    payload: {
        error: string
    }
}

export interface IFetchOrderAction {
    type: OrderActionTypeConstant.FETCH_ORDER,
    payload: {
        orders: IOrderItem[]
    }
}


export type OrderActionTpe = IAddOrderAction | ILoadingOrderAction | IOrderErrorAction | IFetchOrderAction;