import * as ProductInterface from "../../interface/Product";
import { Dispatch } from "redux";
import { Product } from "../../models/product";
import { RootState } from "../reducers";

export const fetchProducts = () => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(isLoading(true))
        dispatch(errorProduct(""))
        try {
            const res = await fetch("https://items-dfe2d.firebaseio.com/products.json", {
                method: "GET"
            })
            if (!res.ok) {
                // console.log("Error")
                throw new Error("Something went wrong!");
            }
            dispatch(isLoading(false))
            if (res.ok) {
                dispatch(isProductDataExists(true))
                const resData: ProductInterface.IFirebaseSavedProductItem = await res.json();
                const loadedProducts = [];
                for (const key in resData) {
                    loadedProducts.push(new Product(key, "u1", resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
                }
                // console.log(resData);

                const action: ProductInterface.IFetchProductAction = {
                    type: ProductInterface.ProductActionTypeConstant.FETCH_PRODUCT,
                    payload: {
                        products: loadedProducts
                    }
                }
                dispatch(action)
            } else {
                dispatch(isProductDataExists(false))
                throw new Error("Something went wrong!");
            }
        } catch (err) {
            // console.log("Error Message:-", err.message)
            dispatch(isLoading(false))
            dispatch(errorProduct(err.message))
            throw err;
        }
    }
}

const isLoading = (status: boolean): ProductInterface.IProductIsLoadingAction => {
    return {
        type: ProductInterface.ProductActionTypeConstant.IS_LOADING,
        payload: {
            isLoading: status
        }
    }
}

const isProductDataExists = (status: boolean): ProductInterface.IProductDataExistsAction => {
    return {
        type: ProductInterface.ProductActionTypeConstant.DATA_EXISTS,
        payload: {
            dataExists: status
        }
    }
}

export const errorProduct = (error: string): ProductInterface.IProductErrorAction => {
    return {
        type: ProductInterface.ProductActionTypeConstant.ERROR_PRODUCT,
        payload: {
            error: error
        }
    }
}

export const createProduct = (item: ProductInterface.ICreateProductItem) => {
    return async (dispatch: Dispatch, getState: () => RootState) => {
        const { token, userId } = getState().auth;
        const res = await fetch(`https://items-dfe2d.firebaseio.com/products.json?auth=${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })

        const resData: { name: string } = await res.json();

        // console.log("ResData:- ", resData);
        const action: ProductInterface.ICreateProductAction = {
            type: ProductInterface.ProductActionTypeConstant.CREATE_PRODUCT,
            payload: {
                item: {
                    ...item,
                    id: resData.name,
                    ownerId: userId as string

                }
            }
        }
        dispatch(action);
    }
}

export const updateProduct = (pid: string, item: ProductInterface.IUpdateProductItem) => {

    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(isLoading(true))
        dispatch(errorProduct(""))
        const token = getState().auth.token;
        try {
            const res = await fetch(`https://items-dfe2d.firebaseio.com/products/${pid}.json?auth=${token}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(item)
            })

            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            // console.log("ResData:- ", resData);
            const action: ProductInterface.IUpdateProductAction = {
                type: ProductInterface.ProductActionTypeConstant.UPDATE_PRODUCT,
                payload: {
                    pid,
                    item
                }
            }
            dispatch(action);
        } catch (err) {
            dispatch(isLoading(false))
            dispatch(errorProduct(err.message))
            throw err;
        }
    }
}

export const deleteProduct = (productId: string) => {

    return async (dispatch: Dispatch, getState: () => RootState) => {
        dispatch(isLoading(true))
        dispatch(errorProduct(""))
        const token = getState().auth.token;
        try {
            const res = await fetch(`https://items-dfe2d.firebaseio.com/products/${productId}.json?auth=${token}`, {
                method: "DELETE"
            })
            if (!res.ok) {
                throw new Error("Something went wrong!");
            }
            dispatch({
                type: ProductInterface.ProductActionTypeConstant.DELETE_PRODUCT,
                payload: {
                    pid: productId
                }
            })
        } catch (err) {
            dispatch(isLoading(false))
            dispatch(errorProduct(err.message))
            throw err;
        }
    }
}
