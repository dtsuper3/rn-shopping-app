import * as ProductInterface from "../interface/Product";
import * as OrderInterface from "../interface/Order";

export enum CartActionTypeConstant {
    ADD_TO_CART = "ADD_TO_CART",
    REMOVE_FROM_CART = "REMOVE_FROM_CART"
}

export interface ICartItem {
    quantity: number;
    productPrice: number;
    productTitle: string;
    sum: number;
}

export interface ICartReducer {
    items: {
        [key: string]: ICartItem;
    };
    totalAmount: number;
}

export interface IAddToCartAction {
    type: CartActionTypeConstant.ADD_TO_CART,
    payload: ProductInterface.IProduct
}

export interface IRemoveFromCartAction {
    type: CartActionTypeConstant.REMOVE_FROM_CART,
    payload: { pid: string }
}
export interface IAddOrderAction {
    type: OrderInterface.OrderActionTypeConstant.ADD_ORDER
}

export type CartActionType = IAddToCartAction | IRemoveFromCartAction | IAddOrderAction | ProductInterface.IProductDeleteAction;