import * as OrderInterface from "../interface/Order";
import * as CartInterface from "../interface/Cart";

export class Order implements OrderInterface.IOrderItem {
    id: string;
    date: number;
    items: CartInterface.ICartItem[];
    totalAmont: number;
    constructor(id: string, items: CartInterface.ICartItem[], totalAmount: number, date: number) {
        this.id = id;
        this.items = items;
        this.totalAmont = totalAmount;
        this.date = date;
    }

}