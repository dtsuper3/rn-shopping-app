import * as Cart from "../interface/Cart";

export class CartItem implements Cart.ICartItem {
    quantity: number;
    productPrice: number;
    productTitle: string;
    sum: number;
    constructor(quantity: number, productPrice: number, productTitle: string, sum: number) {
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.productTitle = productTitle;
        this.sum = sum
    }
}