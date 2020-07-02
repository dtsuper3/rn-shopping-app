import * as OrderInterface from "../../interface/Order";
import { Order } from "../../models/order";

const initialState: OrderInterface.IOrderReducer = {
    orders: [],
    isLoading: false,
    error: ""
}

export const OrderReducer = (state = initialState, action: OrderInterface.OrderActionTpe): OrderInterface.IOrderReducer => {
    switch (action.type) {
        case OrderInterface.OrderActionTypeConstant.FETCH_ORDER:
            return {
                ...state,
                orders: action.payload.orders
            }
        case OrderInterface.OrderActionTypeConstant.ADD_ORDER:
            const newOrder = new Order(
                action.payload.id,
                action.payload.items,
                action.payload.amount,
                action.payload.date
            )
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        case OrderInterface.OrderActionTypeConstant.LOADING_ORDER:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        default:
            return state
    }
}