
export interface IProduct {
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}

export interface IFirebaseSavedProductItem {
    [key: string]: {
        title: string;
        imageUrl: string;
        description: string;
        price: number;
        ownerId: string;
    }
}

export type IUpdateProductItem = Omit<IProduct, "price" | "ownerId" | "id">
export type ICreateProductItem = IProduct
export interface IProductItem {
    title: string,
    imageUrl: string,
    price: number
    onSelect: any;
}

export enum ProductActionTypeConstant {
    CREATE_PRODUCT = "CREATE_PRODUCT",
    UPDATE_PRODUCT = "UPDATE_PRODUCT",
    DELETE_PRODUCT = "DELETE_PRODUCT",
    FETCH_PRODUCT = "FETCH_PRODUCT",
    IS_LOADING = "IS_LOADING",
    DATA_EXISTS = "DATA_EXISTS",
    ERROR_PRODUCT = "ERROR_PRODUCT",
}
export interface IProductReducer {
    availableProducts: IProduct[];
    userProducts: IProduct[];
    isLoading: boolean;
    dataExists: boolean;
    error: string;
}

export interface IFetchProductAction {
    type: ProductActionTypeConstant.FETCH_PRODUCT,
    payload: {
        products: IProduct[];
        userProducts: IProduct[];
    }
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

export interface IProductIsLoadingAction {
    type: ProductActionTypeConstant.IS_LOADING,
    payload: {
        isLoading: boolean
    }
}

export interface IProductDataExistsAction {
    type: ProductActionTypeConstant.DATA_EXISTS,
    payload: {
        dataExists: boolean
    }
}

export interface IProductErrorAction {
    type: ProductActionTypeConstant.ERROR_PRODUCT,
    payload: {
        error: string
    }
}

export type ProductType = IFetchProductAction | IProductDeleteAction | ICreateProductAction | IUpdateProductAction | IProductIsLoadingAction | IProductDataExistsAction | IProductErrorAction;