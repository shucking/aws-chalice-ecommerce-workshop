import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { AppService } from '../../app.service';
import { CartItem } from 'src/app/models/cartItem';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.appService.getProducts().then(data => {
      for (let p of data) {
        this.productList.push(new Product(p.product_name, p.img_url, p.price, p.SK));
      }
      console.log(this.productList);
    }).catch(error => {
      console.log(error);
    });
  }
}
