import * as OrderInterface from "../../interface/Order";
import * as CartInterface from "../../interface/Cart"

const addOrder = (cartItem: CartInterface.ICartItem[], totalAmount: number): OrderInterface.IAddOrderAction => {
    return {
        type: OrderInterface.OrderActionTypeConstant.ADD_ORDER,
        payload: {
            items: cartItem,
            amount: totalAmount
        }
    }
}

export {
    addOrder
}