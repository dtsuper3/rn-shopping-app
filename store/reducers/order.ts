import * as OrderInterface from "../../interface/Order";
import { Order } from "../../models/order";

const initialState: OrderInterface.IOrderReducer = {
    orders: []
}

export const OrderReducer = (state = initialState, action: OrderInterface.OrderActionTpe): OrderInterface.IOrderReducer => {
    switch (action.type) {
        case OrderInterface.OrderActionTypeConstant.ADD_ORDER:
            const newOrder = new Order(new Date().toString(), action.payload.items, action.payload.amount, Date.now());
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            }
        default:
            return state
    }

}