import * as ProductInterface from "../../interface/Product";
import { Dispatch } from "redux";
import { Product } from "../../models/product";

export const fetchProducts = () => {
    return async (dispatch: Dispatch) => {
        dispatch(isLoading(true))
        try {
            const res = await fetch("https://items-dfe2d.firebaseio.com/products.json", {
                method: "GET"
            })
            dispatch(isLoading(false))
            if (res.ok) {
                const resData: ProductInterface.IFirebaseSavedProductItem = await res.json();
                const loadedProducts = [];
                for (const key in resData) {
                    loadedProducts.push(new Product(key, "u1", resData[key].title, resData[key].imageUrl, resData[key].description, resData[key].price))
                }
                console.log(resData);

                const action: ProductInterface.IFetchProductAction = {
                    type: ProductInterface.ProductActionTypeConstant.FETCH_PRODUCT,
                    payload: {
                        products: loadedProducts
                    }
                }
                dispatch(action)
            } else {
                throw new Error("Something went wrong!");
            }
        } catch (err) {
            dispatch(isLoading(false))
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
export const createProduct = (item: ProductInterface.ICreateProductItem) => {
    return async (dispatch: Dispatch) => {
        const res = await fetch("https://items-dfe2d.firebaseio.com/products.json", {
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
                    id: resData.name
                }
            }
        }
        dispatch(action);
    }
}

export const updateProduct = (pid: string, item: ProductInterface.IUpdateProductItem): ProductInterface.IUpdateProductAction => {
    return {
        type: ProductInterface.ProductActionTypeConstant.UPDATE_PRODUCT,
        payload: {
            pid,
            item
        }
    }
}

export const deleteProduct = (productId: string) => {
    return (dispatch: Dispatch) => {
        dispatch({
            type: ProductInterface.ProductActionTypeConstant.DELETE_PRODUCT,
            payload: {
                pid: productId
            }
        })
    }
}
