import { Component, OnInit, Input, Output } from '@angular/core';
import { Product } from '../../../models/product';
import { AppService } from '../../../app.service';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() productItem: Product;
  @Input() showActions = true;
  @Input() shoppingCart: CartItem[];
  quantity: number;
  constructor(private appService: AppService) { }

  ngOnInit() {
  }

  addToCart() {
    this.appService.addToCart(this.productItem.productName, this.quantity, this.productItem.imgUrl, this.productItem.category)
    .then(() => {
      window.location.reload();
    });
  }

  setQuantity($event) {
    this.quantity = $event;
  }

  getItemCount() {
    return Object.keys(this.shoppingCart).length;
  }
}
