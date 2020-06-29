
export interface IProduct {
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}

export type IUpdateProductItem = Omit<IProduct, "price" | "ownerId" | "id">
export type ICreateProductItem = Omit<IProduct, "ownerId" | "id">
export interface IProductItem {
    title: string,
    imageUrl: string,
    price: number
    onSelect: any;
}

export enum ProductActionTypeConstant {
    CREATE_PRODUCT = "CREATE_PRODUCT",
    UPDATE_PRODUCT = "UPDATE_PRODUCT",
    DELETE_PRODUCT = "DELETE_PRODUCT"
}
export interface IProductReducer {
    availableProducts: IProduct[];
    userProducts: IProduct[];
}

export interface IProductAction {
    type: string;
    payload: any;
}

export interface ICreateProductAction {
    type: ProductActionTypeConstant.CREATE_PRODUCT,
    payload: {
        item: ICreateProductItem;
    }
}

export interface IUpdateProductAction {
    type: ProductActionTypeConstant.UPDATE_PRODUCT,
    payload: {
        pid: string;
        item: IUpdateProductItem;
    }
}
export interface IProductDeleteAction {
    type: ProductActionTypeConstant.DELETE_PRODUCT,
    payload: {
        pid: string
    }
}

export type ProductType = IProductDeleteAction | ICreateProductAction | IUpdateProductAction;