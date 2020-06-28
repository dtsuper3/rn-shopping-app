import * as ProductInterface from "../../interface/Product";

export const deleteProduct = (productId: string): ProductInterface.IProductDeleteAction => {
    return {
        type: ProductInterface.ProductActionTypeConstant.DELETE_PRODUCT,
        payload: {
            pid: productId
        }
    }
}