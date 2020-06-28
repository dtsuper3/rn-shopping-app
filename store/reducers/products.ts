import { PRODUCTS } from "../../data/dummy-data";
import * as ProductInterface from "../../interface/Product"

const initialState: ProductInterface.IProductReducer = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(item => item.ownerId === "u1")
}

export const ProductReducer = (state = initialState, action: ProductInterface.ProductType): ProductInterface.IProductReducer => {
    switch (action.type) {
        case ProductInterface.ProductActionTypeConstant.DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(item => item.id !== action.payload.pid),
                availableProducts: state.availableProducts.filter(item => item.id !== action.payload.pid)
            };
        default:
            return state;
    }
}