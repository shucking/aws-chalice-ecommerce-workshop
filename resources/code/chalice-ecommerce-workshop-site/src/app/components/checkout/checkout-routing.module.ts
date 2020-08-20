import { Routes, RouterModule } from "@angular/router";
import { CheckoutComponent } from './checkout.component';
import { NgModule } from '@angular/core';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AuthGuard } from '../auth/AuthGuard';

const routes: Routes = [
    {path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard], children: [
        {path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard]}
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CheckoutRoutingModule { }
