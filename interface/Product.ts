
export interface IProduct {
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}
export interface IProductItem {
    title: string,
    imageUrl: string,
    price: number
    onSelect: any;
}

export enum ProductActionTypeConstant {
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

export interface IProductDeleteAction {
    type: ProductActionTypeConstant.DELETE_PRODUCT,
    payload: {
        pid: string
    }
}

export type ProductType = IProductDeleteAction