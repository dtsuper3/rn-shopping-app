import { PRODUCTS } from "../../data/dummy-data";
import * as ProductInterface from "../../interface/Product"
import { Product } from "../../models/product";

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
        case ProductInterface.ProductActionTypeConstant.CREATE_PRODUCT:
            const newProduct = new Product(
                new Date().toString(),
                "u1",
                action.payload.item.title,
                action.payload.item.imageUrl,
                action.payload.item.description,
                action.payload.item.price
            )
            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case ProductInterface.ProductActionTypeConstant.UPDATE_PRODUCT:
            console.log(action.payload)
            return {
                userProducts: state.userProducts.map(item => {
                    if (item.id === action.payload.pid) {
                        return {
                            ...item,
                            title: action.payload.item.title,
                            imageUrl: action.payload.item.imageUrl,
                            description: action.payload.item.description
                        }
                    } else {
                        return item
                    }
                }),
                availableProducts: state.availableProducts.map(item => {
                    if (item.id === action.payload.pid) {
                        return {
                            ...item,
                            title: action.payload.item.title,
                            imageUrl: action.payload.item.imageUrl,
                            description: action.payload.item.description
                        }
                    } else {
                        return item
                    }
                })
            }
        default:
            return state;
    }
}