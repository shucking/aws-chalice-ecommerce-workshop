import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CartItem } from 'src/app/models/cartItem';
import { error } from 'protractor';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$: any[] = [];
  cartTotal = 0;
  itemCount: number;
  constructor(private appService: AppService) { }

  ngOnInit() {
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
      console.log(this.cart$);
      this.getItemCount();
    });
  }

  clearCart() {
    this.appService.clearCart().then(() => {
      window.location.reload();
    });
  }

  removeItem(productName: string) {
    this.appService.removeFromCart(productName).then(() => {
      window.location.reload();
    });
  }

  setQuantity($event, item) {
    item.quantity = $event;
  }

  getItemCount() {
    this.itemCount = Object.keys(this.cart$).length;
  }
}
