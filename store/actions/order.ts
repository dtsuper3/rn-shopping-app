import * as OrderInterface from "../../interface/Order";
import * as CartInterface from "../../interface/Cart"
import { Dispatch } from "redux";
import { Order } from "../../models/order";

export const fetchOrderAction = () => {
    return async (dispatch: Dispatch) => {
        dispatch(orderLoadingAction(true));
        try {
            const res = await fetch("https://items-dfe2d.firebaseio.com/orders/u1.json", {
                method: "GET"
            })
            dispatch(orderLoadingAction(false));
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            const resData = await res.json();
            const loadedOrder = [];
            for (const key in resData) {
                loadedOrder.push(
                    new Order(
                        key,
                        resData[key].cartItem,
                        resData[key].totalAmount,
                        resData[key].date
                    )
                )
            }
            // console.log("Order:- ", loadedOrder)
            const action: OrderInterface.IFetchOrderAction = {
                type: OrderInterface.OrderActionTypeConstant.FETCH_ORDER,
                payload: {
                    orders: loadedOrder
                }
            }
            dispatch(action);
        } catch (err) {
            dispatch(orderLoadingAction(false));
            dispatch(orderErrorAction(err.message))
        }
    }
}

export const addOrder = (cartItem: CartInterface.ICartItem[], totalAmount: number) => {
    return async (dispatch: Dispatch) => {
        dispatch(orderLoadingAction(true));
        try {
            const res = await fetch("https://items-dfe2d.firebaseio.com/orders/u1.json", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    cartItem,
                    totalAmount,
                    date: Date.now()
                })
            })
            dispatch(orderLoadingAction(false));

            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            const resData: { name: string } = await res.json();
            // console.log("Order Resdata:- ", resData)
            const action: OrderInterface.IAddOrderAction = {
                type: OrderInterface.OrderActionTypeConstant.ADD_ORDER,
                payload: {
                    id: resData.name,
                    items: cartItem,
                    amount: totalAmount,
                    date: Date.now()
                }
            }
            dispatch(action);
        } catch (err) {
            dispatch(orderLoadingAction(false));
            dispatch(orderErrorAction(err.message))
        }
    }
}

const orderLoadingAction = (status: boolean): OrderInterface.ILoadingOrderAction => {
    return {
        type: OrderInterface.OrderActionTypeConstant.LOADING_ORDER,
        payload: {
            isLoading: status
        }
    }
}

const orderErrorAction = (error: string): OrderInterface.IOrderErrorAction => {
    return {
        type: OrderInterface.OrderActionTypeConstant.ERROR_ORDER,
        payload: {
            error: error
        }
    }
}