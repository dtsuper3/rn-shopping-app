import * as CartInterface from "../interface/Cart";

export enum OrderActionTypeConstant {
    ADD_ORDER = "ADD_ORDER",
}

export interface IOrderItem {
    id: string;
    items: CartInterface.ICartItem[];
    totalAmont: number;
    date: number
}

export interface IOrderReducer {
    orders: IOrderItem[]
}

export interface IAddOrderAction {
    type: OrderActionTypeConstant.ADD_ORDER,
    payload: {
        items: CartInterface.ICartItem[],
        amount: number
    }
}

export type OrderActionTpe = IAddOrderAction