export class Product {
    productName: string;
    imgUrl: string;
    price: number;
    category: string;

    constructor(productName: string, imgUrl: string, price: number, category: string) {
        this.productName = productName;
        this.imgUrl = imgUrl;
        this.price = price;
        this.category = category;
    }
}