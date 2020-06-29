import * as ProductInterface from "../../interface/Product";

export const deleteProduct = (productId: string): ProductInterface.IProductDeleteAction => {
    return {
        type: ProductInterface.ProductActionTypeConstant.DELETE_PRODUCT,
        payload: {
            pid: productId
        }
    }
}

export const createProduct = (item: ProductInterface.ICreateProductItem): ProductInterface.ICreateProductAction => {
    return {
        type: ProductInterface.ProductActionTypeConstant.CREATE_PRODUCT,
        payload: {
            item
        }
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