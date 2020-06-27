
export interface IProduct {
    id: string,
    ownerId: string,
    title: string,
    imageUrl: string,
    description: string,
    price: number
}

export interface IProductReducer {
    availableProducts: IProduct[];
    userProducts: IProduct[];
}

export interface IProductAction {
    type: string;
    payload: any;

}

export interface IProductItem {
    title: string,
    imageUrl: string,
    price: number
    onViewDetail: any;
    onAddToCart: any;
}
