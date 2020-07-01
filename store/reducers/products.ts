import { PRODUCTS } from "../../data/dummy-data";
import * as ProductInterface from "../../interface/Product"
import { Product } from "../../models/product";

const initialState: ProductInterface.IProductReducer = {
    // availableProducts: PRODUCTS,
    // userProducts: PRODUCTS.filter(item => item.ownerId === "u1"),
    availableProducts: [],
    userProducts: [],
    isLoading: false,
    dataExists: false
}

export const ProductReducer = (state = initialState, action: ProductInterface.ProductType): ProductInterface.IProductReducer => {
    switch (action.type) {
        case ProductInterface.ProductActionTypeConstant.IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case ProductInterface.ProductActionTypeConstant.DATA_EXISTS:
            return {
                ...state,
                dataExists: action.payload.dataExists
            }
        case ProductInterface.ProductActionTypeConstant.FETCH_PRODUCT:
            return {
                ...state,
                availableProducts: action.payload.products,
                userProducts: action.payload.products.filter(item => item.ownerId === "u1")
            }
        case ProductInterface.ProductActionTypeConstant.DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(item => item.id !== action.payload.pid),
                availableProducts: state.availableProducts.filter(item => item.id !== action.payload.pid)
            };
        case ProductInterface.ProductActionTypeConstant.CREATE_PRODUCT:
            const newProduct = new Product(
                action.payload.item.id,
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
            // console.log(action.payload)
            return {
                ...state,
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