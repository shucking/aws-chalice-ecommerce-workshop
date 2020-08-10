export class CartItem {
    productName: string;
    quantity: number;
    price: number;
    imgUrl: string;

    constructor(productName: string, quantity: number, price: number, imgUrl: string){
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.imgUrl = imgUrl;
    }
}