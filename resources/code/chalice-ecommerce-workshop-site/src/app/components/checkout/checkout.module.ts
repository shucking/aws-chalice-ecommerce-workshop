import { NgModule } from '@angular/core';
import { CheckoutComponent } from './checkout.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        CheckoutComponent,
        OrderSuccessComponent,
        ShippingFormComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        CheckoutRoutingModule,
        BrowserModule
    ],
    exports: [RouterModule]
})
export class CheckoutModule { }
