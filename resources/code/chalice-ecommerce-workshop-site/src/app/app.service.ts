import { Injectable, Inject } from '@angular/core';
import API from '@aws-amplify/api';
import Auth from '@aws-amplify/auth';

const APINAME = 'workshop-app';
const HOME = '/home';
const SHOPPINGCART = '/shopping_cart';
const ORDERHISTORY = '/order_history';
const CATEGORY = '/category';
const CHECKOUT = '/checkout';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor() { }
  cart: {};
  async getProducts() {
    return API.get(APINAME, HOME, null);
  }

  async categoryFilter(categoryFilter: string) {
    return API.get(APINAME, CATEGORY, {
      queryStringParameters: {
        category: categoryFilter
      }
    });
  }

  async getOrderHistory() {
    return API.get(APINAME, ORDERHISTORY, {
      headers: {
        Authorization: (await Auth.currentSession()).getIdToken().getJwtToken()
      }
    });
  }

  async getShoppingCart() {
    return API.get(APINAME, SHOPPINGCART, {
      headers: {
        Authorization: (await Auth.currentSession()).getIdToken().getJwtToken()
      }
    });
  }

  async addToCart(productName: string, qty: number, imgUrl: string, cat: string) {
    return API.post(APINAME, SHOPPINGCART, {
      headers: {
        Authorization: (await Auth.currentSession()).getIdToken().getJwtToken()
      },
      body: {product_name: productName, quantity: qty, img_url: imgUrl, category: cat}
    });
  }

  async removeFromCart(productName: string) {
    return API.del(APINAME, SHOPPINGCART, {
      headers : {
        Authorization: (await Auth.currentSession()).getIdToken().getJwtToken()
      },
      body: {product_name: productName}
    });
  }

  async clearCart(){
    return API.del(APINAME, SHOPPINGCART, {
      headers : {
        Authorization: (await Auth.currentSession()).getIdToken().getJwtToken()
      }
    });
  }

  async checkout(addr: {}) {
    return API.post(APINAME, CHECKOUT, {
      headers: {
        Authorization: (await Auth.currentSession()).getIdToken().getJwtToken()
      },
      body: {
        address: addr
      }
    });
  }
}
