import * as CartInterface from "../../interface/Cart";
import * as ProductInterface from "../../interface/Product";

const addToCart = (product: ProductInterface.IProduct): CartInterface.IAddToCartAction => {
    return { type: CartInterface.CartActionTypeConstant.ADD_TO_CART, payload: product }
}

const removeFromCart = (productId: string): CartInterface.IRemoveFromCartAction => {
    return { type: CartInterface.CartActionTypeConstant.REMOVE_FROM_CART, payload: { pid: productId } }
}
export {
    addToCart,
    removeFromCart
}