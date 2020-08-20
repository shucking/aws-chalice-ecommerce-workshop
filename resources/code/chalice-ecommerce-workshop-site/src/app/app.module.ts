import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import Amplify, { API, Auth } from 'aws-amplify';
import { FooterComponent } from './components/shared/footer/footer.component';
import { BsNavbarComponent } from './components/shared/bs-navbar/bs-navbar.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductItemComponent } from './components/products/product-item/product-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCounterComponent } from './components/products/product-counter/product-counter.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthModule } from './components/auth/auth.module';
import { ShoppingCartModule } from './components/shopping-cart/shopping-cart.module';
import { CheckoutModule } from './components/checkout/checkout.module';
import { OrderHistoryModule } from './components/order-history/order-history.module';
import { RouterModule } from '@angular/router';

Amplify.register(API);
Amplify.register(Auth);
Amplify.configure({
  Auth: {
    // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
    identityPoolId: 'INSERT HERE',
    // REQUIRED - Amazon Cognito Region
    region: 'INSERT HERE',
    // OPTIONAL - Amazon Cognito User Pool ID
    userPoolId: 'INSERT HERE',
    // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
    userPoolWebClientId: 'INSERT HERE'
  },
  API: {
    endpoints: [
      {
          name: 'INSERT HERE',
          endpoint: 'INSERT HERE'
      }
    ]
  }
});

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    BsNavbarComponent,
    ProductsComponent,
    ProductItemComponent,
    ProductCounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    AuthModule,
    ShoppingCartModule,
    CheckoutModule,
    OrderHistoryModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
