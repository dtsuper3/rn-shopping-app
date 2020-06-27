import * as ProductInterface from "../interface/Product";
export class Product implements ProductInterface.IProduct {
    id: string;
    ownerId: string;
    description: string;
    imageUrl: string;
    title: string;
    price: number

    constructor(id: string, ownerId: string, title: string, imageUrl: string, description: string, price: number) {
        this.id = id;
        this.ownerId = ownerId;
        this.description = description;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price
    }
}