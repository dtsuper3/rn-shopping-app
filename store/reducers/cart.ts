import * as Cart from "../../interface/Cart";

import { CartItem } from "../../models/cart-item";

const initialState: Cart.ICartReducer = {
    items: {},
    totalAmount: 0
};

export const CartReducer = (state = initialState, action: Cart.CartActionType): Cart.ICartReducer => {
    switch (action.type) {
        case Cart.CartActionTypeConstant.ADD_TO_CART:
            const addedProduct = action.payload;
            const prodPrice = addedProduct.price;
            const prodTitle = addedProduct.title;
            let updateOrNewCartItem;
            if (state.items[addedProduct.id]) {
                updateOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice
                )
            } else {
                updateOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updateOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }
        case Cart.CartActionTypeConstant.REMOVE_FROM_CART:
            const seletedCardItem = state.items[action.payload.pid];
            const currentQty = seletedCardItem.quantity
            let updatedCartItems;
            if (currentQty > 1) {
                // need to reduce it, not erade it
                const updatedCartItem = new CartItem(
                    seletedCardItem.quantity - 1,
                    seletedCardItem.productPrice,
                    seletedCardItem.productTitle,
                    seletedCardItem.sum - seletedCardItem.productPrice)
                updatedCartItems = { ...state.items, [action.payload.pid]: updatedCartItem }
            } else {
                updatedCartItems = { ...state.items };
                delete updatedCartItems[action.payload.pid]
            }

            return {
                ...state,
                items: updatedCartItems,
                totalAmount: state.totalAmount - seletedCardItem.productPrice
            }

        default:
            return state;
    }
}
