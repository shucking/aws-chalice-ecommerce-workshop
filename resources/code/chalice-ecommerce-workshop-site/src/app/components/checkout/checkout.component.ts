import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart$: any[] = [];
  cartTotal: number = 0;
  itemCount: number;
  constructor(private appService: AppService) { }

  ngOnInit() {
    // this.cart$ = await this.appService.getShoppingCart();
    // this.itemCount = Object.keys(this.cart$).length;
    // this.cartMap = new Map(Object.entries(this.cart$));
    // console.log(this.cart$);
    this.appService.getShoppingCart().then(data => {
      for (let p of Object.keys(data)) {
        let cartItem = {
          productName: data[p].product_name,
          quantity: data[p].quantity,
          price: data[p].total_item_price,
          imgUrl: data[p].img_url
        };
        this.cart$.push(cartItem);
      }
      for (let i of this.cart$){
        this.cartTotal = this.cartTotal + i.price;
      }
      this.getItemCount();
    });
  }

  getItemCount() {
    this.itemCount = Object.keys(this.cart$).length;
  }
}
