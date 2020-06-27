import { PRODUCTS } from "../../data/dummy-data";
import * as ProductInterface from "../../interface/Product"

const initialState: ProductInterface.IProductReducer = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(item => item.ownerId === "u1")
}

export const ProductReducer = (state = initialState, action: ProductInterface.IProductAction): ProductInterface.IProductReducer => {
    return state
}